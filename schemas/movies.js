import z from 'zod'

    const movieSchema = z.object({
        title: z.string({
            invalid_type_error: 'Movie tittle must be a string',
            required_error: 'Movie title is required.'
        }),
        year: z.string(),
        director: z.string(),
        duration: z.string(),
        rate: z.string(),
        actors: z.string(),
        plot: z.string(),
        posterUrl: z.string(),
        poster: z.string().url({
            message: 'Poster must be a valid URL'
        }),
        genres: z.array(
            z.enum(['Comedy', 'Drama', 'Fantasy', 'Music', 'Crime', 'Adventure', 'History', 'Thriller', 'Animation', 'Family', 'Mistery', 'Biography']),
            {
                required_error: 'Movie genre must be an array of enum Genres'
            }
        )
    })

    export function validateMovie (object) {
        return movieSchema.safeParse(object)
    }

    export function validateParcialMovie (object) {
        return movieSchema.partial().safeParse(object)
    }

