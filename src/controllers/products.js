const Products = require('../repositories/products');
const Categories = require('../repositories/category');
const { HttpCode } = require('../helpers/constants');
const Category = require('../model/category');
const { query } = require('express');
const { get } = require('mongoose');

console.log(query);

const getAllProductsByCategory = async (req, res, next) => {
  try {
    const id = req.params.categoryId;
    console.log(id);
    const { docs: products, ...rest } = await Products.getAllProductsByCategory(
      id,
      req.query,
    );
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
    const { docs: products, ...rest } = await Products.getAllProducts(
      req.query,
    );
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
    const product = await Products.removeProduct(req.params.productId);
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

const updateProduct = async (req, res, next) => {
  try {
    const id = req.params.productId;
    const product = await Products.updateProduct(id, req.body);
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
    const { id } = req.query.ids;
    const { docs: products, ...rest } = await Products.getProductsByIds({ id });
    if (products) {
      return res.json({
        status: 'success',
        code: HttpCode.OK,
        data: { products, ...rest },
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

const updateFavoriteProduct = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const id = req.params.productId;
    const { favorite } = await Products.getProductById(id);
    if (favorite == false) {
      const product = await Products.updateFavoriteProduct(
        userId,
        id,
        req.body);
      if (product) {
        return res.json({
          status: 'success',
          code: HttpCode.OK,
          data: { product },
        });
      } else {
        return res.status(HttpCode.NOT_FOUND).json({
          status: 'error',
          code: HttpCode.NOT_FOUND,
          message: 'Not found',
        });
      }
    }
    return res.status(HttpCode.CONFLICT).json({
      status: 'error',
      code: HttpCode.CONFLICT,
      message: 'PRODUCT ALREADY FAVORITE',
    });

  } catch (error) {
    next(error);
  }
};

const deleteFavoriteProduct = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const id = req.params.productId;
    const { favorite } = await Products.getProductById(id);
    console.log(favorite);
    if (favorite == true) {
      const product = await Products.deleteFavoriteProduct(
        userId,
        id,
        req.body,
      );
      console.log(product);
      if (product) {
        return res.json({
          status: 'success',
          code: HttpCode.OK,
          data: { product },
        });
      }
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
  updateFavoriteProduct,
  deleteFavoriteProduct,
};
