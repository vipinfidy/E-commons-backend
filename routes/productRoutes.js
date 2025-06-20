const express = require('express');
const router = express.Router();

const productController = require('../controllers/productController');
const authMiddleware = require('../middlewares/authMiddleware');
const checkRole = require('../middlewares/roleMiddleware.js');

router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);

// Admin-only routes
router.post('/', authMiddleware, checkRole('admin'), productController.createProduct);
router.put('/:id', authMiddleware, checkRole('admin'), productController.updateProduct);
router.delete('/:id', authMiddleware, checkRole('admin'), productController.deleteProduct);

module.exports = router;
