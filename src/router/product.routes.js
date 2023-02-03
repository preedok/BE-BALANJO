const express = require("express");
const router = express.Router();

const { insertProduct, getProduct, getProductDetail, updateProduct, deleteProduct, getOwnProduct } = require("../controller/product.controller");
const { jwtAuth } = require("../middleware/auth.middleware");
const upload = require("../middleware/multer.middleware");

router
.post("/", jwtAuth, upload.single("image"), insertProduct)
.get("/", getProduct)
.get("/myproduct", jwtAuth, getOwnProduct)
.get("/:id", getProductDetail)
.put("/:id", upload.single("image"), updateProduct)
.delete("/:id", deleteProduct)

module.exports = router