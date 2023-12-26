const router = require("express").Router();

router.use("/products", require("./productRouter"));
router.use("/users", require("./userRouter"));
router.use("/carts", require("./cartRouter"));
router.use("/orders", require("./orderRouter"));

module.exports = router;
