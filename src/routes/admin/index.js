const router = require("express").Router();

router.use("/admin/products", require("./productRouter"));
router.use("/admin/users", require("./userRouter"));

module.exports = router;
