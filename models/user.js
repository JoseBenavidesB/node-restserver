
const { Schema, model } = require('mongoose');

const UserSchema = Schema({
    name: {
        type: String,
        require: [true, 'Name is required']
    },
    email: {
        type: String,
        require: [true, 'Email is required'],
        unique: true,
    },
    password: {
        type: String,
        require: [true, 'Password is required'],
    },
    img: {
        type: String,
    },
    role: {
        type: String,
        require: true,
        default: 'USER_ROLE',
        emun: ['ADMIN_ROLE', 'USER_ROLE']
    },
    status: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    },
});

//metodos que pueden sobrescribir, elimina password  __v de la respuesta json

UserSchema.methods.toJSON = function() {
    const { password, __v, _id, ...userData } = this.toObject();
    userData.uid = _id
    return userData;
}

module.exports = model( 'Users', UserSchema );