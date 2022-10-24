const express = require('express');
const router = express.Router();
const ctrl = require('../../../controllers/category');
const ctrlProduct = require('../../../controllers/products');
const guard = require('../../../helpers/guard');

const { validationCreateCategory } = require('./validation');

router.use((req, res, next) => {
  console.log(req.url);
  next();
});

router.get('/', ctrl.getAllCategory);
router.get('/:categoryId', ctrl.getCategoryById);
router.post('/add', guard, validationCreateCategory, ctrl.addCategory);
router.put('/:categoryId', guard, ctrl.updateCategory);
router.get('/:categoryId/products', ctrlProduct.getAllProductsByCategory);
router.post('/:categoryId/product/add', guard, ctrlProduct.addProduct);
module.exports = router;
