const router = require("express").Router();
const User = require("../Models/user")
const auth = require ("../Middlewear/authentication")


router.get("/",auth,async(req,res)=>{
    try{

        const admin = await User.find({_id:req.user});
        var name = admin[0].email.substring(0, admin[0].email.lastIndexOf("@"));
        
        if(admin){
            // console.log(existing_contacts)
            res.status(200).json(name)
        }

    }catch(e){
        res.status(404).json(e.message)
    }
})

module.exports= router;