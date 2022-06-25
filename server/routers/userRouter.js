const sendEmail = require('../utils/email');
const router = require('express').Router();
const User = require('../models/userModel');
const Token = require('../models/tokenModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
router.use(cors());

// const ALLOWED_ORIGINS = [
//   'http://localhost:3000',
//   'https://my-cool-store.herokuapp.com',
//   'https://my-cool-store.netlify.app',
// ];

router.post('/register', async (req, res) => {
  try {
    const data = ({ firstName, lastName, email, password, verifyPassword } =
      req.body);

    console.log(data);
    if (!firstName || !lastName || !email || !password || !verifyPassword) {
      return res.status(400).json({
        errMessage: 'all fields required!',
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        errMessage: 'Password must be at least 6 characters long!',
      });
    }

    if (password !== verifyPassword) {
      return res.status(400).json({
        errMessage:
          'Password must be at least 6 characters long and the passwords must be identical!',
      });
    }

    const regexp =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!regexp.test(email)) {
      return res.status(400).json({
        errMessage: 'invalid email!',
      });
    }

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
    res.json({ user: newUser, success: true });
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

router.get('/verify/:id/:token', async (req, res) => {
  try {
    console.log(req.params.id);
    const user = await User.findOne({ _id: req.params.id });
    if (!user) return res.status(400).send('User not found!');

    console.log(user);
    const token = await Token.findOne({
      userId: user._id,
      token: req.params.token,
    });
    if (!token) return res.status(400).send('Token not found!');

    console.log(token);
    await User.updateOne({ _id: user._id, verified: true });
    await Token.findByIdAndRemove(token._id);

    const link = `http://localhost:3000/registerSuccess/${user.firstName}`;
    console.log(link);
    res.redirect(link);
  } catch (err) {
    res.status(400).send('An error occured');
  }
});

router.post('/login', async (req, res) => {
  if (ALLOWED_ORIGINS.indexOf(req.headers.origin) > -1) {
    res.set('Access-Control-Allow-Origin', req.headers.origin);
    res.set('Access-Control-Allow-Credentials', true);
  } else {
    // allow other origins to make unauthenticated CORS requests
    res.set('Access-Control-Allow-Origin', '*');
  }

  try {
    const { email, password } = req.body;

    console.log(req.body);

    if (!email || !password) {
      return res.status(400).json({
        errMessage: 'all fields required!',
      });
    }

    const regexp =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!regexp.test(email)) {
      return res.status(400).json({
        errMessage: 'invalid email!',
      });
    }

    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res.status(400).json({
        errMessage: 'login error!',
      });
    } else {
      const passwordCorrect = await bcrypt.compare(
        password,
        existingUser.passwordHash
      );
      if (!passwordCorrect) {
        return res.status(400).json({
          errMessage: 'login error!',
        });
      } else {
        if (existingUser.verified === false) {
          return res.status(400).json({
            errMessage: 'user not verify!',
          });
        } else {
          // sign the token
          const token = jwt.sign(
            {
              user: existingUser._id,
            },
            process.env.JWT_SECRET
          );
          existingUser.token = token;

          existingUser.save();

          // send the token in a HTTP only cookie
          res
            .cookie('token', token, {
              httpOnly: true,
            })
            .json({ isLogin: true, user: existingUser });
        }
      }
    }
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
      .json({ isLogout: true });
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

router.get('/loggedIn', async (req, res) => {
  if (ALLOWED_ORIGINS.indexOf(req.headers.origin) > -1) {
    res.set('Access-Control-Allow-Origin', req.headers.origin);
    res.set('Access-Control-Allow-Credentials', 'true');
  } else {
    // allow other origins to make unauthenticated CORS requests
    res.set('Access-Control-Allow-Origin', '*');
  }

  try {
    const token = req.cookies.token;

    console.log(req.cookies);

    if (!token) {
      return res.json(false);
    } else {
      jwt.verify(token, process.env.JWT_SECRET);

      const user = await User.findOne({ token: token }).exec();

      res.send({ loggedIn: true, user: user });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json(false).send();
  }
});

module.exports = router;
