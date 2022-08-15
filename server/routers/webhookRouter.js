const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

router.post('/', express.raw({ type: 'application/json' }), (req, res) => {
  const sig = req.headers['stripe-signature'];

  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
  } catch (err) {
    console.log(`❌ Error message: ${err.message}`);
    res.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  console.log('✅ Success:', event.id);
  console.log(`Unhandled event type ${event.type}`);

  // Handle the event
  switch (event.type) {
    case 'charge.captured':
      const charge = event.data.object;
      // Then define and call a function to handle the event charge.captured
      break;
    case 'checkout.session.async_payment_failed':
      const session = event.data.object;
      // Then define and call a function to handle the event checkout.session.async_payment_failed
      break;
    case 'customer.created':
      const customer = event.data.object;
      // Then define and call a function to handle the event customer.created
      break;
    case 'order.created':
      const order = event.data.object;
      // Then define and call a function to handle the event order.created
      break;
    case 'price.updated':
      const price = event.data.object;
      // Then define and call a function to handle the event price.updated
      break;
    case 'product.updated':
      const product = event.data.object;
      // Then define and call a function to handle the event product.updated
      break;
    // ... handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.json({ received: true });
});

module.exports = router;
