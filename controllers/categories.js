const { response } = require("express");
const { Category } = require('../models')

/* -----------get categories -------------- */
const getCategories = async (req, res) => {

    const { limit, from } = req.query

    const [ total, categories ] = await Promise.all([
        Category.countDocuments( {status: true} ),
        Category.find( {status: true })
        .skip( Number( from ) )
        .limit( Number( limit ) )
        .populate('user', 'name')
    ]);

    
    if (!categories) {
        return res.status(401).json({
            msg: "There is not any category"
        })
    }

    return res.status(200).json({
        total,
        categories,
        limit,
        from

    })
}

/* ----------- get category by id ---------- */
const getCategory = async (req, res = response) => {
    const { id }= req.params;
    
    const category = await Category.findById( id )

    return res.status(200).json({
        category
    })
}

/* ----------- create category ---------- */
const createCategory = async (req, res = response)=> {

    const name = req.body.name.toUpperCase();

    const categoryDB = await Category.findOne( { name } );

    if (categoryDB) {
        res.status(400).json({
            msg: `Category: ${name} already exists`
        })
    };

    //generate data to save
    const data = {
        name: name,
        user: req.userAuth._id
    };

    const category = new Category( data ); //quede en el video 7, hacer la tarea
    await category.save();

    res.status(201).json(category);
}

/* ----------- update category ---------- */

const updateCategory = async (req, res)=> {
    const uid = req.userAuth.uid;
    const { id } = req.params;
    const { status, user, ...data } = req.body;

    data.name = data.name.toUpperCase()

    const name = data.name

    const category = await Category.findOne( { name } );

    if(category) {
        return res.status(400).json({
            msg: `Category: ${name} already exists`
        })
    };
    
    const updateCategory = await Category.findByIdAndUpdate(id, data, {new: true}) //new: true mande el mas nuevo

    return res.status(200).json({
        updateCategory
    })

}

/* ----------- update category ---------- */
const deleteCategory = async (req, res)=> {

    const { id } = req.params

    const categoryDeleted = await Category.findByIdAndUpdate(id, {status: false}, {new:true})
    
    return res.status(200).json({
        categoryDeleted
    })
}

module.exports = {
    createCategory,
    getCategories,
    getCategory,
    updateCategory,
    deleteCategory
}


//TODO middleware exist category