const productModel = require('../models/productModel');
const logger = require('../utils/logger');

module.exports = {
  async getAllProducts(req, res) {
    try {
      const products = await productModel.getAll();
      res.json(products);
    } catch (error) {
      logger.error('Erro ao buscar produtos:', error); // Substituído por logger
      res
        .status(500)
        .json({ message: 'Erro ao buscar produtos: ' + error.message });
    }
  },

  async getProductById(req, res) {
    try {
      const product = await productModel.getById(req.params.id);
      if (product) {
        res.json(product);
      } else {
        res.status(404).json({ message: 'Produto não encontrado.' });
      }
    } catch (error) {
      logger.error('Erro ao buscar produto:', error); // Substituído por logger
      res
        .status(500)
        .json({ message: 'Erro ao buscar produto: ' + error.message });
    }
  },

  async createProduct(req, res) {
    try {
      const newProduct = await productModel.create(req.body);
      res.status(201).json(newProduct);
    } catch (error) {
      logger.error('Erro ao criar produto:', error); // Substituído por logger
      res
        .status(500)
        .json({ message: 'Erro ao criar produto: ' + error.message });
    }
  },

  async updateProduct(req, res) {
    try {
      const product = await productModel.getById(req.params.id);
      if (product) {
        const updatedProduct = await productModel.update(
          req.params.id,
          req.body,
        );
        res.json({
          message: 'Produto atualizado com sucesso!',
          product: updatedProduct,
        });
      } else {
        res.status(404).json({ message: 'Produto não encontrado.' });
      }
    } catch (error) {
      logger.error('Erro ao atualizar produto:', error); // Substituído por logger
      res
        .status(500)
        .json({ message: 'Erro ao atualizar produto: ' + error.message });
    }
  },

  async deleteProduct(req, res) {
    try {
      const product = await productModel.getById(req.params.id);
      if (product) {
        await productModel.delete(req.params.id);
        res.status(204).json();
      } else {
        res.status(404).json({ message: 'Produto não encontrado.' });
      }
    } catch (error) {
      logger.error('Erro ao deletar produto:', error); // Substituído por logger
      res
        .status(500)
        .json({ message: 'Erro ao deletar produto: ' + error.message });
    }
  },
};
