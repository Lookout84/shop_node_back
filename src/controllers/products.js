const Products = require('../repositories/products');
const { HttpCode } = require('../helpers/constants');

const getProducts = async (req, res, next) => {
  try {
    const { docs: products, ...rest } = await Products.getAllProducts(
      req.query,
    );
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
    const { id } = req.params;
    console.log(id);
    const product = await Products.addProduct(req.body);
    if (product) {
      return res
        .status(HttpCode.CREATED)
        .json({ status: 'success', code: HttpCode.CREATED, data: { product } });
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

module.exports = {
  getProducts,
  getProductById,
  addProduct,
  removeProduct,
  updateProduct,
};
