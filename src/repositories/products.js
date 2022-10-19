const { query } = require('express');
const Product = require('../model/product');

const getAllProducts = async query => {
  const { sortBy, sortByDesc, filter, limit = 5, offset = 0 } = query;
  // const products = {};
  const results = await Product.paginate({
    limit,
    offset,
    sort: {
      ...(sortBy ? { [`${sortBy}`]: 1 } : {}),
      ...(sortByDesc ? { [`${sortByDesc}`]: -1 } : {}),
    },
    select: {
      ...(filter ? filter.split('|').join(' ') : ''),
    },
    populate: { path: 'owner', select: 'name email subscription' },
  });
  return results;
};

const getProductById = async productId => {
  const result = await Product.findOne({
    _id: productId,
  });
  return result;
};

const removeProduct = async productId => {
  const result = await Product.findOneAndRemove({
    _id: productId,
  });
  return result;
};

const addProduct = async body => {
  const result = await Product.create({ ...body });
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
};
