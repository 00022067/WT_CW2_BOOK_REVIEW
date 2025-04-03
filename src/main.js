import path from 'path'
import express from 'express'
import cors from 'cors'
import { PORT } from './config/app.config.js'
import routes from './route/routes.js'
import { ErrorHandlerMiddleware } from './middleware/error-handler.middleware.js'

const app = express()

app.set('view engine', 'ejs')
app.set('views', path.join(process.cwd(), 'src', 'views'))

app.use('/assets', express.static(path.join(process.cwd(), 'src', 'public')))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())

// Use API routes under "/api"
app.use('/api', routes)

// Add a base route for '/'
app.get('/', (req, res) => {
    res.json({ message: "Welcome to the API!" })
})

// Catch-all route (for undefined routes)
app.use('/*', (req, res) => {
    return res.json({ message: `No routes with this name ${req.url}` })
})

app.use(ErrorHandlerMiddleware)

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
