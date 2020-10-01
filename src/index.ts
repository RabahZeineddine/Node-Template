import { config } from 'dotenv'
config()
import express, { Request, Response, NextFunction } from 'express'
import bodyParser from 'body-parser'
import { env, corsOptions } from './config'
import cors from 'cors'
import errorhandler from 'errorhandler'
import chalk from 'chalk'
import { AuthMiddleware } from './middleware'
import SwaggerJSDoc, { SwaggerDefinition } from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
import { options } from './config/swagger'
import { users } from './routers'
import Logger, { HttpLogger } from './utils/Logger/index'

let swaggerSpec: SwaggerDefinition = SwaggerJSDoc(options) as SwaggerDefinition

var app = express()

app.set('PORT', env.PORT)
app.use(cors(corsOptions))
app.use(bodyParser.json())

app.use(errorhandler())
app.use(HttpLogger)

// Import and add Routers here. 
const BASE_PATH = '/v1'

app.use(AuthMiddleware)

app.use(`${BASE_PATH}/users`, users)



// Custom Handle Error
app.use((err: any, _: Request, res: Response, next: NextFunction) => {
    if (err && err.error && err.error.isJoi) {
        // we had a joi error, let's return a custom 400 json response
        res.status(400).json({
            type: err.type, // it could be 'headers', 'body', 'query' or 'params'
            message: err.error.toString()
        })
    } else {
        // pass on to another error handler
        next(err)
    }
})

swaggerSpec.servers = [{ url: `${process.env.BASE_URL || 'https://node-template.mybluemix.net'}${BASE_PATH}` }]
app.use(`${BASE_PATH}/api-docs`, swaggerUi.serve, swaggerUi.setup(swaggerSpec))

app.listen(app.get('PORT'), () => {
    /* eslint-disable no-console */
    Logger.log(`App is listening on port: ${chalk.cyanBright(app.get('PORT'))}`)
    Logger.log(`Environment: ${chalk.green(env.NODE_ENV)}`)
})