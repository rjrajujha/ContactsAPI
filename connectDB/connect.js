const mongoose = require("mongoose");

require('dotenv').config();
const dbURL = process.env.mondodbURL;

const connectDB=()=>{
    mongoose.set("strictQuery",false);
    mongoose.connect(`${dbURL}/groupProjects`).then((res)=>{
            console.log("Connected to DB")
    });
}

module.exports=connectDB