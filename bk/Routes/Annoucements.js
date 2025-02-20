const express = require('express');
const router = express.Router();
const { identifer } = require("../Midddleware/identifer");
const { getAnnouncements, createAnnouncements } = require('../Controllers/AnnoucementController');

router.get("/announcements" , identifer(['student', 'staff']) , getAnnouncements  )

router.post("/annoucementsadmin", identifer(['hod'] ) , createAnnouncements);

module.exports = router;