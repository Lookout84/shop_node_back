const Category = require('../model/category');

const getCategoryById = async categoryId => {
  const result = await Category.findOne({
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
  const result = await Category.find();
  return result;
};

const findByCategory = async category => {
  const result = await Category.findOne({ category });
  return result;
};

const updateCategory = async (categoryId, body) => {
  const category = await Category.findOneAndUpdate(
    {
      _id: categoryId,
    },
    { ...body },
    {
      new: true,
    },
  );
  return category;
};

module.exports = {
  getCategoryById,
  addCategory,
  getAllCategory,
  updateCategory,
  findByCategory,
};
