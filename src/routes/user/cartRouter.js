const router = require("express").Router();
const cartController = require("../../controllers/cartController");

// Get all carts
router.get("/", cartController.getAllCarts);

// Get a cart
router.get("/:id", cartController.getCart);

// Update a cart
router.put("/:id", cartController.updateCart);

// Add a cart
router.post("/add", cartController.addCart);

// clear cart
router.delete("/clear/:id", cartController.clearCart);

// Remove a product
router.delete("/:id", cartController.removeProduct);

module.exports = router;
