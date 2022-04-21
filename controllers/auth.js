
const bcryptjs = require('bcryptjs');
const { response } = require('express');
const { generateJWT } = require('../helpers/generate-jwt');
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

module.exports = {
    login,
}