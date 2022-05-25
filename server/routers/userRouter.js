const router = require('express').Router();
const User = require('../models/userModel');
const Token = require('../models/tokenModel');
const bcrypt = require('bcryptjs');

router.post('/register', async (req, res) => {
    try {
         const data = { firstName, lastName, email, password } = req.body;
        console.log(data);

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
        const newUser = new User({
            firstName,
            lastName,
            email,
            passwordHash,
        });

        const savedUser = await newUser.save();
        console.log(savedUser);
    } catch (err) {
        console.error(err);
        res.status(500).send();
    }
});

module.exports = router;
