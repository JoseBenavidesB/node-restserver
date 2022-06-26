const { Router } = require('express');
const { check } = require('express-validator');
const { uploadFiles, updateImagen, showImages, updateImagenCloudinary } = require('../controllers/uploads');
const { validCollection } = require('../helpers');
const { validateUploadedFile } = require('../middlewares')

const { fieldValidate } = require('../middlewares/field-validate');

const router = Router();



router.post('/', validateUploadedFile,uploadFiles);

router.put('/:collection/:id', [
    validateUploadedFile,
    check( 'id', 'Id must be MongoId').isMongoId(),
    check('collection').custom( c => validCollection( c, ['products', 'users'] ) ),
    fieldValidate
], updateImagenCloudinary);

router.get( '/:collection/:id', [
    check( 'id', 'Id must be MongoId').isMongoId(),
    check('collection').custom( c => validCollection( c, ['products', 'users'] ) ),
    fieldValidate
], showImages);



module.exports = router;