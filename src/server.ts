import 'reflect-metadata';

import build from './app';
import config from './common/config';
import logger from './logger/logger';

const app = build({ logger });

app.then((server) =>
  server.listen(config.PORT, '::', (err: Error | null) => {
    console.log(`Server running on port: ${config.PORT}`);

    if (err) {
      server.log.error(err);
      process.exit(1);
    }
  })
);
