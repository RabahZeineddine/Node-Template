import { config } from 'dotenv'
config()
import winston, { format } from 'winston'

const files = new winston.transports.File({ filename: 'combined.log' })
const winstonConsole = new winston.transports.Console()


export default class Logger {

    private static logger = winston.createLogger({
        level: 'debug',
        format: winston.format.combine(
            winston.format.colorize(),
            format.timestamp(),
            format.printf(info => `${info.level} [${info.timestamp}]: ${info.message}`)
        ),
        transports: [winstonConsole, files]
    })

    static error(message: string) {
        this.logger.error(message)
    }

    static info(message: string) {
        this.logger.info(message)
    }
}


