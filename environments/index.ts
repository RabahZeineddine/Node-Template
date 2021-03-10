/* eslint-disable */
import chalk from 'chalk'
import fs from 'fs'
import Logger from '../src/utils/Logger/index';
import path from 'path'

const environment = process.env.NODE_ENV || 'local'

Logger.info(chalk.cyan(`Getting ${environment} environments`))


try {
    const filePath = path.join(__dirname, `.${environment}.env`)
    const file = fs.readFileSync(filePath, 'utf-8')
    if (file) {
        fs.writeFileSync('.env', file)
        Logger.info(chalk.green('Environments file created successfully'))
    }
} catch (error) {
    Logger.error(chalk.red('An error occurred, Try again later'))
    Logger.error(error)
}


