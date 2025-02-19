const TimeTableModel = require("../Models/TimTable");

exports.viewTimeTable = async(req,res) =>{

  try { 
    const timetable = await TimeTableModel.find({
        classRoom : req.user.classRoom});
        if(!timetable || timetable.length === 0){
            return res.status(404).json({
                success : false,
                message : "No timetable found for this roll number"
            })
        }

        res.json({
            success : true,
            data : timetable,
        })
    
  } catch (error) {
      console.log( " Error in viewTimeTable", error);
     res.json({ success : false, message: "Error in viewTimeTable" });
  }
};

exports.createTimeTable = async(req,res) =>{
    const {day , period , classRoom , subject} = req.body ;
 

  
     try {
        const timetable =  new TimeTableModel({
            day : day ,
            period : period ,
            classRoom : classRoom ,
            subject : subject ,

        });

         await timetable.save();
         res.status(201).json( timetable);
        
     } catch (error) {
       
        res.json({ success : false, message: "Error in createTimeTable" });
        
     }
}

exports.updateTimeTable = async(req , res) =>{
    const {day , period , classRoom , subject} = req.body ;

    try { 
        const timetable = await TimeTableModel.findOneAndUpdate({
            classRoom : classRoom,
            day : day ,
             period : period,
             subject : subject,
        } ,
    { new : true },
);                    

      if(!timetable) {
        return res.status(404).json({
            success : false ,
            message : "TimeTable not found",
        })
      }
      res.status(201).json({
        success : true ,
        message : "TimeTable updated",
      })
        
    } catch (error) {
          res.json({ success : false, message: "Error in updateTimeTable" });
    }
}