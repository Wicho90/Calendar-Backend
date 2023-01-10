const mongoose = require('mongoose');

const { MONGODB_URL } = process.env;


const dbConnection = async() => {
    
    try {

        
        await mongoose.set('strictQuery', false).connect(MONGODB_URL);
        
         console.log('DB Online');

    } catch ( error ) {
        console.log( error );
        throw new Error('Error a la hora de inicializar BD');
    }
}


module.exports = {
    dbConnection
};