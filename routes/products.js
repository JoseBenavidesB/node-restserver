
const { Router } = require('express');
const { check } = require('express-validator');
const { createProduct, getProducts, getProduct, updateProduct, deleteProduct} = require('../controllers/products');
const { validateProductId } = require('../helpers/db-validatos');
const checkCategory = require('../middlewares/check-category');
const { fieldValidate } = require('../middlewares/field-validate');
const { adminRole } = require('../middlewares/role-validate.js');
const { validateJWT } = require('../middlewares/validate-jwt');



const router = Router();

/* ----------get all active products-------------*/
router.get('/', getProducts);


/* ----------get product by id-------------*/
router.get('/:id', [
    check('id', 'Is not mongo ID VALID').isMongoId(),
    check('id').custom( validateProductId ),
    fieldValidate
],getProduct);

/* ----------create product-------------*/
router.post('/', [
    validateJWT,
    check('name', 'The name is necessary').not().isEmpty(),
    checkCategory,
    fieldValidate
],createProduct)

/* ----------update product-------------*/
router.put('/:id', [
    validateJWT,
    check('id', 'Is not mongo ID VALID').isMongoId(),
    check('id').custom( validateProductId ),
    checkCategory,
    fieldValidate
],updateProduct);

/* ----------delete product-------------*/
router.delete('/:id', [
    validateJWT,
    adminRole,
    check('id', 'Is not mongo ID VALID').isMongoId(),
    check('id').custom( validateProductId ),
    fieldValidate
],deleteProduct);

module.exports = router;
