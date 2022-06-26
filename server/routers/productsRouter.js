const router = require('express').Router();
const Product = require('../models/productModel');
const fs = require('fs');

router.get('/products', async (req, res) => {
  try {
    console.log('products');
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

router.post('/products/createProduct', async (req, res) => {
  try {
    // const data = ({ title, price, description, category, images } = req.body);
    let rawdata = fs.readFileSync('./data.json');
    let product = JSON.parse(rawdata);
    let newItems = [];

    console.log('products');
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

module.exports = router;
