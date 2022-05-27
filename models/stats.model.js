const mongoose = require("mongoose")

const statsSchema = new mongoose.Schema({
    files_hosting: Number
})

const statsModel = new mongoose.model("stat", statsSchema)
module.exports = statsModel;