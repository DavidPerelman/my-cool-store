const sendEmail = require('../utils/email');
const router = require('express').Router();
const User = require('../models/userModel');
const Token = require('../models/tokenModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
router.use(cors());

router.post('/register', async (req, res) => {
  try {
    const data = ({ firstName, lastName, email, password } = req.body);
    console.log(req.body);

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        errMessage: 'An account with this email already exist.',
      });
    }

    // hash the password
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    // create a new user
    const newUser = await new User({
      firstName,
      lastName,
      email,
      passwordHash,
    }).save();

    const token = await new Token({
      userId: newUser._id,
      token: jwt.sign(
        {
          user: newUser._id,
        },
        process.env.JWT_SECRET
      ),
    }).save();

    const message = `${process.env.BASE_URL}/verify/${newUser._id}/${token.token}`;
    await sendEmail(newUser.email, 'Verify Email', message);
    console.log(newUser.email);
    res.json('ok');
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

router.get('/verify/:id/:token', async (req, res) => {
  try {
    console.log(req.params.id);
    const user = await User.findOne({ _id: req.params.id });
    if (!user) return res.status(400).send('Invalid link');

    const token = await Token.findOne({
      userId: user._id,
      token: req.params.token,
    });
    if (!token) return res.status(400).send('Invalid link');

    console.log(token);
    await User.updateOne({ _id: user._id, verified: true });
    await Token.findByIdAndRemove(token._id);

    res.send('email verified sucessfully');
  } catch (err) {
    res.status(400).send('An error occured');
  }
});

module.exports = router;
