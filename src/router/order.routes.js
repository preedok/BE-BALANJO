const express = require("express");
const router = express.Router();

const { jwtAuth } = require("../middleware/auth.middleware");
const { insertOrder, getOrder, getOrderDetail, updateOrder, deleteOrder, getOwnOrder, cancelOrder } = require("../controller/order.controller");

router
.post("/", jwtAuth, insertOrder)
.get("/", jwtAuth, getOrder)
.get("/myorder", jwtAuth, getOwnOrder)
.get("/:id", getOrderDetail)
.put("/pay/:id", updateOrder)
.put("/cancel/:id", cancelOrder)
.delete("/:id", deleteOrder)

module.exports = router;
