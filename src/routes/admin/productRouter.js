const router = require("express").Router();
const productController = require("../../controllers/productController");
const upload = require("../../config/multer");

// Create a product
router.post(
  "/",
  upload.single("image"),

  productController.createProduct
);

// Update a product

// Delete a product
router.delete("/:id", productController.deleteProduct);

router.put("/:id", productController.updateProduct);

module.exports = router;
