require("dotenv").config();
const express = require("express");
const path = require("path");
const connectDB = require("./db"); // Importa a função de conexão do MongoDB
const productRoutes = require("./routes/productRoutes");

const app = express();

// Conectar ao banco de dados
connectDB();

// Servir arquivos estáticos, como CSS e imagens, da pasta 'public'
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

// Rota principal
app.get("/", (req, res) => {
  res.status(200).send(`
    <html>
      <head>
        <link rel="stylesheet" href="/css/styles.css">     
        <title>Bem-vindo à API de Produtos!</title>
      </head>
      <body>
        <h1>🌟 Bem-vindo à API de Produtos para Smartphones!</h1>
        <h2>👉 Para acessar a documentação no Postman <br>clique aqui: <a href="${process.env.POSTMAN_DOC_LINK}" target="_blank"><span>Documentação da API</span></a></h2>       
      </body>
    </html>
  `);
});

// Rotas
app.use("/api/products", productRoutes);

// Porta
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

module.exports = app;
