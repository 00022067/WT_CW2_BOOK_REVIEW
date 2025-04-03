import Joi from 'joi'

export const BOOKS_SCHEMA = Joi.object({
    title: Joi.string().max(100).required(),
    author: Joi.string().max(50).required(),
    genre: Joi.string().max(30).required(),
}).required()
