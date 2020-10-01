import mongoose, { ConnectionOptions } from 'mongoose'
import { DATABASE_URL, ca } from '../../config/storage'



var mongodb: any

export const init = async () => {
    try {

        let options: ConnectionOptions = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        }

        if (!DATABASE_URL?.includes('localhost')) {
            options = {
                ...options,
                ssl: true,
                sslValidate: true,
                sslCA: ca as any
            }
        }

        mongodb = await mongoose.connect(DATABASE_URL, options)

        console.log('Mongodb connected successfully')

        mongodb.connection.on('disconnected', () => {
            console.log('Mongodb disconnected')
            init()
        })

        mongodb.connection.on('error', (error: any) => {
            console.error(error)
        })

    }
    catch (error) {
        console.error(error)
    }
}



type RunInTransactionCallback = (session: any) => any

export default class StorageController {

    private database

    constructor() {
        this.database = mongodb
    }

    getDatabase() {
        return this.database
    }


    async run(usedSession: any, callback: RunInTransactionCallback) {
        const session = usedSession ? usedSession : await mongoose.startSession()
        session.startTransaction()
        try {
            const value = await callback(session)
            // Since the mutations ran without an error, commit the transaction.
            await session.commitTransaction()
            // Return any value returned by `mutations` to make this function as transparent as possible.
            return value
        }
        catch (error) {
            // Abort the transaction as an error has occurred in the mutations above.
            await session.abortTransaction()
            // Rethrow the error to be caught by the caller.
            throw error
        }
        finally {
            // End the previous session.
            session.endSession()
        }
    }

}

if (DATABASE_URL)
    init()
