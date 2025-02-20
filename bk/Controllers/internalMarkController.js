const InternalMark = require("../Models/internalMarkSchema");

// Students view their internal marks
exports.getInternalMarks = async (req, res) => {
  try {
    // req.user.rollNo should be set by your authentication middleware
    const marks = await InternalMark.find({ rollNo: req.user.rollNo });
    if (!marks || marks.length === 0) {
      return res.status(404).json({ success: false, message: "No internal marks found" });
    }
    res.status(200).json({ success: true, data: marks });
  } catch (error) {
    console.error("Error fetching internal marks:", error);
    res.status(500).json({ success: false, message: "Error fetching internal marks" });
  }
};

// Staff upload internal marks (batch upload)
exports.uploadInternalMarks = async (req, res) => {
  // Expect an array of marks objects in req.body.marksData
  const { marksData } = req.body;
  if (!marksData || !Array.isArray(marksData) || marksData.length === 0) {
    return res.status(400).json({ success: false, message: "Marks data is required" });
  }
  try {
    const uploadedMarks = await InternalMark.insertMany(marksData);
    res.status(201).json({ success: true, data: uploadedMarks, message: "Internal marks uploaded successfully" });
  } catch (error) {
    console.error("Error uploading internal marks:", error);
    res.status(500).json({ success: false, message: "Error uploading internal marks" });
  }
};
