import { config } from 'dotenv'
config()
import fs from 'fs'
import path from 'path'

export const DATABASE_URL: any = process.env.DATABASE_URL




export const DATABASE_MODELS = {
    USER: 'User'
}

export const ca = fs.readFileSync(path.join(__dirname, 'ca.pem'), 'utf8')
