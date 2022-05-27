const express = require("express")
const router = express.Router()
const Stats = require("../models/stats.model")

router.get("/api", (req, res)=> {
    
    const createStats = new Stats({
        files_hosting: 0
    })

    createStats.save((err)=> {
        if(err) throw err;
        res.redirect("/")
    })

})

module.exports = router;