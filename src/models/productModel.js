const fs = require("fs");
const path = require("path");
// Definir o caminho para o diretório temporário no Vercel
const dataFilePath = "/tmp/products.json"; // Diretório temporário permitido no Vercel

// Função para ler o arquivo JSON
function readData() {
  try {
    const data = fs.readFileSync(dataFilePath, "utf-8");
    return JSON.parse(data);
  } catch (err) {
    console.log(
      "Arquivo não encontrado ou erro na leitura, iniciando com um array vazio."
    );
    return [];
  }
}

// Função para escrever as validações dos campos da pasta(middlewares) no arquivo JSON
function writeData(products) {
  try {
    fs.writeFileSync(dataFilePath, JSON.stringify(products, null, 2));
  } catch (err) {
    console.error("Erro ao gravar os dados:", err);
  }
}

module.exports = {
  getAll() {
    return readData(); // Retorna todos os produtos (celulares)
  },

  getById(id) {
    const products = readData();
    return products.find((product) => product.id.toString() === id);
  },

  create(product) {
    const products = readData();
    let lastId = products.length > 0 ? products[products.length - 1].id : 0;
    lastId += 1;
    product.id = lastId;
    products.push(product);
    writeData(products);
    return product;
  },

  update(id, updatedProduct) {
    const products = readData();
    const index = products.findIndex((product) => product.id.toString() === id);
    if (index !== -1) {
      products[index] = { ...products[index], ...updatedProduct };
      writeData(products);
    }
  },

  delete(id) {
    let products = readData();
    products = products.filter((product) => product.id.toString() !== id);
    writeData(products);
  },
};
