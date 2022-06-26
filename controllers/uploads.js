const path = require('path');
const fs = require('fs');

const cloudinary = require('cloudinary').v2;
cloudinary.config( process.env.CLOUDINARY_URL );

const { response } = require("express");
const res = require("express/lib/response");
const { uploadFile } = require("../helpers");
const { Users, Product } = require("../models");



const uploadFiles = async(req, res = response ) => {


    try {
        const fileName = await uploadFile( req.files);
    
        res.json({
            msg: `Name: ${ fileName}`
        });
    } catch (msg) {
        res.status(400).json({
            msg
        })
    };

};

const updateImagen = async(req, res = response) => {
    const {id, collection} = req.params;

    let model;

    switch ( collection ) {
        case 'users':
            
            model = await Users.findById(id);
            if ( !model ) {
                return res.status(400).json({
                    msg: 'There is not any User with the id: ${id}'
                })
            };
        break;

        case 'products':
            
            model = await Product.findById(id);
            if ( !model ) {
                return res.status(400).json({
                    msg: `There is not any Product with the id: ${id}`
                })
            };

        break;
    
        default:
            return res.status(500).json({ msg: 'Forget valid this in the switch'});
    }

    //clean previus img
    if ( model.img ) {
        //delete img in server
        const pathImage = path.join( __dirname, '../uploads', collection, model.img)
        
        if( fs.existsSync( pathImage ) ) {
            fs.unlinkSync( pathImage );
        }
    };

    const fileName = await uploadFile( req.files, undefined, collection);
    model.img = fileName

    await model.save();

    res.json( model )
    
};

const updateImagenCloudinary = async(req, res = response) => {
    const {id, collection} = req.params;

    let model;

    switch ( collection ) {
        case 'users':
            
            model = await Users.findById(id);
            if ( !model ) {
                return res.status(400).json({
                    msg: 'There is not any User with the id: ${id}'
                })
            };
        break;

        case 'products':
            
            model = await Product.findById(id);
            if ( !model ) {
                return res.status(400).json({
                    msg: `There is not any Product with the id: ${id}`
                })
            };

        break;
    
        default:
            return res.status(500).json({ msg: 'Forget valid this in the switch'});
    }

    //clean previus img
    if ( model.img ) {
        //delete img in Cloudinary
        const nameArr = model.img.split('/');
        const name = nameArr[ nameArr.length - 1];
        const [ public_id ] = name.split('.');

        cloudinary.uploader.destroy( public_id );

    };

    const { tempFilePath } = req.files.archivo;
    const { secure_url } = await cloudinary.uploader.upload( tempFilePath );

    model.img = secure_url;

    await model.save();

    res.json( model )
    
};

const showImages = async(req, res = response) => {

    const { id, collection } = req.params;
    let model;

    switch ( collection ) {
        case 'users':
            
            model = await Users.findById(id);
            if ( !model ) {
                return res.status(400).json({
                    msg: 'There is not any User with the id: ${id}'
                })
            };
        break;

        case 'products':
            
            model = await Product.findById(id);
            if ( !model ) {
                return res.status(400).json({
                    msg: `There is not any Product with the id: ${id}`
                })
            };

        break;
    
        default:
            return res.status(500).json({ msg: 'Forget valid this in the switch'});
    }

    //clean previus img
    if ( model.img ) {
        //delete img in server
        const pathImage = path.join( __dirname, '../uploads', collection, model.img)
        
        if( fs.existsSync( pathImage ) ) {
            return res.sendFile(pathImage);
        }
    };

    const notImagePath = path.join( __dirname, '../assets/image-not-found.jpg');
    res.sendFile( notImagePath )

}

module.exports = {
    uploadFiles,
    updateImagen,
    showImages,
    updateImagenCloudinary
}