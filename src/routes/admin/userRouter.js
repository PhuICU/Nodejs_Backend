const router = require("express").Router();
const userController = require("../../controllers/userController");

router.get("/", userController.getAllUser);

router.get("/:id", userController.getUser);

router.delete("/:id", userController.deleteUser);

module.exports = router;
