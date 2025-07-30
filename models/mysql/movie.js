import mysql from 'mysql2/promise'

const config = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'moviesdb',
    port: 3306
}

const connection = await mysql.createConnection(config)


export class MovieModel {
    static async getAll({ genre }) {
        // Implementación para obtener todas las películas

        if (genre) {
            const lowerCaseGenre = genre.toLowerCase();
            const [genres] = await connection.query(
                'SELECT id, name FROM genre WHERE LOWER(name) = ?;', [lowerCaseGenre]
            )

            // no genre found
            if (genres.length === 0) {
                return []
            }

            //get the id from the first genre result
            const [{ id }] = genres

            // get all movies ids from database table
            // hacer la query a la tabla movie_genre
            // join
            //y devolver el resultado
            return []
        }
        const [movies] = await connection.query(
            'SELECT title, year, director, duration, poster, rate, BIN_TO_UUID(id) id FROM movie;'
        )
        return movies
    }

    static async getById({id}) {
        // Implementación para obtener una película por ID
        const [movies] = await connection.query(
            `SELECT title, year, director, duration, poster, rate, BIN_TO_UUID(id) id FROM movie WHERE id = UUID_TO_BIN(?)`,
            [id])

        if (movies.length === 0) return null

        return movies // Retorna el primer resultado

    }


    static async create({ imput }) {
        //    console.log('Creating movie with input:', input)
        const {
            // genre: genreInput,//genre is an array of strings
            title,
            year,
            duration,
            director,
            rate,
            poster
        } = imput

        //todo: crear la conexion de genre

        const [uuidResult] = await connection.query('SELECT UUID() uuid;')
        const [{ uuid }] = uuidResult

        try {
            await connection.query(
                `INSERT INTO movie (id, title, director, duration, year, poster, rate)
         VALUES (UUID_TO_BIN("${uuid}"), ?, ?, ?, ?, ?, ?);`,
                [title, director, duration, year, poster, rate]
            )
        }
        catch (e) {
            throw new Error(`Error creating movie: ${e.message}`)
        }

        const [movies] = await connection.query(
            `SELECT title, year, director, duration, poster, rate, BIN_TO_UUID(id) id FROM movie WHERE id = UUID_TO_BIN(?)`,
            [uuid]
        )
        return movies[0] // Retorna el primer resultado

        if (movies.length === 0) return null

        return movies[0] // Retorna el primer resultado

    }

    static async delete({ id }) {
        // Implementación para eliminar una película por ID

        //ejercicio: eliminar una película por ID
    }

    static async update({ id, input }) {
        // Implementación para actualizar una película por ID
        // ejercicio: actualizar una película por ID
    }
}