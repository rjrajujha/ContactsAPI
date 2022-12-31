const router = require("express").Router();
const Contacts=require("../Models/contacts")
const auth=require("../Middlewear/authentication")

router.get("/:email",auth,async(req,res)=>{
    try{ 
      var email = req.params.email;
      
      // console.log(email);
        const user=await Contacts.find({email:{$regex:email,$options:'i'},useRef:req.user});
        console.log(user)
        
          
            res.status(200).json(user);
        
    }catch(e){
            res.status(404).json(e.message);
    }
})

module.exports= router;