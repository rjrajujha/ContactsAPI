const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../Models/user");
const dotenv = require("dotenv");
dotenv.config();
const { body, validationResult } = require("express-validator");
router.use(express.json());
router.use(express.urlencoded({ extended: false }));

const JWT_SECRET = process.env.jwtSecret || "secret";

router.post(
  "/register",
  body("email").isEmail(),
  body("password").isLength({ min: 6, max: 14 }),
  async (req, res) => {

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

      bcrypt.hash(password, 10, async function (err, hash) {

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

    var result = await bcrypt.compare(password, user.password);

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
