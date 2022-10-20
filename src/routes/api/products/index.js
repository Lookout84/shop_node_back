const express = require("express");
const router = express.Router();
const ctrl = require("../../../controllers/products");
const guard = require("../../../helpers/guard");

const {
    validationCreateProduct,
} = require("./validation");

router.use((req, res, next) => {
    console.log(req.url);
    next();
});

router
    .get("/", guard, ctrl.getProducts);
router
    .post("/add", guard, validationCreateProduct, ctrl.addProduct);
router
    .put("/:productId", guard, ctrl.updateProduct)
    .delete("/:productId", guard, ctrl.removeProduct);


module.exports = router;