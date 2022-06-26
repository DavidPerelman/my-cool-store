const router = require('express').Router();
const Category = require('../models/categoryModel');
const Product = require('../models/productModel');
const fs = require('fs');

router.get('/categories', async (req, res) => {
  try {
    // get all categories
    const categories = await Category.find({});
    res.json({ categories: categories });
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

router.get('/category/:categoryId/products', async (req, res) => {
  try {
    const categoryId = req.params.categoryId;

    // get all products by category
    const category = await Category.findById(categoryId).exec();

    const products = await Product.find({
      category: category.name,
    });
    res.json({ products: products });
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

router.get('/category/:categoryId/productsLimits', async (req, res) => {
  try {
    const categoryId = req.params.categoryId;

    // get 3 products by category
    const category = await Category.findById(categoryId).exec();

    const products = await Product.find({
      category: category.name,
    }).limit(3);

    res.json({ products });
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

router.post('/createCategory', async (req, res) => {
  try {
    // const data = { name } = req.body;
    fs.readFile('../server/categoriesData.json', 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log(data);
    });
    // let rawdata = fs.readFileSync('../categoriesData.json');
    // let categories = JSON.parse(rawdata);
    // let newCategories = [];
    // console.log(categories);
    // return categories;
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

module.exports = router;
