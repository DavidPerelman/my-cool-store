const mongoose = require('mongoose');
const moment = require('moment-timezone');

const userSchema = new mongoose.Schema({
  stripe_customer_id: {
    type: String,
    // required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    match:
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  },
  passwordHash: { type: String, required: true },
  role: { type: String, required: true, default: 'customer' },
  registerDate: {
    type: String,
    required: true,
    default: () => moment().format('DD/MM/YYYY hh:mm'),
  },
  verified: {
    type: Boolean,
    default: false,
  },
  token: {
    type: String,
  },
  productsInCart: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
      },
      amount: {
        type: Number,
      },
    },
  ],
});

module.exports = mongoose.model('User', userSchema);
