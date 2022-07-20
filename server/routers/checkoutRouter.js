const router = require('express').Router();
const Product = require('../models/productModel');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

router.post('/', async (req, res) => {
  const orderPayment = req.body;
  try {
    stripe.customers
      .create({
        email: req.body.user.email,
      })
      .then((customer) => {
        console.log(customer.id);
      })
      .catch((error) => console.error(error));

    // res.json({ customer });
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

router.get('/', async (req, res) => {
  try {
    res.send('<h1>Checkout!</h1>');
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

module.exports = router;
