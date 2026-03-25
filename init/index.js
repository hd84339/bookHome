const mongoose = require('mongoose');
const {data} = require('./data.js');
const Listing = require('../models/listing.js');

const MONGO_URI = "mongodb://localhost:27017/bookHome";


main().then(() => {
    console.log('Database connection established');
}).catch(err => {
    console.error('Error connecting to MongoDB:', err);
});

async function main() {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB');
}

const initDB = async () => {
    try {
        await Listing.deleteMany({});
        console.log('Existing listings cleared');
        await Listing.insertMany(data);
        console.log('Sample listings inserted');
    } catch (err) {
        console.error('Error initializing database:', err);
    }
};
initDB().then(() => {
    console.log('Database initialization complete');
    mongoose.connection.close();
}).catch(err => {
    console.error('Error during database initialization:', err);
    mongoose.connection.close();
});