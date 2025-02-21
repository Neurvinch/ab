const mongoose = require('mongoose');

const internalMarkSchema = new mongoose.Schema({
  rollNo: { type: mongoose.Schema.Types.Number, ref: "UserModel",required: true }, // Using rollNo as identifier
  subject: { type: String, required: true },
  marks: { type: Number, required: true },
  examDate: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model("InternalMark", internalMarkSchema);
