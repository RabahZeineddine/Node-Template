import * as Joi from '@hapi/joi'

export const createSchema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required()
})


export const getByEmailSchema = Joi.object({
    email: Joi.string().email().required()
})


export const updateByEmailQuerySchema = Joi.object({
    email: Joi.string().email().required()
})

export const updateByEmailBodySchema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required()
})