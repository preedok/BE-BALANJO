const express = require("express");
const { register, login, getDetail, updateStore, deleteStore, getStore } = require("../controller/seller.controller");
const upload = require("../middleware/multer.middleware");
const router = express.Router();

router
.post("/register", register)
.post("/login", login)
.get("/", getStore)
.get("/:id", getDetail)
.put("/:id", upload.single("avatar"), updateStore)
.delete("/:id", deleteStore)

module.exports = router