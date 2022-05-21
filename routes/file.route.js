const express = require("express")
const router = express.Router()
const Files = require("../models/files.model")

router.get("/:id", (req, res)=> {

    const id = req.params.id

    Files.findOne({"_id": id}, (err, data)=> {
        if(err) throw err;
        if(!data) {
            res.redirect('/')
        } else {
            res.render("file.ejs", {
                pageTitle: id,
                image: data
            });
        }
    })

})

module.exports = router