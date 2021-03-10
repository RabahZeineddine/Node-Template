import { Router, Request, Response, NextFunction } from 'express'
import Logger from '../../utils/Logger'
import { validator } from '../../config/validator/index'
import { loginSchema } from './schemas'

const router = Router()


const initRouter = () => {

    router.route('/login')
        .post(
            validator.body(loginSchema),
            login
        )

    return router
}


const login = (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body
        Logger.info(`email: ${email}, password: ${password}`)
        res.status(200).json({
            email, access_token: 'Bearer mansdkuqhweikansdbasjdlkqwoejkjsamdlkasjdgqhwijodlkansjhvgguihijlknjbhvgcfdryftuygihijlknasd'
        })
    } catch (error) {
        return next(error)
    }
}




export default initRouter()
