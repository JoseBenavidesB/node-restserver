
const bcryptjs = require('bcryptjs');
const { response } = require('express');
const { generateJWT } = require('../helpers/generate-jwt');
const { googleVerify } = require('../helpers/google-verify');
const User = require('../models/user');

const login = async (req, res = response) => {

    const { email, password } = req.body;

    try {

        //verify email exist?
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                msg: "User / password are not correct - email"
            })
        };

        //verufy user active?
        if (!user.status) {
            return res.status(400).json({
                msg: "User / password are not correct - status"
            })
        };


        //verify password
        const validPassword = bcryptjs.compareSync(password, user.password);

        if(!validPassword) {
            return res.status(400).json({
                msg: "User / password are not correct - password"
            })
        }

        //generate JWT
        const token = await generateJWT( user.id );

        res.json({
            user,
            token
        })

    } catch (error) {
        console.log(error);

        res.status(500).json({
            msg: 'Talk with the manager'
        });
    }

    
};

const googleSignin = async(req, res)=> {

    const { id_token } = req.body;

    try {

        const {email, name, img } = await googleVerify( id_token );
        
        let user = await User.findOne({ email })

        if ( !user) {
            const data = {
                name,
                email,
                password: ':P',
                img,
                google: true
            }

            user = new User( data );
            await user.save();
        };

        //if USER in DB with status false
        
        if (!user.status) {
            return res.status(401).json({
                msg: 'Talk with the manager, user locked',
            })
        };

        //create JWT
        const token = await generateJWT( user.id );

        res.json({
            msg: 'everething ok, google signin',
            user,
            token
        })

    } catch (error) {
        res.status(400).json({ //400 bad request
            msg: 'Google Token not valid'  
        })
    }
}

module.exports = {
    login,
    googleSignin
}