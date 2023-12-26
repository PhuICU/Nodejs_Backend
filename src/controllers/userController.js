const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

const userController = {
  // Register
  Register: async (req, res) => {
    try {
      const { name, email, password } = req.body;
      console.log(req.body);
      if (!name || !email || !password) {
        return res.status(400).json({ error: "Please fill in all fields." });
      }
      const user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ error: "This email already exists." });
      }

      const salt = await bcrypt.genSalt();
      const passwordHash = await bcrypt.hash(password, salt);

      const newUser = await User.create({
        name: name.trim(),
        email,
        password: passwordHash,
      });
      console.log({ newUser });

      res.json({ msg: "Register Success!", user: newUser });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  // Login
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      console.log(req.body);

      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ error: "This email does not exist." });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ error: "Password is incorrect." });
      }

      res.status(200).json({ user: user });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
  // Logout

  logout: async (req, res) => {
    try {
      return res.status(200).json({ msg: "Logged out!" });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  getUser: async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      res.json(user);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  getAllUser: async (req, res) => {
    try {
      const user = await User.find();
      res.json(user);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  deleteUser: async (req, res) => {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.json({ msg: "Deleted a User" });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  //add address and phone
  addAddressAndPhone: async (req, res) => {
    try {
      const { address, phone } = req.body;
      const user = await User.findById(req.params.id);
      if (user) {
        user.address = address;
        user.phone = phone;
        const updatedUser = await user.save();
        res.json(updatedUser);
      } else {
        res.status(404).json({ message: "User not found" });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

module.exports = userController;
