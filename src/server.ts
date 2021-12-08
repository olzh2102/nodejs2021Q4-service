const { PORT } = require('./common/config');
const { build } = require('./app');

const app = build({ logger: true });

app.listen(PORT, (err: any) => {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }
});
