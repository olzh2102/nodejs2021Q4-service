import 'reflect-metadata';
import { createConnection } from 'typeorm';

import ormConfig from './ormconfig';

import build from './app';
import config from './common/config';
import logger from './logger/logger';

const app = build({ logger });

createConnection(ormConfig)
  .then(async () => {
    app.listen(config.PORT, '::', (err: Error | null) => {
      console.log(`Server running on port: ${config.PORT}`);
      if (err) {
        app.log.error(err);
        process.exit(1);
      }
    });
  })
  .catch((e) => {
    console.log('Database connection error: ', e);
    process.exit(1);
  });
