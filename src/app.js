require('dotenv').config(); // Adicione esta linha no topo do arquivo

const express = require('express');
const productRoutes = require('./routes/productRoutes');

const app = express();

// Middleware para parsear JSON
app.use(express.json());

// Rota principal
app.get("/", (req, res) => {
  res.status(200).send(`
    <html>
      <head>
        <title>Bem-vindo à API de Produtos!</title>
      </head>
      <body>
        <h1>🌟 Bem-vindo à API de Produtos para Smartphones!</h1>
        <h2>👉 Para acessar a documentação no Postman, clique aqui: <a href="${process.env.POSTMAN_DOC_LINK}" target="_blank">Documentação da API</a></h2>       
      </body>
    </html>
  `);
});

// Rotas
app.use('/api/products', productRoutes);

// Porta
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

module.exports = app;
