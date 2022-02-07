const winston = require('winston');
const expressWinston = require('express-winston');

module.exports = expressWinston.errorLogger({
  transports: [
    new winston.transports.File({ filename: './src/logs/error.log' }),
  ],
  format: winston.format.combine(
    winston.format.errors({ stack: true }),
    winston.format.colorize(),
    winston.format.json(),
  ),
});
