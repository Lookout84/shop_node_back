const { query } = require('express');
const Order = require('../model/order');
const {
  updateStartDate,
  updateEndDate,
  getMonthFromString,
} = require('../helpers/updateDate');

const getOrders = async (userId, query) => {
  const { sortBy, sortByDesc, filter, limit = 20, offset = 0 } = query;
  const optionsSearch = { owner: userId };
  const results = await Order.paginate(optionsSearch, {
    limit,
    offset,
    sort: {
      ...(sortBy ? { [`${sortBy}`]: 1 } : {}),
      ...(sortByDesc ? { [`${sortByDesc}`]: -1 } : {}),
    },
    select: {
      ...(filter ? filter.split('|').join(' ') : ''),
    },
    populate: { path: 'owner', select: 'name email' },
  });
  return results;
};

const getOrderById = async (userId, orderId) => {
  const result = await Order.findOne({
    _id: orderId,
    owner: userId,
  }).populate({
    path: 'owner',
    select: 'name email balance',
  });
  return result;
};

const getAllOrders = async userId => {
  const result = await Order.find({
    owner: userId,
  })
    .populate({
      path: 'owner',
      select: '_id',
    })
    .sort({ date: -1 });
  return result;
};

const getOrdersByDate = async (userId, body) => {
  const { month, year } = body;
  const monthIntger = getMonthFromString(month);
  const startDate = updateStartDate(monthIntger, year);
  const endDate = updateEndDate(monthIntger, year).toISOString();
  const result = await Order.find({
    date: { $gte: startDate, $lt: endDate },
    owner: userId,
  }).populate({
    path: 'owner',
    select: 'name',
  });
  return result;
};

const addOrder = async (userId, body) => {
  const result = await Order.create({
    owner: userId,
    ...body,
  });
  return result;
};

const removeOrder = async (userId, orderId) => {
  const order = await Order.findByIdAndRemove({
    owner: userId,
    _id: orderId,
  }).populate({
    path: 'owner',
    select: 'name email',
  });

  return order;
};

const updateOrder = async (userId, orderId, body) => {
  const order = await Order.findOneAndUpdate(
    {
      _id: orderId,
      owner: userId,
    },
    { ...body },
    {
      new: true,
    },
  ).populate({
    path: 'owner',
    select: 'name email',
  });
  return order;
};

module.exports = {
  getOrders,
  getOrderById,
  addOrder,
  removeOrder,
  getOrdersByDate,
  getAllOrders,
  updateOrder,
};
