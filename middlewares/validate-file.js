const { response } = require("express");

const validateUploadedFile = (req, res = response, next) => {
    
    if (!req.files || Object.keys(req.files ).length === 0 || !req.files.archivo) {
        return res.status(400).json({ msg: 'There is not any file in the request'});        
    }; 

    next();
}

module.exports = {
    validateUploadedFile
}