const express = require("express")
const bodyParser = require("body-parser")
const router = express.Router();
const multer = require("multer");
const fs = require('fs')
const path = require("path")
const Files = require("../models/files.model");
const { type } = require("express/lib/response");

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + " - " + file.originalname)
    }
})

const fileUpload = multer({
    storage: fileStorage
})

router.post('/upload', fileUpload.single('FILE_UPLOAD'), (req, res)=> {

    const numbGen = Math.floor(Math.random() * 99999999) + 10000000
    const mimetype = req.file.mimetype.split("/")
    if(req.fileValidationError) {
        res.redirect('/')
    }

    if(mimetype[0] !== "image" || mimetype[0] !== "video") {
        res.redirect("/")
        console.log(`> cannot upload ${mimetype[0]}`)
    } else {

        const file = new Files({
            file: {
                data: fs.readFileSync(path.join('./uploads/' + req.file.filename)),
                contentType: req.file.mimetype
            },
            file_id: numbGen,
            uploader_ip: req.ip
        })
    
        file.save((err)=> {
            if(err) throw err;
            console.log("> " + req.ip + " has uploaded: " + req.file.originalname)
            Files.findOne({"file_id": numbGen}, (err, data) => {
                if(err) throw err
                if(!data) {
                    res.redirect('/')
                } else {
                    res.redirect('/file/' + data.file_id)
                }
            })
        })

    }

})

module.exports = router