const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
    createdAt: { type: Date, default: Date.now },
    name: { type: String, required: [true, "Uploaded file must have a name"] },
    avatarUserId: { type: String, required: true },
    img: {
        data: Buffer,
        contentType: String
    }
})

module.exports = mongoose.model("File", fileSchema);