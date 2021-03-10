import { config } from 'dotenv'
config()
import fs from 'fs'
import path from 'path'


export const DATABASE_MODELS = {
    USER: 'User'
}

export const COLLECTIONS_NAME = {
    USER: 'users'
}

export const ca = fs.readFileSync(path.join(__dirname, 'ca.pem'), 'utf8')
