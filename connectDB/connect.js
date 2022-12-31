const mongoose = require("mongoose");
const DBURL = "mongodb+srv://JatinSc:Projects4tenX@mycloudcluster.glkpt0w.mongodb.net/groupProjects?retryWrites=true&w=majority"

const connectDB = async () => {
    try {
        await mongoose.connect(DBURL, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('MongoDB connected!');
    } catch (err) {
        console.error(err.message);
    }
};

module.exports = connectDB