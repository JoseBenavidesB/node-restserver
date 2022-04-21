
const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const User = require('../models/user');


const userGet = async (req = request, res = response) => {

    const { limit = 5, from = 0 } = req.query;
    /* const users = await User.find({ status:true }) //consultas a BD await
        .skip(Number( from ))
        .limit(Number( limit ));

    const total = await User.countDocuments({ status:true }); */

    const [total, users] = await Promise.all([
        User.countDocuments({ status:true }),
        User.find({ status:true }) //consultas a BD await
            .skip(Number( from ))
            .limit(Number( limit ))
    ]);
    res.json({
        total,
        users
    });
};

const userPut = async (req, res = response) => {
    
    const { id } = req.params;
    const { _id, password, google, email, ...others } = req.body;

    //validar contra base de datos
    if ( password ) {
        //encriptar contraseña
        const salt = bcryptjs.genSaltSync();
        others.password = bcryptjs.hashSync( password, salt);
    }

    const dbUser = await User.findByIdAndUpdate( id, others );

    res.json({
        dbUser
    })
};

const userPost = async (req, res = response) => {
    
    const { name, email, password, role } = req.body;
    const user = new User( { name, email, password, role } );

    
    //encrypt password
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync( password, salt);

    //save DB
    await user.save();

    res.json({
        user
    })
};

const userDelete = async (req, res = response) => {

    const { id } = req.params;

    /* const userAuth = req.userAuth; */ //this come from validate-jwt

    const user = await User.findByIdAndUpdate(id, { status: false } );


    res.json(
        user
    ) 
};


const userPatch = (req, res = response) => {
    res.json({
        msg: 'Parch hello-- controller'
    })
};


module.exports = {
    userGet,
    userPut,
    userPost,
    userDelete,
    userPatch
}