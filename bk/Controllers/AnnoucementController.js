const AnnouncemeentModel = require("../Models/AnnouncemeentModel")

exports.getAnnouncements = async (req,res) =>{
    try {
        const announcements = await AnnouncemeentModel.find().sort({createdAt: -1});
        res.status(200).json({success: true, data: announcements});
        
    } catch (error) {
        console.error("Error fetching announcements:", error);
        res.status(500).json({ success: false, message: "Error fetching announcements" });
    }
}

exports.createAnnouncements = async (req,res) =>{
    const {title, content} = req.body;
    if(!title || !content){
        return res.status(400).json({success: false, message: "Title and Content are required"});
    }
    try {
        const annoucement = new AnnouncemeentModel({
            title,
            content,
            postedBy: req.user._id
        });
        await annoucement.save();
        res.status(201).json({success: true, message: "Announcement created successfully"})
        
    } catch (error) {
         console.error("Error creating announcement:", error);
        res.status(500).json({ success: false, message: "Error creating announcement" });
    }
}