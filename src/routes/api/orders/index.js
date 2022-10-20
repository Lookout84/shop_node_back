const express = require('express');
const router = express.Router();
const ctrl = require('../../../controllers/orders');
const guard = require('../../../helpers/guard');

const { validationCreateOrder } = require('./validation');

router.use((req, res, next) => {
  console.log(req.url);
  next();
});

router.get('/', guard, ctrl.getOrders);
router.post('/add', guard, validationCreateOrder, ctrl.addOrder);
router
  .put('/:orderId', guard, ctrl.updateOrder)
  .delete('/:orderId', guard, ctrl.removeOrder);

module.exports = router;
