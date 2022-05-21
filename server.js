
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
        console.log("Server successfully connected to the database.")
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

server.get('/', (req, res)=> {
    res.render('index.ejs')
})

/*
    MISCELLANEOUS
*/

server.listen(config.SERVER_PORT, config.SERVER_HOST, (err)=> {
    if(err) throw err;
    console.log(`Server is listening @ port ${config.SERVER_PORT}`);
})