const mongoose = require('mongoose')

const timetableMongoose = mongoose.Schema({
      rollNo : {type : mongoose.Schema.Types.Number , ref : 'UserModel' },
      day : {type : String , enum : ["monday", "tuesday" , "wednesday","thursday","friday","saturday","sunday"], required : true},
      period: {type: Number},
      classRoom : {type : String},
      subject : { type : String},  
})


module.exports = mongoose.model("TimeTableModel", timetableMongoose);
