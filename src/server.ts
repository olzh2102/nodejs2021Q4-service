import pino from 'pino';

import build from './app';
import config from './common/config';
// import logger from './logger';
import logger from './logger/logger';

const app = build({ logger });

app.listen(config.PORT, (err: Error | null) => {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }
});

const handler = pino.final(logger, (err, finalLogger, evt) => {
  finalLogger.info(`${evt} caught`);
  if (err) finalLogger.error(err, 'error caused exit');
  process.exit(err ? 1 : 0);
});

process.on('uncaughtException', (err) => handler(err, 'uncaughtException'));
process.on(
  'unhandledRejection',
  pino.final(logger, (err, finalLogger) => {
    finalLogger.error(err, 'unhandledRejection');
    process.exit(1);
  })
);
