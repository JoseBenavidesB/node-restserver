
const { Router } = require('express');
const { check } = require('express-validator');
const { userGet, userPut, userPost, userDelete, userPatch } = require('../controllers/user');
const { validRole, emailExist, userExist } = require('../helpers/db-validatos');

/* const { fieldValidate } = require('../middlewares/field-validate');
const { hasRole, adminRole } = require('../middlewares/role-validate,js');
const { validateJWT } = require('../middlewares/validate-jwt');
 */

const { fieldValidate, validateJWT, hasRole, adminRole} = require('../middlewares');

const router = Router();

router.get('/', userGet);

router.put('/:id', [
    check('id', 'Doesnt a valid ID').isMongoId(),
    check('id').custom( userExist ),
    check('role').custom( validRole ),
    fieldValidate
],userPut);

router.post('/', [
    check('name', 'Name require').not().isEmpty(),
    check('password', 'Password require, must have at least 6 digits').isLength( { min: 6 }),
    check('email', 'Invalid email').isEmail(),
    check('email').custom( (email) => emailExist(email) ), //validate valid email
    //check('role', 'Invalid Role').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('role').custom( validRole ), //same (role)=> validRole(role)
    fieldValidate
] , userPost);

router.delete('/:id',[
    validateJWT,
    //adminRole,
    hasRole('ADMIN_ROLE', 'SUPER_ROLE'),
    check('id', 'Doesnt a valid ID').isMongoId(),
    check('id').custom( userExist ),
    fieldValidate
], userDelete);

router.patch('/', userPatch);


module.exports = router