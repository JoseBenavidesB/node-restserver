

const  fieldValidate  = require('./field-validate');
const roleValidate = require('./role-validate.js');
const  validateJWT  = require('./validate-jwt');
const validateUploadedFile = require('../middlewares/validate-file')


module.exports = {
    ...fieldValidate,
    ...roleValidate,
    ...validateJWT,
    ...validateUploadedFile
}