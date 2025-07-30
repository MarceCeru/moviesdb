import { randomUUID } from 'node:crypto'
import { readJson } from '../utils.js'

const movies = readJson('./movies.json').movies

export class MovieModel {
    static async getAll({ genre }) {
        if (genre) {
            return movies.filter(
                movie =>  movie.genres.some(g => g.toLowerCase() === genre.toLowerCase())
            )
        }
        return movies
    }

    static async getById({id}) {
        const movie = movies.find(movie => movie.id === Number(id))
        return movie
    }

    static async create({ imput }) {
        console.log('imput recibido en create:', imput)
        const newMovie = {
            id: randomUUID(), // crea un uuid v4
            ...imput
        }
        movies.push(newMovie)
        return newMovie
    }

    static async delete({ id }) {
        const movieIndex = movies.findIndex(movie => movie.id === Number(id))
        if (movieIndex === -1) {
            return null
        }
        movies.splice(movieIndex, 1)
        return true
    }

    static async update({ id, imput }) {
        const movieIndex = movies.findIndex(movie => movie.id === Number(id))
        if (movieIndex === -1) {
            return null
        }

        movies[movieIndex] = {
            ...movies[movieIndex],
            ...imput
        }

        return movies[movieIndex] // Retorna la película actualizada
    }
}