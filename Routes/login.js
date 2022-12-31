const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../Models/user");
const { body, validationResult } = require("express-validator");
router.use(express.json());
router.use(express.urlencoded({ extended: false }));
const { JWT_SECRET } = require("../keys");

//signup new user

router.post(
  "/register",
  body("email").isEmail(),
  body("password").isLength({ min: 6, max: 14 }),
  async (req, res) => {
    //check whethre usrers alread existe or not

    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const { email, password } = req.body;
      let user = await User.findOne({ email });
      if (user) {
        return res.status(409).json({
          status: "failed",
          message: "User already exists",
        });
      }

      //new user creat
      bcrypt.hash(password, 10, async function (err, hash) {
        // Store hash in your password DB.
        if (err) {
          return res.status(500).json({
            status: "failed",
            message: err.message,
          });
        }
        user = await User.create({
          email: email,
          password: hash,
        });

        res.json({
          status: "Success",
          message: "User Succesfully created",
          user,
        });
      });
    } catch (e) {
      res.json({
        status: "failed",
        message: e.message,
      });
    }
  }
);

//login

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(409).json({
        status: "Failed",
        message: "There is no acccount with this mail",
      });
    }

    // if(user){
    var result = await bcrypt.compare(password, user.password);
    // }
    const token = jwt.sign({ user_id: user._id }, JWT_SECRET, {
      expiresIn: "2h",
    });

    if (result) {
      res.status(200).json({
        status: "success",
        token,
      });
    } else {
      return res.status(409).json({
        status: "failed",
        message: "Incorrect password ",
      });
    }
  } catch (e) {
    res.status(401).json({
      status: "failure",
      message: e.message,
    });
  }
});
module.exports = router;
