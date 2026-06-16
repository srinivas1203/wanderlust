const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");


let mongo_url = "mongodb://127.0.0.1:27017/wanderlust";
main()
.then(()=>{
    console.log("connected to DB");
})
.catch((err)=>{
    console.log(err);
});
async function main (){
await mongoose.connect(mongo_url);
}




app.engine("ejs",ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname,"views"));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname,"public")));


app.get("/",  (req , res ) => {
    res.send("u visted root");
})

    // index route//
app.get("/listings", async (req, res)=>{
    const allListings = await Listing.find({});
    res.render("./listings/index.ejs",{ allListings});
    })

    // new route // 
    app.get("/listings/new",(req, res)=>{
        res.render("listings/new.ejs");

    })
    app.post("/listings",async (req, res)=>{
        const newListing = new Listing(req.body.Listing);
        await newListing.save();
        res.redirect("/listings");
    })

    // show route //
    app.get("/listings/:id",  async (req,res)=>{
        let {id} = req.params;
        const listing = await Listing.findById(id);
        res.render("listings/show.ejs",{listing});
    })

    // edit route // 
    app.get("/listings/:id/edit", async(req, res)=>{
        let {id} = req.params;
        const listing = await Listing.findById(id);
        res.render("listings/edit.ejs", {listing});

    })

    // update route //
    app.post("/listings/:id", async(req, res)=>{
        let {id} = req.params;
        await Listing.findByIdAndUpdate(id,{...req.body.Listing});
        res.redirect("/listings");
    })

    // delete route //
    app.delete("/listings/:id", async (req,res)=>{
        let {id} = req.params;
        let deleteListing = await Listing.findByIdAndDelete(id); 
        console.log(deleteListing);
        res.redirect("/listings");
    })




// app.get("/testing", async(req, res)=>{
//     let sampleListing = new Listing ({
//         title: " my new house",
//         description: " its my new home",
//         price : 5000,
//         location: "hyderabad",
//         country:"india"
//     })
//    await sampleListing.save();
//    console.log("sample was saved ");
//    res.send("success");
// });
app.listen(8080, () =>{
    console.log("app is listening to the port 8080");
})