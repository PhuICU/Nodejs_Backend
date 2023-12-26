const router = require("express").Router();
const orderController = require("../../controllers/orderController");

// Add an order
router.post("/", orderController.addOrder);

// Get an order by id
router.get("/:id", orderController.getOrderById);

// Update an order to paid
router.put("/:id/pay", orderController.updateOrderToPaid);

// Get all orders
router.get("/", orderController.getOrderAdmin);
module.exports = router;
