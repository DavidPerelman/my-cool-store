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

router.get('/products/:categoryId', async (req, res) => {
  try {
    const categoryId = req.params.categoryId;
    console.log(categoryId);
    return;
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
    fs.readFile('../server/productsData.json', 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        return;
      }
    });
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
