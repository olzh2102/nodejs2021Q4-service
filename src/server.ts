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

// TODO
process.on('uncaughtException', () => {});
process.on('unhandledRejection', () => {});
