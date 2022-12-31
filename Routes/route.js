const router = require("express").Router();
const csvtojson =require("csvtojson");
const upload = require("../Middlewear/middle")
const contact= require("../Models/contacts")
const auth = require ("../Middlewear/authentication")
const fs = require("fs");

// router.get("/",(req,res)=>{
//     res.send("Working");
// })

//Inserting the csv

router.post("/upload",auth,upload.single('contact'),(req,res)=>{
    //   console.log(req.user)
    try{
        csvtojson().fromFile("public/contact.csv")
        .then( (csvData)=>{
            // console.log(csvData)
            for(let i=0;i<csvData.length;i++){
                csvData[i].useRef=req.user;
            }
            contact.insertMany(csvData)
            .then( ()=>{
                 fs.unlink("public/contact.csv",(err)=>{console.log(err)})
                res.json({
                    message:"sucessfully inserted"
                })
            }).catch((e)=>{
                res.json({
                    message:e.message
                })
            })
        })
    }catch(e){
        res.status(400).json({
            message:e.message
        })
    }
})




router.delete("/del/:id",auth,async (req,res)=>{
    try{
        let {id}=req.params;
        id=id.split(",")
        await contact.deleteMany({_id: {$in: id}})
        res.status(200).json({
            message:"successfully deleted"
        })
    }catch(e){
        res.status(400).json({
            message:e.message
        })
    }
})

//Deleting from csv

module.exports= router;