const router = require('express').Router();
const User = require('../models/userModel');

router.post('/register', async (req, res) => {
    const data = { firstName, lastName, email, password } = req.body;
    console.log(data);
})

module.exports = router;
