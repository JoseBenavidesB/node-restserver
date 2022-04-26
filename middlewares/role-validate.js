const { response } = require("express");
const { request } = require("express");


const adminRole = (req= request, res = response, next) => {


    if (!req.userAuth) {
        return res.status(500).json({ //500 INTERNAL SERVER ERROR
            msg: "You need validate token first"
        })
    };

    const { role, name } = req.userAuth
    if (role != 'ADMIN_ROLE') {
        return res.status(401).json({ 
            msg: `The user ${name} is not a admin`
        })
    }

    next();

};

const hasRole = ( ...roles ) => {//get the all roles include in the middleware route
    
    return (req= request, res = response, next) => {

        if (!req.userAuth) {
            return res.status(500).json({ //500 INTERNAL SERVER ERROR
                msg: "You need validate token first"
            })
        };

        if ( !roles.includes( req.userAuth.role )) {
            return res.status(401).json({
                msg: `The user ${req.userAuth.name} is not authorized`
            })
        }

         
        next();
    }
};

module.exports = {
    adminRole,
    hasRole
}