const express = require("express")
const router = express.Router()
const Files = require("../models/files.model")

router.get("/:id", (req, res)=> {

    const id = req.params.id

    Files.findOne({"file_id": id}, (err, data)=> {
        if(err) throw err;
        if(!data) {
            res.redirect('/')
        } else {

            const mimetype = data.file.contentType.split("/")

            res.render("file.ejs", {
                pageTitle: id,
                data: data,
                fileMimetype: mimetype[0]
            });
        }
    })

})

module.exports = router