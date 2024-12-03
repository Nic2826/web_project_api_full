const winston = require('winston');
const expressWinston = require('express-winston');

// Crea un logger de transporte
const logger = winston.createLogger({
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'request.log' })
  ],
  format: winston.format.json()
});

// Middleware de solicitud
const requestLogger = expressWinston.logger({
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'request.log' })
  ],
  format: winston.format.json()
});

// Middleware de error
const errorLogger = expressWinston.errorLogger({
  transports: [
        new winston.transports.File({ filename: 'error.log' }),
        new winston.transports.Console()
  ],
  format: winston.format.json()
});

module.exports = { requestLogger, errorLogger };