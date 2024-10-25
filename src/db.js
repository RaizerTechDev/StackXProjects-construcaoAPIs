// db.js
const mongoose = require("mongoose");

async function connectWithRetry() {
  try {
    console.log("Tentando conectar ao MongoDB...");
    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 10000, // Timeout aumentado
    });
    console.log("Conectado ao MongoDB");
  } catch (error) {
    console.error("Erro ao conectar ao MongoDB:", error.message);
    console.error("Tentando novamente em 5 segundos...");
    setTimeout(connectWithRetry, 5000); // Tenta novamente após 5 segundos
  }
}

module.exports = connectWithRetry;




