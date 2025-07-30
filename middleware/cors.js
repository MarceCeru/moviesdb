import cors from 'cors';

       const ACCEPTED_ORIGINS = [
            'http://localhost:1234',
            'https://movies.com',
            'http://localhost:8080'
        ];

export const corsMiddleware = ({acceptedOrigins = ACCEPTED_ORIGINS} = {}) => cors({
    origin: (origin, callback) => {

        if (ACCEPTED_ORIGINS.includes(origin)) {
            return callback(null, true);
        }

        if (!origin) {
            return callback(null, true); // Allow requests without origin (like from Postman)
        }

        return callback(new Error('Origin not allowed'), false);
    }
})