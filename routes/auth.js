const { Router } = require('express');
const { check } = require('express-validator');

const { login } = require('../controllers/auth');
const { fieldValidate } = require('../middlewares/field-validate');

const router = Router();

router.post('/login', [
    check('email', 'Email necessary').isEmail(),
    check('password', 'Password is necessary').not().isEmpty(),
    fieldValidate
] ,login);

module.exports = router;