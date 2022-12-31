//Imports
const express = require("express");
const dotenv = require("dotenv")
const cors = require("cors")
const route = require("./Routes/route")
const connectDB = require("./connectDB/connect");

const login = require("./Routes/login")
const getAdmin = require("./Routes/getAdmin")

const getContacts = require("./Routes/getContacts")
const searchContacts = require("./Routes/search");
const port = process.env.PORT || 8080;

//Use and config
const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", login)

app.use("/", route)

app.use("/getContacts", getContacts);
app.use("/search", searchContacts);
app.use("/getAdmin", getAdmin);

app.get('/aboutus', function (req, res) {
    res.sendFile(__dirname + '/public/index.html');
});

app.listen(port, async () => {
    await connectDB();
    console.log(`Ther server is up at ${port}`)
})