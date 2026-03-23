const express = require('express');
const app = express();
const mongoose = require('mongoose'); 

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

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});