const router = require("express").Router();

const productController = require("../../controllers/productController");

// Get all products
router.get("/", productController.getAllProducts);

// Get a product
router.get("/:id", productController.getProduct);

router.get("/classification/:type", productController.classification);

router.get("/products/search/:name", productController.search);

module.exports = router;
