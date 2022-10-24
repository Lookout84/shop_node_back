const { query } = require('express');
const Product = require('../model/product');

const getAllProducts = async (categoryId, query) => {
  const { sortBy, sortByDesc, filter, limit = 5, offset = 0 } = query;
  const optionsSearch = { category: categoryId };
  console.log(optionsSearch);
  const results = await Product.paginate(optionsSearch, {
    limit,
    offset,
    sort: {
      ...(sortBy ? { [`${sortBy}`]: 1 } : {}),
      ...(sortByDesc ? { [`${sortByDesc}`]: -1 } : {}),
    },
    select: {
      ...(filter ? filter.split('|').join(' ') : ''),
    },
    populate: { path: 'category', select: 'category' },
  });
  return results;
};

const getProducts = async categoryId => {
  console.log(categoryId);
  const results = await Product.find({
    category: categoryId,
  }).populate({
    path: 'category',
    select: 'category',
  });
  return results;
};

const getProductById = async (categoryId, productId) => {
  const result = await Product.findOne({
    _id: productId,
    category: categoryId,
  }).populate({
    path: 'category',
    select: 'category, id',
  });
  return result;
};

const removeProduct = async productId => {
  const result = await Product.findOneAndRemove({
    _id: productId,
  });
  return result;
};

const addProduct = async (category, body) => {
  console.log(category);
  const result = await Product.create({
    ...{ category },
    ...body,
  });
  return result;
};

const updateProduct = async body => {
  const result = await Product.findOneAndUpdate(body, {
    new: true,
  });
  return result;
};

module.exports = {
  getAllProducts,
  getProductById,
  removeProduct,
  addProduct,
  updateProduct,
  getProducts,
};
