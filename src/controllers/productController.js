const productModel = require('../models/productModel');

module.exports = {
  getAllProducts(req, res) {
    const products = productModel.getAll();
    res.json(products); // Retorna todos os celulares
  },

  getProductById(req, res) {
    const product = productModel.getById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Produto não encontrado.' });
    }
  },

  createProduct(req, res) {
    const newProduct = productModel.create(req.body);
    res.status(201).json(newProduct);
  },

  updateProduct(req, res) {
    const product = productModel.getById(req.params.id);
    if (product) {
      productModel.update(req.params.id, req.body);
      res.json({ message: 'Produto atualizado com sucesso!' });
    } else {
      res.status(404).json({ message: 'Produto não encontrado.' });
    }
  },

  deleteProduct(req, res) {
    const product = productModel.getById(req.params.id);
    if (product) {
      productModel.delete(req.params.id);
      res.json({ message: 'Produto deletado com sucesso!' });
    } else {
      res.status(404).json({ message: 'Produto não encontrado.' });
    }
  },
};
