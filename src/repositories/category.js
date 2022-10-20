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

const updateCategory = async (body) => {
  const category = await category.findOneAndUpdate(
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
  updateCategory
};
