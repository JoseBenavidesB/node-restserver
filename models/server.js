const express = require("express");
const cors = require("cors");


class Server {

    constructor () {
        this.app = express();
        this.port = process.env.PORT;
        this.usersRoutePath = '/api/users';

        //midlewares: es como una funcion que siempre se ejecute
        this.middlewares();


        //app routes
        this.routes();
    };

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