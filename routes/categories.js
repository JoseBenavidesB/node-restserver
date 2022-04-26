const { Router } = require('express');
const { check } = require('express-validator');
const { createCategory, getCategories, getCategory, updateCategory, deleteCategory } = require('../controllers/categories');
const { validateCategoryId, validRole } = require('../helpers/db-validatos');

const { validateJWT, fieldValidate } = require('../middlewares');
const { adminRole } = require('../middlewares/role-validate');


const router = Router();

//get all categories - public
router.get('/', getCategories);

//get categorie using ID -public
router.get('/:id', [
    check('id', 'Not Mongo ID valid').isMongoId(),
    check('id').custom( validateCategoryId ),
    fieldValidate
],getCategory);

//create categorie - private (any role, is necesary login)
router.post('/', [
    validateJWT,
    check('name', 'Name is necessary').not().isEmpty(),
    fieldValidate
    ] , createCategory);

//update category - private (any role, is necesary login)
router.put('/:id', [
    validateJWT,
    check('id', 'ID Invalid').isMongoId(),
    check('id').custom( validateCategoryId ),
    fieldValidate
], updateCategory);

//delete category - only admin
router.delete('/:id', [
    validateJWT,
    adminRole,
    check('id', 'ID Invalid').isMongoId(),
    check('id').custom( validateCategoryId ),
    fieldValidate
], deleteCategory);

module.exports = router;