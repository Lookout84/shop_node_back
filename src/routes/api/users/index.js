const express = require('express');
const router = express.Router();
const ctrl = require('../../../controllers/users');
const guard = require('../../../helpers/guard');

const { validationCreateUser, validationLoginUser, validationUpdateUser, validationUpdatePassword } = require('./validation');

router.post('/register', validationCreateUser, ctrl.register);
router.post('/login', validationLoginUser, ctrl.login);
router.post('/logout', guard, ctrl.logout);
router.get('/', guard, ctrl.currentUser);
router.put('/', guard, validationUpdateUser, ctrl.updateAccount);
router.put('/password', guard, validationUpdatePassword, ctrl.updateAccountPassword);


module.exports = router;
