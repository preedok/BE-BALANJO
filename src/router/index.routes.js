const express = require("express");
const router = express.Router();

// user
const buyerRoutes = require("./buyer.routes");
const sellerRoutes = require("./seller.routes");

// app
const categoryRoutes = require("./category.routes");
const productRoutes = require("./product.routes");
const cartRoutes = require("./cart.routes");
const orderRoutes = require("./order.routes");
const addressRoutes = require("./address.routes");


router
// user
.use("/buyer", buyerRoutes)
.use("/seller", sellerRoutes)

// app
.use("/category", categoryRoutes)
.use("/product", productRoutes)
.use("/cart", cartRoutes)
.use("/order", orderRoutes)
.use("/address", addressRoutes)


module.exports = router;