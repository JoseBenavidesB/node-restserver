const jwt = require('jsonwebtoken');

const generateJWT = ( uid = '' ) => {
    
    return new Promise ( (resolve, reject) => {

        const payload = { uid };

        //sign para firmar, al final opciones
        jwt.sign( payload, process.env.SECRETORPRIVATEKEY, {
            expiresIn: '4h'
        }, ( err, token) => { //Callback

            if(err) {
                console.log(err)
                reject("Is not possible generate JWT")
            } else {
                resolve( token );
            }
        })

    })
};

module.exports = {
    generateJWT,
}