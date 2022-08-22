const mongoose = require('mongoose');

const dbConnection = async () => {

    try {

        await mongoose.connect(process.env.MONGODB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // useCreateIndex: true,
            // useFindAndModify: false
        });

        console.log('Database connected');

    } catch (error) {
        console.log(error);
        throw new Error('Error');
    }
}


module.exports = {
    dbConnection
}