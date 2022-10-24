const Products = require('../repositories/products');
const Categories = require('../repositories/category');
const { HttpCode } = require('../helpers/constants');
const Category = require('../model/category');

const getAllProductsByCategory = async (req, res, next) => {
  try {
    const id = req.params.categoryId;
    console.log(id);
    const { docs: products, ...rest } = await Products.getAllProductsByCategory(id, req.query);
    console.log(products);
    return res.json({
      status: 'success',
      code: HttpCode.OK,
      data: { products, ...rest },
    });
  } catch (error) {
    next(error);
  }
};

const getAllProducts = async (req, res, next) => {
  try {
    console.log(req.query);
    const { docs: products, ...rest } = await Products.getAllProducts(req.query);
    console.log(products);
    return res.json({
      status: 'success',
      code: HttpCode.OK,
      data: { products, ...rest },
    });
  } catch (error) {
    next(error);
  }
};

const getProductById = async (req, res, next) => {
  try {
    const product = await Products.getProductById(req.params.productId);
    if (product) {
      return res.json({
        status: 'success',
        code: HttpCode.OK,
        data: { product },
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

const addProduct = async (req, res, next) => {
  try {
    const id = req.params.categoryId;
    const body = req.body;
    console.log(id);
    const category = await Categories.getCategoryById(id);
    console.log(category);
    const product = await Products.addProduct(category, body);
    if (product) {
      return res.status(HttpCode.CREATED).json({
        status: 'success',
        code: HttpCode.CREATED,
        data: { product },
      });
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

const removeProduct = async (req, res, next) => {
  try {
    const conatct = await Products.removeProduct(req.params.productId);
    if (conatct) {
      return res.json({
        status: 'success',
        code: HttpCode.OK,
        data: { conatct },
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

const updateProduct = async (req, res, next) => {
  try {
    const product = await Products.updateProduct(
      req.params.productId,
      req.body,
    );
    if (product) {
      return res.json({
        status: 'success',
        code: HttpCode.OK,
        data: { product },
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

const getProductsByIds = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    console.log(userId);
    const { _id: ids } = req.params.ids;
    console.log(req.prams);
    const products = await Products.getProductsByIds({ userId, ids });
    if (products) {
      return res.json({
        status: 'success',
        code: HttpCode.OK,
        data: { products },
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
  getAllProductsByCategory,
  getAllProducts,
  getProductById,
  addProduct,
  removeProduct,
  updateProduct,
  getProductsByIds,
};
