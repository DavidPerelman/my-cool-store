const Product = require('../models/productModel');
const Category = require('../models/categoryModel');

const paginationProducts = async (categoryId, page, limit) => {
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const category = await Category.findById(categoryId).exec();

  const products = await Product.find({
    category: category.name,
  })
    .limit(limit)
    .skip(startIndex)
    .exec();

  const productsLength = await Product.find({
    category: category.name,
  })
    .countDocuments()
    .exec();

  const results = {};

  if (endIndex < productsLength) {
    results.next = {
      page: page + 1,
      limit: limit,
    };
  }

  if (startIndex > 0) {
    results.previous = {
      page: page - 1,
      limit: limit,
    };
  }

  results.results = {
    products: products,
    page: page,
    limit: limit,
    productsLength: productsLength,
  };

  return results;
};

module.exports = {
  paginationProducts,
};
