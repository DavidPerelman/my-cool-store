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

router.post('/create-checkout-session', async (req, res) => {
  console.log(req.body.userData);
  const session = await stripe.checkout.sessions.create({
    success_url:
      'http://localhost:3000/success/paymentId={CHECKOUT_SESSION_ID}',
    cancel_url: `http://localhost:3000/order/${req.body.orderId}`,
    // customer_email: 'customer@example.com',
    payment_method_types: ['card'],
    mode: 'payment',
    line_items: req.body.line_items,
    customer_email: req.body.userData.email,
    client_reference_id: req.body.userData.stripe_customer_id,
  });

  res.json({ id: session.id });
});

router.get('/checkout-session/:id', async (req, res) => {
  const session = await stripe.checkout.sessions.retrieve(req.params.id, {
    expand: ['line_items'],
  });
  res.json(session);
});

router.post('/create-payment-intent', async (req, res) => {
  const { paymentMethodTypes, currency } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 1999,
      currency: currency,
      payment_method_types: [paymentMethodTypes],
      metadata: {
        // order_id: '6735',
      },
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
