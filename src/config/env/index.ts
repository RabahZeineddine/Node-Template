import { config } from 'dotenv'
config()
import { EnvType, NODE_ENV_TYPE } from '../@types/env'
import development from './development'
import quality_assurance from './quality_assurance'
import production from './production'


export const NODE_ENV: NODE_ENV_TYPE = process.env.NODE_ENV as NODE_ENV_TYPE || 'development'

const configEnv: EnvType = {
    development,
    quality_assurance,
    production
}

export default configEnv[NODE_ENV]