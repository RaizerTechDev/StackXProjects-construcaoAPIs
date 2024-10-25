const winston = require('winston');

// Configurar o logger
const logger = winston.createLogger({
  level: 'error',  // Define o nível mínimo para captura de logs de erro
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log' }),
    new winston.transports.Console(),  // Adiciona transport de console
  ],
});

module.exports = logger;

