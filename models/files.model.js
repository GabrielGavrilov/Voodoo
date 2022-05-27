const mongoose = require("mongoose")

const fileSchema = new mongoose.Schema({
    file: {
        data: Buffer,
        contentType: String
    },
    file_id: Number,
    uploader_ip: String
}, {timestamps: true})

const fileModel = new mongoose.model('file', fileSchema);
module.exports = fileModel;