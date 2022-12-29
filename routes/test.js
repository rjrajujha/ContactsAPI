const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.status(200).json({ "test": "sucessful" });
})

router.post('/', (req, res) => {
    res.status(200).json(req.body);
})

module.exports = router;