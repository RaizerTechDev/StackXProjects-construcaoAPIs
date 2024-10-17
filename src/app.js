require("dotenv").config();
const express = require("express");
const path = require("path");
const connectDB = require("./db"); // Importa a função de conexão do MongoDB
const productRoutes = require("./routes/productRoutes");

const app = express();

// Conectar ao banco de dados
connectDB();

// Servir arquivos estáticos, como CSS e imagens, da pasta 'public'
app.use(express.static(path.join(__dirname, "../public"))); // Ajuste o caminho para que 'public' seja acessível

// Middleware para lidar com JSON
app.use(express.json());

// Configurar EJS como motor de template
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views")); // Define a pasta de views

// Rota principal para renderizar a página inicial
app.get("/", (req, res) => {
  res.render("index"); // Renderiza o arquivo index.ejs sem o caminho
});

// Rotas da API de produtos
app.use("/api/products", productRoutes);

// Porta
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

module.exports = app;

