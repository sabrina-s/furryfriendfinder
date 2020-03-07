const app = require('./app');
const port = process.env.PORT || 5000;

const connectDb = require('./db');
connectDb;

const server = app.listen(port, () => {
  console.log(`Listening on port ${port}...`)
});

module.exports = server;
