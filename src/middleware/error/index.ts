import { Request, Response, NextFunction } from 'express'
import { getErrorMessage } from '../../config/responses'
import Logger from '../../utils/Logger'
import joiErrorHandler from './JoiErrorHandler'

export default (err: any, req: Request, res: Response, next: NextFunction) => {

    Logger.error(err)

    if (err && err.error && err.error.isJoi) return joiErrorHandler(err, req, res)

    if (err) return res.status(err.code || 500).json({ message: getErrorMessage(err.code || 500) })

    return next(err)
}