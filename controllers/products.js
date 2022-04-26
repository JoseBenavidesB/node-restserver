const Product = require('../models/product')
const Category = require('../models/category');
const { response } = require('express');

/* ----------get all product-------------*/
const getProducts = async(req, res) => {
 
    const { limit, from } = req.query

    const [ total, products ] = await Promise.all([
        Product.countDocuments( {status: true} ),
        Product.find( {status: true })
        .skip( Number( from ) )
        .limit( Number( limit ) )
        .populate('user', 'name')
        .populate('category', 'name')
    ]);

    
    if (!products) {
        return res.status(401).json({
            msg: "There is not any category"
        })
    }

    return res.status(200).json({
        total,
        products,
        limit,
        from

    })
}

/* ----------get product by ID-------------*/

const getProduct = async (req, res=response) => {

    const { id } = req.params;

    const product = await Product.findById( id )
    .populate('user', 'name')
    .populate('category', 'name');

    return res.status(200).json({
        product
    })

}



/* ----------create product-------------*/

const createProduct = async (req, res) => {

    // name, user, price, category, description
    const userAuth = req.userAuth
    const name  = req.body.name.toUpperCase();
    const { user, status, ...other  } = req.body

    const productDB = await Product.findOne( {name} )


    if(productDB) {
        res.status(400).json({
            msg: `Product: ${name} already exists`
        })
    }

    const data = {
        name,
        user : userAuth._id,
        ...other
    }

    const newProduct = new Product( data );
    await newProduct.save()

    res.status(200).json({
        newProduct
    })

};

/* ----------update product-------------*/
const updateProduct = async(req, res= response) => {

    const { id } = req.params;
    const  user  = req.userAuth.id;
    const { status, available, ...other} = req.body;


    
    const data = {...other, user}

    const productUpdated = await Product.findByIdAndUpdate( id, data, {new:true}).populate('category', 'name').populate('user', 'name')   
    

    res.status(200).json({
        productUpdated
    })
}

/* ----------delete product-------------*/
const deleteProduct = async (req, res)=>{

    const { id } = req.params

    const productDeleted = await Product.findByIdAndUpdate( id, { status: false }, {new:true});

    res.status(200).json({
        productDeleted
    });
}



module.exports = {
    createProduct,
    getProducts,
    getProduct,
    updateProduct,
    deleteProduct
}