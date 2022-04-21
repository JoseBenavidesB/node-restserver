const { request } = require("express");
const { response } = require("express");
const jwt = require("jsonwebtoken");

const User = require('../models/user');

//usually jwt in header

const validateJWT = async (req = request, res = response, next)=> {

    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            msg: "there not a token in the request"
        })  //401 unauthorize
    }

    try {

        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        //console.log(uid)
        req.uid = uid //send uid in the request, check delete controller
        
        //read User Auth
        const userAuth = await User.findById(uid);
        if (!userAuth) {
            return res.status(401).json({
                msg: "User doesnt exists"
            })
        }


        //verify UID is status true
        if( !userAuth.status ) {
            return res.status(401).json({
                msg: "User inactive"
            })
        }
        req.userAuth = userAuth;
        
        
        next(); //continue...
    } catch (error) {
        //console.log(error);
        return res.status(401).json({
            msg: "no valid token"
        })
    }

    

};

module.exports = {
    validateJWT,
}