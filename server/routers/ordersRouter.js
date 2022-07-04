const router = require('express').Router();
const User = require('../models/userModel');
const Product = require('../models/productModel');

router.post('/order', async (req, res) => {
  try {
    const orderData = req.body;

    console.log(orderData);
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

module.exports = router;
