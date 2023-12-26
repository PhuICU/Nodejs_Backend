const router = require("express").Router();

const userController = require("../../controllers/userController");

router.post("/register", userController.Register);
router.post("/login", userController.login);
router.post("/logout", userController.logout);
router.get("/:id", userController.getUser);
// add address and phone
router.put("/add/:id", userController.addAddressAndPhone);

module.exports = router;
