const Product = require("../models/product");

const productController = {
  // Get all products
  getAllProducts: async (req, res) => {
    try {
      const products = await Product.find();
      res.json(products);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  // Get a product
  getProduct: async (req, res) => {
    try {
      const product = await Product.findById(req.params.id);
      res.json(product);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  // Create a product
  createProduct: async (req, res) => {
    try {
      const { name, description, image, price, type } = req.body;
      console.log(req.body);
      console.log(req.file);
      const product = await Product.findOne({ name });
      if (product)
        return res.status(400).json({ msg: "This product already exists." });
      console.log(req.body);

      const path = req.file.path.replace(/\\/g, "/");

      const newProduct = new Product({
        name,
        description,
        image: path,
        price,
        type,
      });
      await newProduct.save();
      console.log({ newProduct });
      res.json({ msg: "Created a product." });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  // Delete a product
  deleteProduct: async (req, res) => {
    try {
      await Product.findByIdAndDelete(req.params.id);
      res.json({ msg: "Deleted a Product" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  updateProduct: async (req, res) => {
    try {
      const { name, description, image, price } = req.body;
      await Product.findOneAndUpdate(
        { _id: req.params.id },
        { name, description, image, price }
      );
      res.json({ msg: "Updated a Product" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  classification: async (req, res) => {
    try {
      const { type } = req.params;
      const products = await Product.find({ type });
      res.json(products);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  search: async (req, res) => {
    try {
      const { name } = req.params;
      const products = await Product.find({
        name: { $regex: name, $options: "i" },
      });
      res.json(products);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = productController;
