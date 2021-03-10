

export type EnvVariables = {
    NODE_ENV: string
    PORT: number
    DATABASE: {
        URL: string,
        OPTIONS: {
            useNewUrlParser: boolean
            useUnifiedTopology: boolean
            useFindAndModify: boolean
            ssl?: boolean
            sslValidate?: boolean
            sslCA?: string
        }
        retryConnectionCounter: number
    }
}

export type EnvType = {
    development: EnvVariables
    quality_assurance: EnvVariables
    production: EnvVariables
}

export type NODE_ENV_TYPE = 'development' | 'quality_assurance' | 'production'