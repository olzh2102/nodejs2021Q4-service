import build from './app';
import config from './common/config';

const app = build({ logger: true });

app.listen(config.PORT, (err: Error | null) => {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }
});
