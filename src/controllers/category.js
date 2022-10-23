const Category = require('../repositories/category');
const { HttpCode } = require('../helpers/constants');

const getAllCategory = async (req, res, next) => {
  try {
    const category = await Category.getAllCategory(req.query);
    console.log(category);
    category.sort(function (a, b) {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
    return res.json({
      status: 'success',
      code: HttpCode.OK,
      data: { category },
    });
  } catch (error) {
    next(error);
  }
};

const getCategoryById = async (req, res, next) => {
  try {
    const id = req.params.categoryId;
    const category = await Category.getCategoryById(id);
    return res.json({
      status: 'success',
      code: HttpCode.OK,
      data: { category },
    });
  } catch (error) {
    next(error);
  }
};

const addCategory = async (req, res, next) => {
  try {
    const category = await Category.findByCategory(req.body.category);
    if (category) {
      return res.status(HttpCode.CONFLICT).json({
        status: 'error',
        code: HttpCode.CONFLICT,
        message: 'Така категорія товарів вже існує',
      });
    }
    const newCategory = await Category.addCategory(req.body);
    const categories = await Category.getAllCategory();
    categories.sort(function (a, b) {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
    return res
      .status(HttpCode.CREATED)
      .json({ status: 'success', code: HttpCode.CREATED, newCategory });
  } catch (error) {
    next(error);
  }
};

const updateCategory = async (req, res, next) => {
  try {
    const category = await Category.updateCategory(
      req.params.categoryId,
      req.body,
    );
    if (category) {
      const category = await Category.getAllCategory();
      category.sort(function (a, b) {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      });
      return res.json({
        status: 'success',
        code: HttpCode.OK,
        category,
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
  getAllCategory,
  addCategory,
  updateCategory,
  getCategoryById,
};
