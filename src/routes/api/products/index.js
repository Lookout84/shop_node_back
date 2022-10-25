const express = require('express');
const router = express.Router();
const ctrl = require('../../../controllers/products');
const guard = require('../../../helpers/guard');

const { validationCreateProduct } = require('./validation');

router.use((req, res, next) => {
  console.log(req.url);
  next();
});

router.get('/', ctrl.getAllProducts);
router.get('/:productId', ctrl.getProductById);
router.get('/{ids}', guard, ctrl.getProductsByIds);
router.post('/add', guard, validationCreateProduct, ctrl.addProduct);
router
  .put('/:productId', guard, ctrl.updateProduct)
  .delete('/:productId', guard, ctrl.removeProduct);

module.exports = router;
