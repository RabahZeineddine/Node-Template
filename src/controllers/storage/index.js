import mongoose from 'mongoose'
import { DATABASE_URL, ca } from '../../config/storage'



var mongodb

export const init = async () => {
    try {

        let options = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        }

        if (!DATABASE_URL.includes('localhost')) {
            options = {
                ...options,
                ssl: true,
                sslValidate: true,
                sslCA: ca
            }
        }

        mongodb = await mongoose.connect(DATABASE_URL, options)

        console.log('Mongodb connected successfully')

        mongodb.connection.on('disconnected', () => {
            console.log('Mongodb disconnected')
            init()
        })

        mongodb.connection.on('error', (error) => {
            console.error(error)
        })

    }
    catch (error) {
        console.error(error)
    }
}

export default class StorageController {

    constructor() {
        this.database = mongodb
    }
}


init()
