const path = require('path')
const { v4: uuidv4 } = require('uuid');

const uploadFile = ( files, validExtention =  [ 'png', 'jpg', 'jpeg', 'gif'], folder = '') => {

    return new Promise( (resolve, reject) => {
        
        const archivo = files.archivo;
        const nameFile = archivo.name.split('.');
        const extention = nameFile[ nameFile.length - 1 ];

        if ( !validExtention.includes(extention) ) {
            return reject(`Extention ${ extention } is not valid, you can send: ${ validExtention }`)
        };

        const tempFileName = uuidv4() + '.' + extention;
        const uploadPath = path.join( __dirname, '../uploads/', folder , tempFileName );

        archivo.mv(uploadPath, (err) => {
                if (err) {
                    reject( err )
                }

                resolve( tempFileName )
            });
        
    });

};


module.exports = {
    uploadFile
}