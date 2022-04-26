const { response } = require('express');
const { Users, Category, Product } = require('../models');
const { ObjectId } = require('mongoose').Types;

const allowedCollections = [
    'users',
    'categories',
    'products',
    'roles'
]

/* --------------find users------------- */
const findUsers = async( termino = '', res = response)=> {
    
    const validMongoID = ObjectId.isValid( termino );

    if(validMongoID) {
        const user = await Users.findById(termino);
        return res.json({
            results: ( user ) ?  user  : []
        })
    }

    const regex = new RegExp( termino, 'i')

    const users = await Users.find({ 
        $or: [{ name: regex }, { email: regex }],
        $and: [{ status:true }]
     });

    res.json({
        results: users
    })

}
/* --------------find categories------------- */
const findCategories = async( termino = '', res = response)=> {
    
    const validMongoID = ObjectId.isValid( termino );

    if(validMongoID) {
        const category = await Category.findById(termino);
        return res.json({
            results: ( category ) ?  category  : []
        })
    }

    const regex = new RegExp( termino, 'i')

    const categories = await Category.find({ name: regex, status:true });

    res.json({
        results: categories
    })

}

/* --------------find products------------- */
const findProducts = async( termino = '', res = response)=> {
    
    const validMongoID = ObjectId.isValid( termino );

    if(validMongoID) {
        const product = await Product.findById(termino).populate('category', 'name');
        return res.json({
            results: ( product ) ?  product  : []
        })
    }

    const regex = new RegExp( termino, 'i')

    const products = await Product.find({ name: regex, status:true }).populate('category', 'name');

    res.json({
        results: products
    })

}

/* --------------find anything------------- */
const find = (req, res = response) => {    

    const { collection, termino } = req.params;

    if(!allowedCollections.includes( collection )) {
        return res.status(400).json({
            msg: `The allowed collections are: ${allowedCollections}`
        })
    }

    switch (collection) {
        case 'users':
            findUsers( termino, res);
        break;
        case 'categories':
            findCategories( termino, res);
        break;
        case 'products':
            findProducts( termino, res);
        break;

        default:
            res.status(500).json({
                msg: "Forget make this find"
            })
    }

}

module.exports = {
    find,
}