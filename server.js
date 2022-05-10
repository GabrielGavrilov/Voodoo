const config = require("dotconfigure");
const express = require("express");
const path = require('path');

const server = express();

server.set('view engine', 'ejs')
server.use(express.static(path.join(__dirname, 'public')));
server.set('views', path.join(__dirname, 'views'))

server.get('/', (req, res)=> {
    res.render('index.ejs')
})

server.listen(config.SERVER_PORT, config.SERVER_HOST, (err)=> {
    if(err) throw err;
    console.log(`Server is listening @ port ${config.SERVER_PORT}`);
})