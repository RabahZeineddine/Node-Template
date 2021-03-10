import { config } from 'dotenv'
config()
import express from 'express'
import bodyParser from 'body-parser'
import { env, corsOptions } from './config'
import cors from 'cors'
import errorhandler from 'errorhandler'
import chalk from 'chalk'
import { AuthMiddleware, ErrorMiddleware } from './middleware'
import SwaggerJSDoc, { SwaggerDefinition } from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
import { options } from './config/swagger'
import {
    users,
    auth
} from './routers'
import Logger, { HttpLogger } from './utils/Logger/index'

const swaggerSpec: SwaggerDefinition = SwaggerJSDoc(options) as SwaggerDefinition

const app = express()

app.set('PORT', env.PORT)
app.use(cors(corsOptions))
app.use(bodyParser.json())

app.use(errorhandler())
app.use(HttpLogger)

// Import and add Routers here. 
const BASE_PATH = '/v1'

app.use(AuthMiddleware)

app.use(`${BASE_PATH}/users`, users)
app.use(`${BASE_PATH}/auth`, auth)



swaggerSpec.servers = [{ url: `${process.env.BASE_URL || 'https://node-template.mybluemix.net'}${BASE_PATH}` }]
app.use(`${BASE_PATH}/api-docs`, swaggerUi.serve, swaggerUi.setup(swaggerSpec))

// Custom Handle Error
app.use(ErrorMiddleware)

app.listen(app.get('PORT'), () => {
    /* eslint-disable no-console */
    Logger.info(`App is listening on port: ${chalk.cyanBright(app.get('PORT'))}`)
    Logger.info(`Environment: ${chalk.green(env.NODE_ENV)}`)
})