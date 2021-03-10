import mongoose, { ConnectOptions } from 'mongoose'
import { env } from '../../config/index'
import Logger from '../../utils/Logger/index'



let mongodb: typeof mongoose

export const init = async () => {
    try {

        mongodb = await mongoose.connect(env.DATABASE.URL, env.DATABASE.OPTIONS as ConnectOptions)
        Logger.info('Mongodb connected successfully')

        mongodb.connection.on('disconnected', () => {
            Logger.info('Mongodb disconnected')
            init()
        })

        mongodb.connection.on('error', (error: any) => {
            Logger.error(error)
        })
    }
    catch (error) {
        Logger.error(error)
    }
}



type RunInTransactionCallback = (session: any) => any

export default class StorageController {

    private database: typeof mongoose

    constructor() {
        this.database = mongodb
    }

    private async getDatabase(counter = 0): Promise<typeof mongoose> {
        if (counter == env.DATABASE.retryConnectionCounter) throw new Error('Can\'t establish database connection')
        if (this.database?.connection?.readyState == 1)
            return this.database
        else {
            await init()
            this.database = mongodb
            return this.getDatabase(counter + 1)
        }
    }

    private async checkConnection() {
        return await this.getDatabase()
    }


    async run(usedSession: any, callback: RunInTransactionCallback) {

        await this.checkConnection()

        const session = usedSession ? usedSession : await mongoose.startSession()
        if (!usedSession)
            session.startTransaction()
        try {
            const value = await callback(session)
            // Since the mutations ran without an error, commit the transaction.
            if (!usedSession)
                await session.commitTransaction()
            // Return any value returned by `mutations` to make this function as transparent as possible.
            return value
        }
        catch (error) {
            // Abort the transaction as an error has occurred in the mutations above.
            if (!usedSession)
                await session.abortTransaction()
            // Rethrow the error to be caught by the caller.
            throw error
        }
        finally {
            // End the previous session.
            if (!usedSession)
                session.endSession()
        }
    }

}

if (env.DATABASE.URL)
    init()
