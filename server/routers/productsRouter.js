const router = require('express').Router();
const Product = require('../models/productModel');
const cors = require('cors');
router.use(cors());

router.get('/products', async (req, res) => {
  try {
    console.log('products');
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

module.exports = router;
