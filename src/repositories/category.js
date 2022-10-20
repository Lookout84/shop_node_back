const Category = require('../model/category');

const getCategoryById = async categoryId => {
  const result = await Budget.findOne({
    _id: categoryId,
  });
  return result;
};

const addCategory = async body => {
  const result = await Category.create({
    ...body,
  });
  return result;
};

const getAllCategory = async () => {
  const result = await Order.find({}).sort({ category: -1 });
  return result;
};

module.exports = {
  getCategoryById,
  getPlanBudgetsByDate,
  addCategory,
  getAllCategory,
};
