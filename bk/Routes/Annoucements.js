const express = require('express');
const router = express.Router();
const { identifer } = require("../Midddleware/identifer");
const { getAnnouncements, createAnnouncements } = require('../Controllers/AnnoucementController');

router.get("/annoucements" , identifer(['student', 'staff']) , getAnnouncements  )

router.post("/annoucements", identifer(['hod'] ) , createAnnouncements);

module.exports = router;