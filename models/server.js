const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../db/config');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.usersPath = '/api/user';
        this.authPath = '/api/auth';

        //Connect to db
        this.connectToDB();

        //Middlewares
        this.middlewares();

        //Routes
        this.routes();
    }

    async connectToDB() {

        await dbConnection();
    }

    middlewares() {

        //Cors
        this.app.use(cors());

        //Read and parse
        this.app.use(express.json());

        //Public folder
        this.app.use(express.static('public'));
    }

    routes() {

        this.app.use(this.authPath, require('../routes/auth'));
        this.app.use(this.usersPath, require('../routes/user'));
    }

    listen() {
        this.app.listen(this.port, () => console.log('Server started on port', this.port));
    }

}


module.exports = Server;