const Order = require("../models/order");

const orderController = {
  addOrder: async (req, res) => {
    try {
      const { user_id, products, address, phone, totalPrice } = req.body;
      const order = new Order({
        user_id,
        products,
        address,
        phone,
        totalPrice,
      });
      const createdOrder = await order.save();
      res.status(201).json(createdOrder);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getOrderById: async (req, res) => {
    try {
      const order = await Order.findById(req.params.id);
      if (order) {
        res.json(order);
      } else {
        res.status(404).json({ message: "Order not found" });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getOrderAdmin: async (req, res) => {
    try {
      const orders = await Order.find({}).populate("user_id", "name");
      console.log(orders);
      res.json(orders);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  updateOrderToPaid: async (req, res) => {
    try {
      const order = await Order.findById(req.params.id);
      if (order) {
        order.isPaid = true;
        order.paidAt = Date.now();
        order.paymentResult = {
          id: req.body.id,
          status: req.body.status,
          update_time: req.body.update_time,
          email_address: req.body.payer.email_address,
        };

        const updatedOrder = await order.save();
        res.json(updatedOrder);
      } else {
        res.status(404).json({ message: "Order not found" });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

module.exports = orderController;
