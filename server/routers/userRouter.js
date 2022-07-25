const sendEmail = require('../utils/email');
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
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

router.post('/register', async (req, res) => {
  try {
    const data = ({ firstName, lastName, email, password, verifyPassword } =
      req.body);

    const formValidation = userLoginValidation(data);
    if (formValidation.validationForm === false) {
      return res.status(400).json(formValidation.errMessage);
    }

    const user = await checkIfUserExist('register', data.email);
    if (user.existingUser) {
      return res.status(400).json(user.errMessage);
    }

    // hash the password
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    // create a new stripe user
    const customer = await stripe.customers.create({
      // currency: 'usd',
      // default_currency: 'usd',
      email: email,
      name: `${firstName} ${lastName}`,
      phone: null,
    });

    // create a new user
    const newUser = await new User({
      stripe_customer_id: customer.id,
      firstName,
      lastName,
      email,
      passwordHash,
    }).save();

    await createToken(user._id);

    const userToken = await createToken(newUser._id);

    const tokenModel = await new Token({
      userId: newUser._id,
      token: userToken,
    }).save();

    // const message = `${process.env.BASE_URL}/verify/${newUser._id}/${userToken}`;
    // await sendEmail(newUser.email, 'Verify Email', message);

    res.json({ user: newUser, success: true });
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

router.get('/verify/:id/:token', async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id });
    if (!user) return res.status(400).send('User not found!');

    const token = await Token.findOne({
      userId: user._id,
      token: req.params.token,
    });
    if (!token) return res.status(400).send('Token not found!');

    user.verified = true;
    await user.save();
    await token.remove();

    const link = `http://localhost:3000/registerSuccess/${user.firstName}`;
    res.redirect(link);
  } catch (err) {
    res.status(400).send('An error occured');
  }
});

router.post('/login', async (req, res) => {
  try {
    const data = ({ email, password } = req.body);
    // const checkUser = await userValidationAndAuth(email, password);

    const formValidation = userLoginValidation(data);
    if (formValidation.validationForm === false) {
      return res.status(400).json(formValidation.errMessage);
    }

    const user = await checkIfUserExist('login', data.email);
    if (user.existingUser === false) {
      return res.status(400).json(user.errMessage);
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
      .json({ isLogin: true, user: user });
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
      .json({ loggedIn: false, user: null });
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

router.get('/checkIfSomebodyLoggedIn', async (req, res) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.json({ loggedIn: false, user: null });
    } else {
      jwt.verify(token, process.env.JWT_SECRET);

      const user = await User.findOne({ token: token }).exec();

      res.send({ loggedIn: true, user: user });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json(false);
  }
});

module.exports = router;
