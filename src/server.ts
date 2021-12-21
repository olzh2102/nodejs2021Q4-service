import build from './app';
import config from './common/config';
// import createLogger from './logger';

const app = build({
  logger: { prettyPrint: true },
  disableRequestLogging: true,
});

// createLogger(app);

app.listen(config.PORT, (err: Error | null) => {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }
});
