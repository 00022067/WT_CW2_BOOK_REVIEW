import { Router } from 'express'
import { ValidationMiddleware } from '../middleware/validation.middleware.js'
import Controller from '../controller/controller.js'
import { BOOKS_SCHEMA } from '../schema/creator.schema.js'

const router = Router()

export default router
    .get('/main', Controller.MAIN_PAGE)
    .post('/books', ValidationMiddleware(BOOKS_SCHEMA), Controller.CREATE_BOOK)
    .put('/books/:id', Controller.UPDATE_BOOK)
    .delete('/books/:id', Controller.DELETE_BOOK)
