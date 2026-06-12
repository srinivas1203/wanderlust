const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingschema = new Schema({
    title: String,
    description: String,
    image:{
        url: String,
        __filename: String
    },
    price: Number,
    location: String,
    country: String
})
const Listing = mongoose.model("Listing",listingschema);
module.exports = Listing;
