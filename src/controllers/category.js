const Category = require('../repositories/category');
const { HttpCode } = require('../helpers/constants');

const getAllCategory = async (req, res, next) => {
    try {
        const { docs: category, ...rest } = await Category.getAllCategory(req.query);
        category.sort(function (a, b) {
            return new Date(b.date).getTime() - new Date(a.date).getTime();
        });
        return res.json({
            status: 'success',
            code: HttpCode.OK,
            data: { category, ...rest },
        });
    } catch (error) {
        next(error);
    }
}

const addCategory = async (req, res, next) => {
    try {
        const category = await Category.addCategory(req.body);
        if (category) {
            const category = await Category.getAllCategory();
            category.sort(function (a, b) {
                return new Date(b.date).getTime() - new Date(a.date).getTime();
            });
            return res
                .status(HttpCode.CREATED)
                .json({ status: 'success', code: HttpCode.CREATED, category });
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

const updateCategory = async (req, res, next) => {
    try {
        const category = await Category.updateCategory(
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
};
