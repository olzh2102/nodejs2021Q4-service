const { PORT } = require('./common/config');
const { build } = require('./app');

const app = build({ logger: true });

app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
    process.exit(1);
  }
});
