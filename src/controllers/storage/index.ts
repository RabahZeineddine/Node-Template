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

        if (!DATABASE_URL.includes('localhost')) {
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

export default class StorageController {

    private database

    constructor() {
        this.database = mongodb
    }

    getDatabase() {
        return this.database
    }
}


init()
