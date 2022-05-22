const mongoose = require("mongoose")

const fileSchema = new mongoose.Schema({
    file: {
        data: Buffer,
        contentType: String
    },
    file_id: Number
}, {timestamps: true})

const fileModel = new mongoose.model('file', fileSchema);
module.exports = fileModel;