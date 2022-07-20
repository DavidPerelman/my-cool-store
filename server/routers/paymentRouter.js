const router = require('express').Router();
const Product = require('../models/productModel');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

router.post('/create-customer', async (req, res) => {
  const { name, email } = req.body;

  try {
    const customer = await stripe.customers.create({
      name,
      email,
    });
    res.json({ customer });
  } catch (e) {
    res.status(400).json({ error: { message: e.message } });
  }
});

router.post('/create-payment-intent', async (req, res) => {
  const { paymentMethodTypes, currency } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 1999,
      currency: currency,
      payment_method_types: [paymentMethodTypes],
    });
    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (e) {
    res.status(400).json({ error: { message: e.message } });
  }
});

router.get('/', async (req, res) => {
  try {
    const stripePublishableKey = process.env.STRIPE_PUBLISHABLE_KEY;
    res.json({ stripePublishableKey });
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

module.exports = router;
