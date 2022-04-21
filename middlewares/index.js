

const  fieldValidate  = require('./field-validate');
const roleValidate = require('../middlewares/role-validate,js');
const  validateJWT  = require('./validate-jwt');


module.exports = {
    ...fieldValidate,
    ...roleValidate,
    ...validateJWT,
}