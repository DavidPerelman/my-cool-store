const router = require('express').Router();
const Category = require('../models/categoryModel');
const fs = require('fs');

router.get('/categories', async (req, res) => {
  try {
    console.log('categories');
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
