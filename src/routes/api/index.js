const express = require('express');
const router = express.Router();

router.use('/auth', require('./users'));
router.use('/account', require('./users'));
router.use('/products', require('./products'));
router.use('/orders', require('./orders'));
router.use('/category', require('./category'));

module.exports = router;
