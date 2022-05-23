
/*
    NECESSARY REQUIREMENTS
*/

const config = require("dotconfigure");
const express = require("express");
const mongoose = require("mongoose");
const multer = require('multer');
const bodyParser = require("body-parser")
const path = require('path');

const uploadRoute = require("./routes/upload.route")
const fileRoute = require("./routes/file.route")

/*
    MIDDLE WARE
*/

const server = express();

mongoose.connect("mongodb+srv://gabby:winter22@personaldatabase.wqq3m.mongodb.net/?retryWrites=true&w=majority", {
    useUnifiedTopology: true,
    useNewUrlParser: true
}, (err)=> {
    if(err) throw err;
    else {
        console.log("> Server successfully connected to the database.")
    }
})

server.set('view engine', 'ejs')
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended: true}))
server.use(express.static(path.join(__dirname, 'public')));
server.set('views', path.join(__dirname, 'views'))

/*
    EXTERNAL ROUTES
*/

server.use("/", uploadRoute)
server.use("/file/", fileRoute)

/*
    STATIC ROUTES
*/

server.get("/", (req, res)=> {
    res.render("index.ejs")
})

server.get("/faq", (req, res)=> {
    res.render("faq.ejs")
})

server.get("/tos", (req, res)=> {
    res.render("tos.ejs")
})

server.get("/contact", (req, res)=> {
    res.render("contact.ejs")
})

/*
    MISCELLANEOUS
*/

server.listen(config.SERVER_PORT, config.SERVER_HOST, (err)=> {
    if(err) throw err;
    console.log("Voodoo Hosting - v1.0.0");
    console.log("---------------------------------------------");
    console.log("> Server is up and running.")
})