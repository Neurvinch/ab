const LeaveRequestModel = require("../Models/LeaveRequestModel");

exports.submitRequest = async (req, res) => {
  const { type, reason } = req.body;
  if (!type || !reason) {
    return res.status(400).json({ success: false, message: "Type and Reason are required" });
  }

  try {
    const newRequest = new LeaveRequestModel({
      rollNo: req.user.rollNo,
      type: type,
      reason: reason,
    });
    await newRequest.save();
    res.status(201).json({ success: true, message: "Leave Request submitted successfully" });
  } catch (error) {
    console.error("Error submitting leave request:", error);
    res.status(500).json({ success: false, message: "Error submitting leave request" });
  }
};


exports.getLeaveRequests = async (req, res) => {
    try {
      // Fetch all leave requests and populate student info if needed.
      const requests = await LeaveRequestModel.find().populate("studentId", "rollNo email");
      if (!requests || requests.length === 0) {
        return res.status(404).json({
          success: false,
          message: "No leave requests found"
        });
      }
      // Return the fetched requests in the response under the "data" property.
      res.status(200).json({
        success: true,
        data: requests
      });
    } catch (error) {
      console.error("Error fetching leave requests:", error);
      res.status(500).json({
        success: false,
        message: "Error fetching leave requests"
      });
    }
  };

  exports.updateLeaveRequest = async (req, res) => {
    let { status } = req.body;
    
    if (!status) {
      return res.status(400).json({ success: false, message: "Status is required" });
    }
    
    // Normalize status to lowercase
    status = status.toLowerCase();
    
    if (!["approved", "rejected"].includes(status)) {
      return res.status(400).json({ success: false, message: "Invalid status" });
    }
    
    try {
      // Use rollNo from the route parameters to find and update the leave request
      const request = await LeaveRequestModel.findOneAndUpdate(
        { rollNo: req.params.rollNo },
        { status, updatedAt: Date.now() },
        { new: true }
      );
      
      if (!request) {
        return res.status(404).json({ success: false, message: "Leave request not found" });
      }
      
      res.status(200).json({ success: true, message: "Leave request updated successfully", data: request });
    } catch (error) {
      console.error("Error updating leave request:", error);
      res.status(500).json({ success: false, message: "Error updating leave request" });
    }
  };

  // In your leaveRequestController.js
exports.getStudentLeaveRequests = async (req, res) => {
    try {
      // Assuming req.user.rollNo is set by your authentication middleware
      const requests = await LeaveRequestModel.find({ rollNo: req.user.rollNo });
      if (!requests || requests.length === 0) {
        return res.status(404).json({ success: false, message: "No leave requests found" });
      }
      res.status(200).json({ success: true, data: requests });
    } catch (error) {
      console.error("Error fetching student leave requests:", error);
      res.status(500).json({ success: false, message: "Error fetching leave requests" });
    }
  };
  
