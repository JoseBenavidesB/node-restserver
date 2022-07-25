const Role = require('../models/role')
const { User, Category, Product } = require('../models') //hereeee

const validRole = async(role = '')=> {
    const existeRole = await Role.findOne({ role });

    if ( !existeRole ) {
        throw new Error(`The Role: ${ role } doesn't exist on DB`)
    }
};

//verify email exist?
const emailExist = async (email = '') => {
    const existeEmail = await User.findOne( { email });

    if ( existeEmail ) {
        throw new Error(`Email: ${ email }, already exists on DB`)
    }
};

//verify user exist?
const userExist = async (id)=> {
    const existeUser = await User.findById(id);
    
    if ( !existeUser ) {
        /* return res.status(400).json({
            msg: 'EMAIL ALREADY EXISTS'
        }) */
        throw new Error(`The user with the ID: ${ id }  Doesn't exists on DB`)
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