const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');


const { dbConnection } = require('../db/config');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.paths = {
            authPath: '/api/auth',
            usersPath: '/api/users',
            categsPath: '/api/categs',
            products: '/api/products',
            search: '/api/search',
            uploads: '/api/uploads'
        }

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

        //Fileupload
        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath: true
        }));
    }

    routes() {

        this.app.use(this.paths.authPath, require('../routes/auth'));
        this.app.use(this.paths.usersPath, require('../routes/users'));
        this.app.use(this.paths.categsPath, require('../routes/categs'));
        this.app.use(this.paths.products, require('../routes/products'));
        this.app.use(this.paths.search, require('../routes/search'));
        this.app.use(this.paths.uploads, require('../routes/uploads'));
    }

    listen() {
        this.app.listen(this.port, () => console.log('Server started on port', this.port));
    }

}


module.exports = Server;