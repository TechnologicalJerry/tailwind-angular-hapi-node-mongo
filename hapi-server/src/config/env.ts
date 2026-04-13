import dotenv from 'dotenv';

dotenv.config();

export const env = {
  NODE_ENV: process.env['NODE_ENV'] ?? 'development',
  HOST: process.env['HOST'] ?? '0.0.0.0',
  PORT: parseInt(process.env['PORT'] ?? '3000', 10),
  MONGO_URI: process.env['MONGO_URI'] ?? 'mongodb://localhost:27017/hapidb',
  JWT_SECRET: process.env['JWT_SECRET'] ?? 'change_me_in_production',
  JWT_EXPIRATION: process.env['JWT_EXPIRATION'] ?? '7d',
  BCRYPT_SALT_ROUNDS: parseInt(process.env['BCRYPT_SALT_ROUNDS'] ?? '10', 10),
};
