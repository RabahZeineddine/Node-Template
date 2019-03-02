import Joi from 'joi'


export default (object, schema) => Joi.validate(object, schema, { allowUnknown: true })