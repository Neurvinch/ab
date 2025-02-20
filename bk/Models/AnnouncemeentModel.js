const mongoose = require('mongoose');

const announcementSchema = mongoose.Schema({
    title: { type: String, required: true },
    content : { type: String, required: true },
    postedBy : { type: mongoose.Schema.Types.ObjectId, ref: "UserModel", required: true },
    createdAt: { type: Date, default: Date.now },
})

module.exports = mongoose.model("AnnouncementModel", announcementSchema);