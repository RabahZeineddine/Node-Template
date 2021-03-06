import { Router, Request, Response, NextFunction } from 'express'
import { validator } from '../../config/validator'
import { createSchema, getByEmailSchema, updateByEmailBodySchema, updateByEmailQuerySchema } from './schemas'
import User from '../../models/user'
import UsersController from '../../controllers/users'

const router = Router()


const initRouter = () => {

    router.route('/')
        .post(
            validator.body(createSchema),
            create
        )
        .get(findAll)

    router.route('/:email')
        .get(
            validator.params(getByEmailSchema),
            findByEmail
        )
        .patch(
            validator.params(updateByEmailQuerySchema),
            validator.body(updateByEmailBodySchema),
            updateByEmail
        )

    return router
}


const create = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const usersController = new UsersController()
        const user = new User('', req.body.firstName, req.body.lastName, req.body.email, req.body.password)
        await usersController.create(user)
        res.status(201)
        res.end()
    } catch (error) {
        return next(error)
    }

}


const findAll = async (_: Request, res: Response, next: NextFunction) => {
    try {
        const usersController = new UsersController()
        const result = await usersController.findAll()
        res.status(200).json(result)
    } catch (error) {
        return next(error)
    }
}


const findByEmail = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const usersController = new UsersController()
        const { email } = req.params
        const result = await usersController.findByEmail(email)
        res.status(200).json(result)
    } catch (error) {
        return next(error)
    }
}

const updateByEmail = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email } = req.params
        const { firstName, lastName } = req.body
        const user = new User('', firstName, lastName, email)
        const usersController = new UsersController()
        const updatedUser = await usersController.updateByEmail(user)
        res.status(200).json(updatedUser.toJSON())
    } catch (error) {
        return next(error)
    }
}


export default initRouter()
