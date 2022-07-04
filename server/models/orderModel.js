const mongoose = require('mongoose');
const moment = require('moment-timezone');

const orderSchema = new mongoose.Schema({
  // numOfOrder: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   default: mongoose.Types.ObjectId,
  //   index: { unique: true },
  // },
  // numOfOrder: {
  //   type: Number,
  //   required: true,
  //   default: Math.floor(Math.random() * 10000) + 1,
  //   unique: true,
  // },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  created: {
    type: String,
    required: true,
    default: () => moment().format('DD/MM/YYYY hh:mm'),
  },
  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
      },
      productQuantity: {
        type: Number,
        required: true,
      },
    },
  ],
  discount: { type: Number },
  totalProductsQuantity: {
    type: Number,
    required: true,
  },
  totalPayment: {
    type: Number,
    required: true,
  },
  isPaid: {
    isPaid: {
      type: Boolean,
      required: true,
      default: false,
    },
    paidAt: {
      type: String,
    },
  },
});

module.exports = mongoose.model('Order', orderSchema);
