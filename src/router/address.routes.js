const express = require("express");
const { insertAddress, getAddress, getAddressDetail, updateAddress, deleteAddress } = require("../controller/address.controller");
const router = express.Router();

const { jwtAuth } = require("../middleware/auth.middleware");

router
.post("/", jwtAuth, insertAddress)
.get("/", jwtAuth, getAddress)
.get("/:id", getAddressDetail)
.put("/:id", updateAddress)
.delete("/:id", deleteAddress)

module.exports = router