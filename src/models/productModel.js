const fs = require("fs");
const path = require("path");
const dataFilePath = path.join(__dirname, "../data/products.json");

// Função para ler o arquivo JSON
function readData() {
  const data = fs.readFileSync(dataFilePath, "utf-8");
  return JSON.parse(data);
}

// Função para escrever as validações dos campos da pasta(middlewares) no arquivo JSON 
function writeData(products) {
  fs.writeFileSync(dataFilePath, JSON.stringify(products, null, 2));
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
