import { NODE_ENV } from '../env'

const corsOptions: any = {
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