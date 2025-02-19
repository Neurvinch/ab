const mongoose = require('mongoose');

const LeaveSchema = new mongoose.Schema({
    rollNo: { type : mongoose.Schema.Types.Number, ref: "UserModel", required: true },
    type : { type : String, enum : ["Leave", "OD"], required: true },
    reason:{ type: String, required: true },
    status : { type : String , enum :["Pending", "Approved", "Rejected"], default : "Pending" },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model("LeaveRequestModel", LeaveSchema);