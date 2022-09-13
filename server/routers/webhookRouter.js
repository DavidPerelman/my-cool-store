const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const request = require('request');

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
      console.log(customer);
      break;
    case 'order.created':
      const order = event.data.object;
      // Then define and call a function to handle the event order.created
      break;
    case 'price.updated': {
      const price = event.data.object;
      // Then define and call a function to handle the event price.updated
      break;
    }
    case 'product.created': {
      console.log('✅ Success:', event.id);
      const product = event.data.object;
      // Then define and call a function to handle the event product.updated
      console.log(product);

      const options = {
        method: 'post',
        body: JSON.stringify(product),
        URL: 'http://localhost:3001/products/createProduct',
      };

      request(options, function (error, response) {
        console.log(error, response);
        return;
      });

      request(options, (err, res, body) => {
        console.log('request', body);
        //body should look something like this
        // {
        //     "access_token": "fb2e77d.47a0479900504cb3ab4a1f626d174d2d",
        //     "user": {
        //         "id": "1574083",
        //         "username": "snoopdogg",
        //         "full_name": "Snoop Dogg",
        //         "profile_picture": "..."
        //     }
        // }
      });
      break;
    }
    // ... handle other event types
    case 'product.updated': {
      const product = event.data.object;
      // Then define and call a function to handle the event product.updated
      break;
    }
    // ... handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.json({ received: true });
});

module.exports = router;
