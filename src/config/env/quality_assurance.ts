import { EnvVariables, NODE_ENV_TYPE } from '../@types/env'

export const NODE_ENV: NODE_ENV_TYPE = process.env.NODE_ENV as NODE_ENV_TYPE || 'production'

const env: EnvVariables = {
    NODE_ENV,
    PORT: Number(process.env.PORT) || 5000,
    DATABASE: {
        URL: process.env.DATABASE_URL || '',
        OPTIONS: {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: true
        },
        retryConnectionCounter: 3
    }
}

export default env