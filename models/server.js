const express = require("express");
const cors = require("cors");
const { dbConnection } = require('../database/config')
const fileUpload = require('express-fileupload')


class Server {

    constructor () {
        this.app = express();
        this.port = process.env.PORT;

        this.paths = {
            user :       '/api/users',
            auth :       '/api/auth',
            categories : '/api/categories',
            products:    '/api/products',
            find:        '/api/find',
            uploads: '/api/uploads'
        }

        // Connect to DATABASE
        this.connectDB();


        //midlewares: es como una funcion que siempre se ejecute
        this.middlewares();


        //app routes
        this.routes();
    };

    async connectDB() {
        await dbConnection();
    }

    middlewares() {

        this.app.use(cors()) //use CORS

        // parse and read body
        this.app.use( express.json() );

        //directorio public
        this.app.use( express.static('public') );

        // file upload
        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath: true
        }));
    }

    routes () {

        this.app.use( this.paths.auth, require('../routes/auth')); //the last is the file localited in routes/auth
        this.app.use( this.paths.user, require('../routes/user'));
        this.app.use( this.paths.categories, require( '../routes/categories'));
        this.app.use( this.paths.products, require( '../routes/products'));
        this.app.use( this.paths.find, require( '../routes/find'));
        this.app.use( this.paths.uploads, require( '../routes/uploads'));

        

    }

    listen() {
        this.app.listen(this.port);
    }

}

module.exports = Server;