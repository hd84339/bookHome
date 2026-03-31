const express = require('express');
const app = express();
const mongoose = require('mongoose'); 
const Listing = require('./models/listing.js');
const path = require("path");



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

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));


app.get('/', (req, res) => {
    res.send('Hello World!');
});

// app.get('/testListings',  async(req, res) => {
//     let sampleListing = new Listing({
//         title: "Cozy Apartment in the City Center",
//         description: "A charming and cozy apartment located in the heart of the city. Perfect for a weekend getaway or a short stay.",
//         price: 120,
//         location: "New York",
//         country: "USA"
//     });
//     await sampleListing.save();
//     console.log('Sample listing saved to the database');
//     res.send('Sample listing created and saved to the database!');
// }
// );




 app.get('/listings',  async(req, res) => {
    const  allListings  = await Listing.find({})
        res.render("listings/index", {allListings});
    })

    // show route 
app.get("/listings/:id", async (req, res) => {
    let {id} = req.params;
    const listing = await Listing.findById(id)
    res.render("listings/show", {listing});
})


app.listen(3000, () => {
    console.log('Server is running on port 3000');
});