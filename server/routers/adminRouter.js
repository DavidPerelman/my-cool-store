const router = require('express').Router();
const User = require('../models/userModel');
const Token = require('../models/tokenModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {
  userLoginValidation,
  checkIfUserExist,
  checkIfPasswordCurrect,
  checkIfUserVerified,
} = require('../services/userServices');
const { createToken } = require('../services/jwtServices');
const { userValidationAndAuth } = require('../services/AuthSerices');

router.post('/login', async (req, res) => {
  try {
    const data = ({ email, password } = req.body);

    const formValidation = userLoginValidation(data);
    if (formValidation.validationForm === false) {
      return res.status(400).json(formValidation.errMessage);
    }

    const user = await checkIfUserExist('login', data.email);
    if (user.existingUser === false) {
      return res.status(400).json(user.errMessage);
    }

    if (user.role !== 'admin') {
      return res.status(400).json({ errMessage: `You don't have permission!` });
    }

    const passwordCorrect = await checkIfPasswordCurrect(
      password,
      user.passwordHash
    );
    if (passwordCorrect.currctPassword === false) {
      return res.status(400).json(passwordCorrect.errMessage);
    }

    const userVerified = await checkIfUserVerified(user.verified);
    if (userVerified.verified === false) {
      return res.status(400).json(userVerified.errMessage);
    }

    const token = await createToken(user._id);
    user.token = token;
    user.save();

    res
      .cookie('token', token, {
        httpOnly: true,
      })
      .json({ isLogin: true, user: user, isAdmin: true });
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

router.get('/logout', async (req, res) => {
  try {
    res
      .cookie('token', '', {
        httpOnly: true,
        expires: new Date(0),
      })
      .json({ loggedIn: false, user: null, isAdmin: false });
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

router.get('/checkIfAdminLoggedIn', async (req, res) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.json({ user: null, isAdmin: false });
    } else {
      jwt.verify(token, process.env.JWT_SECRET);

      const user = await User.findOne({ token: token }).exec();

      if (user.role !== 'admin') {
        return res.status(400).json({ user: null, isAdmin: false });
      }

      res.send({ user: user, isAdmin: true });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json(false);
  }
});

module.exports = router;
