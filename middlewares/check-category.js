const Category = require('../models/category')

const checkCategory = async (req, res, next)=> {

    const { category } = req.body;
    
    const categoryDB = await Category.findById( category )

    if (!categoryDB) {
        return res.status(400).json({
            msg: `The category with the id ${category} doesnt exist`
        })
    }
    console.log( categoryDB );
    next()

};


module.exports = checkCategory