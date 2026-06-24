const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingschema = new Schema({
    title:{
        type:String,
        required: true,
        trim:true
    },
    description:{
        type:String,
        required:true
    },
    image:{
        url:{ 
            type: String,
        required: true,
        },
        filename: String
    },
    price:{
        type: Number,
         min : 1,
         required:true
    },
    location:{
        type:String,
        required:true,
        trim: true
    },
    country:{
        type:String,
        required:true,
        trim:true
    },
})
const listing = mongoose.model("listing",listingschema);
module.exports = listing;
