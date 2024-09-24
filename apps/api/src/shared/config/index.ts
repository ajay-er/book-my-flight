import 'dotenv/config';

import { cleanEnv, num, str } from 'envalid';

export const env = cleanEnv(process.env, {
  PORT: num({
    default: 3000,
    desc: 'Port on which the application will run',
  }),
  MONGO_URL: str({
    desc: 'MongoDB connection URL',
  }),
  JWT_ACCESS_SECRET: str({
    desc: 'JWT access token secret',
  }),
  JWT_REFRESH_SECRET: str({
    desc: 'JWT refresh token secret',
  }),
});
