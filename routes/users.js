const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require("../middleware/auth");
const { check, validationResult } = require('express-validator');
const jwtSecret = process.env.jwtSecret

const User = require('../models/User');

// Routes for signup
/**
 * @method - POST
 * @param - /signup
 * @description - User SignUp
 */
router.post(
  '/signup',

  check('userid', 'Please include a valid email').isEmail(),
  check(
    'password',
    'Please enter a password with 6 or more characters'
  ).isLength({ min: 6 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { userid, password } = req.body;

    try {
      let user = await User.findOne({ userid });

      if (user) {
        return res.status(400).json({ msg: 'User already exists' });
      }

      user = new User({
        userid,
        password
      });

      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();

      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(
        payload,
        jwtSecret,
        {
          expiresIn: 360000
        },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

/**
 * @method - POST
 * @param - /login
 * @description - User Login
 */

router.post(
  '/login',
  
  check('userid', 'Please include a valid email').isEmail(),
  check(
    'password',
    'Please enter a password with 6 or more characters'
  ).isLength({ min: 6 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { userid, password } = req.body;

    try {
      let user = await User.findOne({ userid });

      if (!user) {
        return res.status(400).json({ msg: "Username not found" });
      }
      const checkPassword = await bcrypt.compare(password, user.password);
            
            if(!checkPassword)
                return res.status(400).json({
                    message: "Incorrect Password"
                });

      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(
        payload,
        jwtSecret,
        {
          expiresIn: 360000
        },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

router.get("/me", auth, async (req, res) => {
  try {
    // request.user is getting fetched from the auth function defined in middleware
    // after token authentication
    const user = await User.findById(req.user.id);
    res.json(user);
  } catch (e) {
    res.send({ message: "Error in Fetching user" });
  }
});
module.exports = router;