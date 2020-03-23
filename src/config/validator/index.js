import { createValidator } from 'express-joi-validation'
import * as Joi from '@hapi/joi'

import fs from 'fs'
import { ERRORS } from '../responses'



export const validator = createValidator({ passError: true })

export const multipartValidator = (schema) => (req, res, next) => {
    let data = {}
    try {
        let files = {}
        let fields = req.fields
        delete fields.file
        Object.keys(req.files).forEach((file) => {
            files[file] = fs.readFileSync(req.files[file].path)
        })
        data = { ...files, ...fields }
    }
    catch (err) {
        /* eslint-disable no-console */
        console.error(err)
        return res.status(400).json({
            type: 'multipart',
            message: ERRORS.BAD_REQUEST
        })
    }
    try {
        Joi.assert(data, schema)
        next()
    } catch (err) {
        return res.status(400).json({
            type: 'multipart',
            message: err.details[0].message.toString()
        })
    }
}
