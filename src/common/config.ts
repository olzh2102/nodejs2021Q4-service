import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
  path: path.join(__dirname, '../../.env'),
});

export const LOG_LEVELS = {
  0: 'fatal',
  1: 'error',
  2: 'warn',
  3: 'info',
  4: 'debug',
  5: 'trace',
};

const LOG_LEVEL =
  (process.env.LOG_LEVEL as unknown as keyof typeof LOG_LEVELS) || '5';

export default {
  PORT: process.env.PORT || 4000,
  NODE_ENV: process.env.NODE_ENV,
  MONGO_CONNECTION_STRING: process.env.MONGO_CONNECTION_STRING,
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
  AUTH_MODE: process.env.AUTH_MODE === 'true',
  LOG_LEVEL,
  LOG_LEVEL_NAME: LOG_LEVELS[LOG_LEVEL],
};
