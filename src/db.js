const mongoose = require('mongoose');

async function connectWithRetry() {
  try {
    console.log('Tentando conectar ao MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 10000,
    });
    console.log('Conectado ao MongoDB');
  } catch (error) {
    console.error('Erro ao conectar ao MongoDB:', error.message);
    console.error('Tentando novamente em 5 segundos...');
    setTimeout(connectWithRetry, 5000);
  }
}

connectWithRetry();

module.exports = connectWithRetry;
