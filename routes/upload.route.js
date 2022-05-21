const express = require("express")
const bodyParser = require("body-parser")
const router = express.Router();
const multer = require("multer");
const fs = require('fs')
const path = require("path")
const Files = require("../models/files.model");

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
    
    if(req.fileValidationError) {
        res.redirect('/')
    }

    const file = new Files({
        img: {
            data: fs.readFileSync(path.join('./uploads/' + req.file.filename)),
            contentType: req.file.mimetype
        }
    })

    file.save((err)=> {
        if(err) throw err;
        console.log("new file has been uploaded")
        res.redirect('/')
    })

})

module.exports = router