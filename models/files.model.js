const mongoose = require("mongoose")

const fileSchema = new mongoose.Schema({
    img: {
        data: Buffer,
        contentType: String
    }
}, {timestamps: true})

const fileModel = new mongoose.model('file', fileSchema);
module.exports = fileModel;