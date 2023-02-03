const express = require("express");
const { insertCart, getCart, updateCart, deleteCart } = require("../controller/cart.controller");
const { jwtAuth } = require("../middleware/auth.middleware");
const router = express.Router();

router
.post("/", jwtAuth, insertCart)
.get("/", jwtAuth, getCart)
.put("/:id", updateCart)
.delete("/:id", deleteCart)

module.exports = router