const { Router } = require('express');
const { check } = require('express-validator');

const { login, googleSignin } = require('../controllers/auth');
const { fieldValidate } = require('../middlewares/field-validate');

const router = Router();

router.post('/login', [
    check('email', 'Email necessary').isEmail(),
    check('password', 'Password is necessary').not().isEmpty(),
    fieldValidate
] ,login);

router.post('/google', [
    check('id_token', 'id_token necessary').not().isEmpty(),
    fieldValidate
] ,googleSignin);


module.exports = router;