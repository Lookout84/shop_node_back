const Orders = require('../repositories/orders');
const Users = require('../repositories/users');
const { HttpCode } = require('../helpers/constants');

const { v4: uuidv4 } = require('uuid');

const getOrders = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { docs: orders, ...rest } = await Orders.getOrders(userId, req.query);
    transactions.sort(function (a, b) {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
    return res.json({
      status: 'success',
      code: HttpCode.OK,
      data: { orders, ...rest },
    });
  } catch (error) {
    next(error);
  }
};

const addOrder = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const order = await Orders.addOrder(userId, req.body);
    if (order) {
      const orders = await Orders.getAllOrders(userId);
      orders.sort(function (a, b) {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      });
      return res
        .status(HttpCode.CREATED)
        .json({ status: 'success', code: HttpCode.CREATED, orders });
    }
    return res.status(HttpCode.BAD_REQUEST).json({
      status: 'error',
      code: HttpCode.BAD_REQUEST,
      message: 'missing required name field',
    });
  } catch (error) {
    next(error);
  }
};

const updateOrder = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const order = await Orders.updateOrder(
      userId,
      req.params.orderId,
      req.body,
    );
    if (order) {
      const orders = await Orders.getAllOrders(userId);
      orders.sort(function (a, b) {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      });
      return res.json({
        status: 'success',
        code: HttpCode.OK,
        orders,
      });
    }
    return res.status(HttpCode.NOT_FOUND).json({
      status: 'error',
      code: HttpCode.NOT_FOUND,
      message: 'Not found',
    });
  } catch (error) {
    next(error);
  }
};

const removeOrder = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const orderId = req.params.orderId;
    const order = await Orders.removeOrder(userId, orderId);
    if (order) {
      const orders = await Orders.getAllOrders(userId);
      orders.sort(function (a, b) {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      });
      return res.json({
        status: 'success',
        code: HttpCode.OK,
        orders,
      });
    }
    return res.status(HttpCode.NOT_FOUND).json({
      status: 'error',
      code: HttpCode.NOT_FOUND,
      message: 'Not found',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getOrders,
  addOrder,
  updateOrder,
  removeOrder,
};
