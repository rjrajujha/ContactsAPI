const router = require("express").Router();
const Contacts = require("../Models/contacts");
const auth = require("../Middlewear/authentication")


router.get("/", auth, async (req, res) => {
    try {
        const existing_contacts = await Contacts.find({ useRef: req.user }).sort({ email: -1 });

        if (existing_contacts) {
            res.status(200).json(existing_contacts)
        }

    } catch (e) {
        res.status(404).json(e.message)
    }
})

module.exports = router;