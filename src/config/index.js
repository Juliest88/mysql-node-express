import dotenv from 'dotenv';
// Init environment variables
dotenv.config();

const config = {
  port: process.env.PORT || 3331,
  db: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
  },
  jwt: {
    secret: process.env.SECRET_JWT || '',
    expiresIn: process.env.JWT_EXPIRES_IN || '24h',
    algorithm: process.env.JWT_ALGORITHM || 'HS256',
  },
};

export default config;
