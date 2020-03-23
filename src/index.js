import express from 'express'
import bodyParser from 'body-parser'
import '@babel/polyfill'
import { env, corsOptions } from './config'
import cors from 'cors'
import errorhandler from 'errorhandler'
import morgan from 'morgan'
import chalk from 'chalk'

import SwaggerJSDoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
import { options } from './config/swagger'
let swaggerSpec = SwaggerJSDoc(options)

var app = express()

app.set('PORT', env.PORT)
app.use(cors(corsOptions))
app.use(bodyParser.json())

if (env.NODE_ENV === 'development') {
    app.use(errorhandler())
    app.use(morgan(':user-agent :method :url :status :response-time ms'))
}

// Import and add Routers here. 
const BASE_PATH = '/v1'


swaggerSpec.servers = [{ url: `${process.env.BASE_URL || 'https://node-template.mybluemix.net'}${BASE_PATH}` }]
app.use(`${BASE_PATH}/api-docs`, swaggerUi.serve, swaggerUi.setup(swaggerSpec))

app.listen(app.get('PORT'), () => {
    /* eslint-disable no-console */
    console.log(`App is listening on port: ${chalk.cyanBright(app.get('PORT'))}`)
    console.log(`Environment: ${chalk.green(env.NODE_ENV)}`)
})