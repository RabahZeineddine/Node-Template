import { createValidator } from 'express-joi-validation'
import { Schema, assert } from '@hapi/joi'
import { NextFunction, Response } from 'express'
import fs from 'fs'
import { ERRORS } from '../responses'



export const validator = createValidator({ passError: true })

export const multipartValidator = (schema: Schema) => (req: any, res: Response, next: NextFunction): any => {
    let data = {}
    try {
        let files: any = {}
        let fields: any = req.fields
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
        assert(data, schema)
        next()
    } catch (err) {
        return res.status(400).json({
            type: 'multipart',
            message: err.details[0].message.toString()
        })
    }
}
