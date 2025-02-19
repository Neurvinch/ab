const express = require('express');
const timetable = require("../Controllers/TimeTableController");
const router = express.Router();
const {identifer} = require("../Midddleware/identifer");

router.post("/createTimeTable" , identifer(['staff']),timetable.createTimeTable );

router.get("/getTimeTable" , identifer(["student"]) , timetable.viewTimeTable);

router.put("/updateTimetable" , identifer(["hod"]), timetable.updateTimeTable )

module.exports = router;