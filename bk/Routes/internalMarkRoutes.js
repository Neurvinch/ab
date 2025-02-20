const express = require('express');
const router = express.Router();
const internalMarkController = require("../Controllers/internalMarkController");
const { identifer } = require("../Midddleware/identifer");

// Student: View internal marks
router.get("/internal-marks/student", identifer(['student']), internalMarkController.getInternalMarks);

// Staff: Upload internal marks
router.post("/internal-marks/upload", identifer(['staff','hod']), internalMarkController.uploadInternalMarks);

module.exports = router;
