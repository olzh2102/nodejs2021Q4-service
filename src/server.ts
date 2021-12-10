import build from './app';
const { PORT } = require('./common/config');

const app = build({ logger: true });

app.listen(PORT, (err: Error | null) => {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }
});
