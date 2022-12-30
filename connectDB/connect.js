const mongoose = require("mongoose");
const DBURL = process.env.MONGODB_URI || "mongodb+srv://JatinSc:Projects4tenX@mycloudcluster.glkpt0w.mongodb.net/groupProjects?retryWrites=true&w=majority"

const connectDB = async () => {
    try {
        await mongoose.connect(DBURL, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('MongoDB connected!');
    } catch (err) {
        console.error(err.message);
        process.exit(1); 
    }
};

module.exports = connectDB