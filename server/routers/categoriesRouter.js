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

router.post('/categories/createCategory', async (req, res) => {
  try {
    // const data = { name } = req.body;
    let rawdata = fs.readFileSync('./data.json');
    let product = JSON.parse(rawdata);
    let newItems = [];

    console.log('categories');
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

module.exports = router;
