import { NODE_ENV } from '../env'

const corsOptions = {
    development: {
        origin: '*'
    },
    quality_assurance: {
        origin: '*'
    },
    production: {
        origin: '*'
    }
}

export default corsOptions[NODE_ENV]