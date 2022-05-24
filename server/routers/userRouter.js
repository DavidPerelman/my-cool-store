const router = require('express').Router();
const User = require('../models/userModel');

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
    } catch (err) {
        console.error(err);
        res.status(500).send();
    }
});

module.exports = router;
