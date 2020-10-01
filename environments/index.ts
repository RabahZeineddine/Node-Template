/* eslint-disable */
import chalk from 'chalk'
import fs from 'fs'
import axios from 'axios'

console.log(chalk.cyan('Getting local environments'))

let environment = process.env.NODE_ENV || 'local'

const URL = `<URL>/${environment}`

axios.get(URL)
    .then((result) => {
        if (result && result.status == 200) {
            fs.writeFile('.env', result.data, (err) => {
                if (err) throw err
                console.log(chalk.green('Environments file created successfully'))
            })
        } else throw result
    })
    .catch(error => {
        console.log(chalk.red('An error occurred, Try again later'))
        console.error(error.status)
        console.error(error)
        return process.exit(1)
    })