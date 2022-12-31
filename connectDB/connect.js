const mongoose = require("mongoose");

const connectDB=()=>{
    mongoose.set("strictQuery",false);
    mongoose.connect("mongodb+srv://JatinSc:Projects4tenX@mycloudcluster.glkpt0w.mongodb.net/groupProjects?retryWrites=true&w=majority").then((res)=>{
            console.log("Connected to DB")
    });
}

module.exports=connectDB