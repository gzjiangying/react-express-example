const _ = require('lodash'),
  path = require('path');

const express = require('express');

const app = express();

app.use('/public', express.static(`${__dirname}/public`));

app.use(require(path.join(__dirname, 'server/routes')));

let PORT = Number.parseInt(process.env.PORT);
if (!Number.isInteger(PORT)) {
  console.error('Invalid environment variable: PORT:', PORT);
  process.exit(1);
}

process.on('SIGINT', function() {
  console.log(`sigint got, okay`);
});

process.on('SIGHUP', function() {
  console.log(`sighup got, okay`);
});

console.log({
  PORT: process.env.PORT,
  NODE_ENV: process.env.NODE_ENV
});

app.listen(PORT, function() {
  console.log(`[] application started under ${process.env.NODE_ENV} ${PORT}...`);
});