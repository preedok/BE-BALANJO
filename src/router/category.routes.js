const express = require("express");
const {
  insertCategory,
  getCategory,
  getCategoryDetail,
  updateCategory,
  deleteCategory,
} = require("../controller/category.controller");
const upload = require("../middleware/multer.middleware");
const router = express.Router();

router
  .post("/", upload.single("image"), insertCategory)
  .get("/", getCategory)
  .get("/:id", getCategoryDetail)
  .put("/:id", upload.single("image"), updateCategory)
  .delete("/:id", deleteCategory);

module.exports = router;
