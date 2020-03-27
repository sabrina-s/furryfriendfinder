const winston = require('winston');

module.exports = function (err, req, res) {
  winston.error(err.message);

  const errorCode = err.status || 500;
  const errorMessage = err.message || 'Something failed.';

  res.status(errorCode).send(errorMessage);
};
