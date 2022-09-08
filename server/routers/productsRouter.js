const router = require('express').Router();
const Product = require('../models/productModel');
const fs = require('fs');

router.get('/products', async (req, res) => {
  try {
    // get all products
    const products = await Product.find({});
    res.json({ products: products });
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

router.get('/product/:productId', async (req, res) => {
  try {
    const productId = req.params.productId;

    // get single product
    const product = await Product.findById(productId).exec();

    res.json({ product: product });
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

router.post('/createProduct', async (req, res) => {
  try {
    const productData = req.body;
    console.log(productData);

    const product = await new Product({
      title: productData.title,
      price: productData.price,
      description: productData.description,
      category: productData.category,
      image: productData.image,
    }).save();

    console.log(product);

    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

router.put('/editProduct', async (req, res) => {
  try {
    const fileData = fs.readFileSync('../server/productsData.json', 'utf8');

    const jsonData = JSON.parse(fileData);

    // jsonData['survival'] = 'online';

    jsonData.forEach(function (v) {
      delete v.id;
      v.category = v.category['name'];
    });

    const newJsonData = JSON.stringify(jsonData);

    fs.writeFile(
      '../server/newProductsData.json',
      newJsonData,
      'utf8',
      function (err) {
        if (err) {
          console.log(err);
        } else {
          //Everything went OK!
        }
      }
    );
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

module.exports = router;
