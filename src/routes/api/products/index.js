const express = require('express');
const router = express.Router();
const ctrl = require('../../../controllers/products');
const guard = require('../../../helpers/guard');

const {
  validationCreateProduct,
  validationUpdateProduct,
} = require('./validation');

router.use((req, res, next) => {
  console.log(req.url);
  next();
});

router.get('/', ctrl.getAllProducts);
router.get('/:productId', ctrl.getProductById);
// router.get('/ids', ctrl.getProductsByIds);
router.post('/add', guard, validationCreateProduct, ctrl.addProduct);
router
  .put('/:productId', guard, validationUpdateProduct, ctrl.updateProduct)
  .delete('/:productId', guard, ctrl.removeProduct);
router
  .post('/:productId/favorite', guard, ctrl.updateFavoriteProduct)
  .put('/:productId/favorite', guard, ctrl.deleteFavoriteProduct);

module.exports = router;
