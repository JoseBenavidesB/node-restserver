
const {Schema, model } = require('mongoose')

const RoleSchema = Schema({
    role: {
        type: String,
        required: [true, 'The Role is necessary']
    }
});

module.exports = model( 'Role', RoleSchema)