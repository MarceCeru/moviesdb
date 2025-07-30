import express, { json } from 'express'
import { createMovieRouter } from './routes/movie.js'
import { corsMiddleware } from './middleware/cors.js'

export const createApp = ({ movieModel }) => {
    const app = express()
    app.use(json())
    app.use(corsMiddleware())
    app.disable('x-powered-by') //desactivamos x seguridad.

    app.use('/movies', createMovieRouter({ movieModel }))

    const PORT = process.env.PORT ?? 1234

    app.listen(PORT, () => {
        console.log(`server listening on port http://localhost:${PORT}`)
    })
}
