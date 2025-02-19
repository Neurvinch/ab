const express = require('express')
const { getProfile, updateProfile} = require ("../Controllers/ProfileController");
const { identifer} = require("../Midddleware/identifer");
const router = express.Router();


router.get("/Profile" , identifer(["student" ,"hod" ,"staff"]), getProfile );

router.patch("/updateProfile/:rollNo" , identifer(["student" ,"hod" ,"staff"]), updateProfile );

module.exports = router;
