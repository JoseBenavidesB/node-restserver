const jwt = require('jsonwebtoken');

const generateJWT = ( uid = '' ) => {
    
    return new Promise ( (resolve, reject) => {

        const payload = { uid };

        //sign para firmar, al final opciones
        jwt.sign( payload, process.env.SECRETORPRIVATEKEY, {
            expiresIn: '4h'
        }, ( err, token) => { //callback si hay error y si todo sale bien

            if(err) {
                console.log(err)
                reject("No se pudo generar el token")
            } else {
                resolve( token );
            }
        })

    })
};

module.exports = {
    generateJWT,
}