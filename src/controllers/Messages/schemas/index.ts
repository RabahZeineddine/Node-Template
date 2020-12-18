import Joi from 'joi'

export const topdeskInSchema = Joi.object({
    user: Joi.object({
        id: Joi.string().required()
    }).required(),
    chat: Joi.object({
        id: Joi.string(),
        category: Joi.string().required().valid('fabrica de limite'),
        input: Joi.object({
            text: Joi.string().required()
        }).required()
    }).required()
})

const outputSchema = Joi.array().items(
    Joi.object({
        response_type: Joi.string().valid('text').required(),
        text: Joi.string().required()
    })
)

export const cognitiveOutSchema = Joi.object({
    user: Joi.object({
        id: Joi.string().required()
    }).required(),
    chat: Joi.object({
        id: Joi.string(),
        category: Joi.string().required().valid('fabrica de limite'),
        output: Joi.when('...action', {
            is: Joi.exist(),
            then: outputSchema,
            otherwise: outputSchema.required().min(1)
        })
    }).required(),
    action: Joi.string()
})