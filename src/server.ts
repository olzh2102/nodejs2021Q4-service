import build from './app';
import config from './common/config';
import logger from './logger/logger';

const app = build({ logger });

app.listen(config.PORT, '::', (err: Error | null) => {
  console.log(`Server running on port: ${config.PORT}`);
  if (err) {
    app.log.error(err);
    process.exit(1);
  }
});
