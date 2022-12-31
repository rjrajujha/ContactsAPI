const multer = require("multer")
const express= require("express");
const path = require("path")

const app =express()

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        app.set("public",express.static("../public"))
        cb(null,"public");
    },
    filename:(req,file,cb)=>{
        cb(null,"contact"+path.extname(file.originalname));
    }
})

const upload = multer({storage:storage});

module.exports = upload;