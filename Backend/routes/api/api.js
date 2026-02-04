const router = require("express").Router();
const authRoutes = require("./Auth.route.js");
// const productsRoutes = require("./Product.route");


router.use("/auth",authRoutes)
 res.json({ message: "Auth route working" });
// router.use("/product",productsRoutes)

module.exports = router;