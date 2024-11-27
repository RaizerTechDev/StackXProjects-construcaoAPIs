const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const validationMiddleware = require('../middlewares/validationMiddleware');

// Rota GET: obter todos os produtos
router.get('/', productController.getAllProducts);

// Rota GET: obter um produto por ID
router.get('/:id', productController.getProductById);

// Rota POST: criar um novo produto
router.post('/', validationMiddleware, productController.createProduct);

// Rota PUT: atualizar um produto por ID
router.put('/:id', validationMiddleware, productController.updateProduct);

// Rota DELETE: deletar um produto por ID
router.delete('/:id', productController.deleteProduct);

module.exports = router;
