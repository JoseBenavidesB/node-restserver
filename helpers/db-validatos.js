const Role = require('../models/role');
const User = require('../models/user')
const { Category, Product } = require('../models') //hereeee

const validRole = async(role = '')=> {
    const existeRole = await Role.findOne({ role });

    if ( !existeRole ) {
        throw new Error(`El Role ${ role } no está registrado en la BD`)
    }
};

//verify email exist?
const emailExist = async(email = '')=> {
        const existeEmail = await User.findOne( { email });
        console.log(existeEmail);
        if ( existeEmail ) {
            throw new Error(`El correo ${ email } ya se encuentra registrado en la BD`)
        }
        
    
};

//verify user exist?
const userExist = async (id)=> {
    const existeUser = await User.findById(id);
    
    if ( !existeUser ) {
        /* return res.status(400).json({
            msg: 'EMAIL ALREADY EXISTS'
        }) */
        throw new Error(`El usuario con el id: ${ id } no existe en la BD`)
    }};


const validateCategoryId = async (id) => {

    const idDB = await Category.findById(id);

    if(!idDB) {
        throw new Error(`The ID ${id} doesnt exist`)
    }
};

const validateProductId = async (id) => {

    const idDB = await Product.findById(id);

    if(!idDB) {
        throw new Error(`The ID ${id} doesnt exist`)
    }
};

const validCollection = (collection = '', collections = []) => {

    const include = collections.includes( collection );
    if ( !include ) {
        throw new Error(` The collection: ${collection} is no valid, you can use: ${ collections }`)
    }

    return true
};

module.exports = {
    validRole,
    emailExist,
    userExist,
    validateCategoryId,
    validateProductId,
    validCollection
}