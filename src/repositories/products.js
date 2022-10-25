const { query } = require('express');
const Product = require('../model/product');

const getAllProductsByCategory = async (categoryId, query) => {
  const { sortBy, sortByDesc, filter, limit = 20, offset = 0 } = query;
  const optionsSearch = { category: categoryId };
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

const getAllProducts = async query => {
  const { sortBy, sortByDesc, filter, limit = 20, offset = 0 } = query;
  const results = await Product.paginate(
    {},
    {
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
    },
  );
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

const getProductByIdByCategory = async (categoryId, productId) => {
  const result = await Product.findOne({
    _id: productId,
    category: categoryId,
  }).populate({
    path: 'category',
    select: 'category',
  });
  return result;
};

const getProductById = async productId => {
  const result = await Product.findOne({
    _id: productId,
  }).populate({
    path: 'category',
    select: 'category',
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

const updateProduct = async (productId, body) => {
  const result = await Product.findOneAndUpdate(
    { _id: productId },
    { ...body },
    { new: true, }
  ).populate({
    path: 'category',
    select: 'category',
  });
  return result;
};

const updateFavoriteProduct = async (userId, productId, body) => {
  const result = await Product.findOneAndUpdate(
    { _id: productId },
    { body, ...{ owner: userId } },
    { new: true, }
  ).populate({
    path: 'category',
    select: 'category',
  }).populate({
    path: 'owner',
    select: 'user',
  });
  return result;
};

const getProductsByIds = async ids => {
  const results = await Product.find({
    _id: ids,
  });
  return results;
};

module.exports = {
  getAllProductsByCategory,
  getAllProducts,
  getProductByIdByCategory,
  getProductById,
  removeProduct,
  addProduct,
  updateProduct,
  getProducts,
  getProductsByIds,
  updateFavoriteProduct,
};
