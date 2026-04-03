const express = require('express');
const app = express();
const mongoose = require('mongoose'); 
const Listing = require('./models/listing.js');
const path = require("path");
const methodOverride = require("method-override")



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

 app.use(express.urlencoded({ extended: true }));
 app.use(methodOverride("_method"));

app.get('/', (req, res) => {
    res.send('Hello World!');
});

//
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
//

app.get('/listings',  async(req, res) => {
    const  allListings  = await Listing.find({})
        res.render("listings/index", {allListings});
    })    


app.get("/listings/new", (req, res) => {
    res.render("listings/new");
})

// show route 
app.get("/listings/:id", async (req, res) => {
    let {id} = req.params;
    const listing = await Listing.findById(id)
    res.render("listings/show", {listing});
})


// create route
app.post("/listings", async (req, res) => {
    
   const  newListing =  new Listing(req.body.listing)
   await newListing.save();
   res.redirect("/listings")
})

// edit route 
app.get("/listings/:id/edit", async (req, res) =>{
    let { id } = req.params;
    const listing  = await Listing.findById(id);
    res.render("listings/edit", {listing})
    
})
app.put("/listings/:id", async (req, res) => {
    let { id } = req.params;

    console.log("Put route hit ");

    await Listing.findByIdAndUpdate(id, req.body.listing);

    res.redirect(`/listings/${id}`);
})
// app.get("/listings/:id", async (req, res) => {
//     let { id } = req.params;

//     let listing = await Listing.findById(id);

//     res.render("show", {listing});

// })
// app.get("/listings/new", (req, res) => {
// res.render("listings/new");
// })


app.listen(3000, () => {
    console.log('Server is running on port 3000');
});