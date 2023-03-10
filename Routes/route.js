const router = require("express").Router();
const csvtojson = require("csvtojson");
const multer = require("../Middlewear/middle")
const Contacts = require("../Models/contacts")
const auth = require("../Middlewear/authentication")
const fs = require("fs");


router.post("/upload", auth, multer.single('contact'), (req, res) => {
    try {
        csvtojson().fromFile("public/contact.csv")
            .then((csvData) => {
                for (let i = 0; i < csvData.length; i++) {
                    csvData[i].useRef = req.user;
                }
                Contacts.insertMany(csvData)
                    .then(() => {
                        fs.unlink("public/contact.csv", (err) => { console.log(err) })
                        res.json({
                            message: "sucessfully inserted"
                        })
                    }).catch((e) => {
                        res.json({
                            message: e.message
                        })
                    })
            })
    } catch (e) {
        res.status(400).json({
            message: e.message
        })
    }
})

router.delete("/del/:id", auth, async (req, res) => {
    try {
        let { id } = req.params;
        id = id.split(",")
        await Contacts.deleteMany({ _id: { $in: id } })
        res.status(200).json({
            message: "successfully deleted"
        })
    } catch (e) {
        res.status(400).json({
            message: e.message
        })
    }
})


module.exports = router;