const UserModel = require("../Models/UserModel")

exports.getProfile = async (req, res) =>{
    try {

        const profile = await UserModel.findOne({rollNo: req.user.rollNo}).select("rollNo email roles department classRoom");

        if(!profile){
            return res.status(404).json({message: "Profile not found"})
        }

        res.status(200).json({success: true, data: profile})


        
    } catch (error) {
        console.error("Error in getProfile:", error);
        res.status(500).json({message: "Internal Server Error"})
        
    }
}

exports.updateProfile = async (req,res) =>{
    try {
        const updateUser = await UserModel.findOneAndUpdate({
            rollNo: req.user.rollNo

        },
        req.body,
        {new: true}
        )

        if(!updateUser){
            return res.status(404).json({message: "Profile not found"})
        }

        res.status(200).json({success: true, data: updateUser})
        
    } catch (error) {
        
        console.error("Error in updateProfile:", error);
        res.status(500).json({message: "Internal Server Error"})
    }
}