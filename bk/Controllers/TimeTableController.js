const TimeTableModel = require("../Models/TimeTableModel");

exports.viewTimeTable = async (req, res) => {
  try {
    // Query timetable based on user's classRoom.
    const timetable = await TimeTableModel.find({
      rollNo: req.user.rollNo
    });
    if (!timetable || timetable.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No timetable found for this class"
      });
    }
    res.json({
      success: true,
      data: timetable
    });
  } catch (error) {
    console.error("Error in viewTimeTable:", error);
    res.status(500).json({ success: false, message: "Error in viewTimeTable" });
  }
};

exports.createTimeTable = async (req, res) => {
  const { day, period, classRoom, subject } = req.body;
  try {
    const timetable = new TimeTableModel({
      day,
      period,
      classRoom,
      subject,
    });
    await timetable.save();
    res.status(201).json({
      success: true,
      data: timetable
    });
  } catch (error) {
    console.error("Error in createTimeTable:", error);
    res.status(500).json({ success: false, message: "Error in createTimeTable" });
  }
};

exports.updateTimeTable = async (req, res) => {
  // Option 1: Update using a unique ID from req.params
  // const { id } = req.params;
  // const updateData = req.body;
  // try {
  //   const timetable = await TimeTableModel.findByIdAndUpdate(id, updateData, { new: true });
  //   if (!timetable) {
  //     return res.status(404).json({ success: false, message: "Timetable not found" });
  //   }
  //   return res.status(200).json({ success: true, message: "Timetable updated", data: timetable });
  // } catch (error) {
  //   console.error("Error in updateTimeTable:", error);
  //   return res.status(500).json({ success: false, message: "Error in updateTimeTable" });
  // }

  // Option 2: Update using query criteria (your original approach)
  const { day, period, classRoom, subject } = req.body;
  try {
    const timetable = await TimeTableModel.findOneAndUpdate(
      { classRoom, day, period, subject },
      { day, period, classRoom, subject },
      { new: true }
    );
    if (!timetable) {
      return res.status(404).json({
        success: false,
        message: "Timetable not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Timetable updated",
      data: timetable,
    });
  } catch (error) {
    console.error("Error in updateTimeTable:", error);
    res.status(500).json({ success: false, message: "Error in updateTimeTable" });
  }
};
