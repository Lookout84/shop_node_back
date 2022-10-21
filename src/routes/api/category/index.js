const express = require('express');
const router = express.Router();
const ctrl = require('../../../controllers/category');
const guard = require('../../../helpers/guard');

const { validationCreateCategory } = require('./validation');

router.use((req, res, next) => {
  console.log(req.url);
  next();
});

router.get('/', ctrl.getAllCategory);
router.post('/add', guard, validationCreateCategory, ctrl.addCategory);
router.put('/:categoryId', guard, ctrl.updateCategory);

module.exports = router;
