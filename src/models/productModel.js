const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");

// Verifica se está rodando no ambiente de produção (Vercel)
const isVercel = process.env.VERCEL === "1";

// Define o caminho do arquivo de dados de acordo com o ambiente
const dataFilePath = isVercel
  ? path.join(__dirname, "../tmp/products.json")
  : path.join(__dirname, "../data/products.json");

// Conexão com o MongoDB (somente em produção)
if (isVercel) {
// Conexão com o MongoDB (somente em produção)
if (isVercel) {
  mongoose
    .connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000, // Mantendo apenas o timeout
    })
    .then(() => console.log("Conectado ao MongoDB"))
    .catch((error) => {
      console.error("Erro ao conectar ao MongoDB:", error);
      process.exit(1);
    });
 }
}

// Define o schema para o MongoDB
const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  quantity: { type: Number, required: true, min: 1 },
  price: { type: Number, required: true, min: 0 },
});

const Product = mongoose.model("Product", productSchema);

// Função para garantir que o arquivo JSON exista
function ensureFileExists() {
  if (!fs.existsSync(dataFilePath)) {
    writeData([]); // Cria o arquivo com um array vazio
  }
}

// Função para ler o arquivo JSON
function readData() {
  ensureFileExists(); // Garantir que o arquivo exista
  try {
    const data = fs.readFileSync(dataFilePath, "utf-8");
    return JSON.parse(data); // Faz o parse do JSON
  } catch (err) {
    console.log(
      "Arquivo não encontrado ou erro na leitura, iniciando com um array vazio."
    );
    return [];
  }
}

// Função para gravar os dados no arquivo JSON
function writeData(products) {
  try {
    fs.writeFileSync(dataFilePath, JSON.stringify(products, null, 2));
  } catch (err) {
    console.error("Erro ao gravar os dados:", err);
  }
}

module.exports = {
  async getAll() {
    if (isVercel) {
      try {
        return await Product.find();
      } catch (error) {
        console.error("Erro ao buscar produtos no MongoDB:", error);
        throw error;
      }
    } else {
      return readData();
    }
  },

  async getById(id) {
    if (isVercel) {
      try {
        return await Product.findById(id);
      } catch (error) {
        console.error("Erro ao buscar produto por ID no MongoDB:", error);
        throw error;
      }
    } else {
      const products = readData();
      return products.find((product) => product.id.toString() === id);
    }
  },

  async create(product) {
    if (isVercel) {
      const newProduct = new Product(product);
      try {
        return await newProduct.save();
      } catch (error) {
        console.error("Erro ao salvar produto no MongoDB:", error);
        throw error;
      }
    } else {
      const products = readData();
      let lastId = products.length > 0 ? products[products.length - 1].id : 0;
      lastId += 1;
      product.id = lastId;
      products.push(product);
      writeData(products);
      return product;
    }
  },

  async update(id, updatedProduct) {
    if (isVercel) {
      try {
        return await Product.findByIdAndUpdate(id, updatedProduct, {
          new: true,
        });
      } catch (error) {
        console.error("Erro ao atualizar produto no MongoDB:", error);
        throw error;
      }
    } else {
      const products = readData();
      const index = products.findIndex(
        (product) => product.id.toString() === id
      );
      if (index !== -1) {
        products[index] = { ...products[index], ...updatedProduct };
        writeData(products);
        return products[index];
      } else {
        console.error("Produto não encontrado para atualizar.");
        return null;
      }
    }
  },

  async delete(id) {
    if (isVercel) {
      try {
        return await Product.findByIdAndDelete(id);
      } catch (error) {
        console.error("Erro ao deletar produto no MongoDB:", error);
        throw error;
      }
    } else {
      let products = readData();
      products = products.filter((product) => product.id.toString() !== id);
      writeData(products);
      return products;
    }
  },
};
