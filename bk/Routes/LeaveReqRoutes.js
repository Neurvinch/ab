const express = require('express');
const { identifer } = require('../Midddleware/identifer');
const router = express.Router();
const LeaveController = require("../Controllers/LeaveReqController");


router.post('/leaveRequest', identifer(["student"]), LeaveController.submitRequest );

router.get("/leaveRequestadmin", identifer(["staff" , "hod"]) , LeaveController.getLeaveRequests);

router.patch("/leaverequest/:rollNo", identifer(["staff" , "hod"]), LeaveController.updateLeaveRequest);

// For students to view their own leave requests:
router.get("/leaveRequest/student", identifer(['student']), LeaveController.getStudentLeaveRequests);

module.exports = router;
