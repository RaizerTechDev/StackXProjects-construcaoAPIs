const productModel = require("../models/productModel");

module.exports = {
  async getAllProducts(req, res) {
    try {
      const products = await productModel.getAll(); // Certifique-se de que getAll também seja assíncrona
      res.json(products);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Erro ao buscar produtos: " + error.message });
    }
  },

  async getProductById(req, res) {
    try {
      const product = await productModel.getById(req.params.id); // Use await para resolver a Promise
      if (product) {
        res.json(product);
      } else {
        res.status(404).json({ message: "Produto não encontrado." });
      }
    } catch (error) {
      console.error("Erro ao buscar produto:", error); // Log do erro
      res
        .status(500)
        .json({ message: "Erro ao buscar produto: " + error.message }); // Resposta de erro
    }
  },

  async createProduct(req, res) {
    console.log("Dados recebidos:", req.body); // Log dos dados recebidos
    try {
      const newProduct = await productModel.create(req.body); 
       console.log("Produto criado com sucesso:", newProduct);// Aguarda a criação do novo produto
      res.status(201).json(newProduct); // Retorna o produto criado
    } catch (error) {
      console.error("Erro ao criar produto:", error); // Log do erro
      res
        .status(500)
        .json({ message: "Erro ao criar produto: " + error.message }); // Resposta de erro
    }
  },

  async updateProduct(req, res) {
    console.log("Produto Atualizado com sucesso!"); // Log dos dados recebidos
    try {
      const product = await productModel.getById(req.params.id);
      if (product) {
        const updatedProduct = await productModel.update(
          req.params.id,
          req.body
        ); // Aguarda a atualização
        res.json({
          message: "Produto atualizado com sucesso!",
          product: updatedProduct,
        });
      } else {
        res.status(404).json({ message: "Produto não encontrado." });
      }
    } catch (error) {
      console.error("Erro ao atualizar produto:", error);
      res
        .status(500)
        .json({ message: "Erro ao atualizar produto: " + error.message });
    }
  },

  async deleteProduct(req, res) {
    console.log("Deletado com sucesso!"); // Log dos dados recebidos
    try {
      const product = await productModel.getById(req.params.id);
      if (product) {
        await productModel.delete(req.params.id); // Aguarda a exclusão
        res.status(204).json();
      } else {
        res.status(404).json({ message: "Produto não encontrado." });
      }
    } catch (error) {
      console.error("Erro ao deletar produto:", error);
      res
        .status(500)
        .json({ message: "Erro ao deletar produto: " + error.message });
    }
  },
};
