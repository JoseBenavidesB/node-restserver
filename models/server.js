const express = require("express");
const cors = require("cors");
const { dbConnection } = require('../database/config')


class Server {

    constructor () {
        this.app = express();
        this.port = process.env.PORT;
        this.usersRoutePath = '/api/users';

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
    }

    routes () {

        this.app.use( this.usersRoutePath, require('../routes/user'));

    }

    listen() {
        this.app.listen(this.port);
    }

}

module.exports = Server;