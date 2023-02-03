const categoryModel = require("../model/category.model");

const response = require("../helper/response.helper");
const createError = require("http-errors");
const cloudinary = require("../helper/cloudinary");

const categoryController = {
  insertCategory: async (req, res, next) => {
    try {
      const { name } = req.body;
      let image = null;

      if (req.file) {
        image = await cloudinary.uploader.upload(req.file.path);
      }

      const data = {
        name,
        file : image.url,
      };

      await categoryModel.insertCategory(data);

      response(res, data, 200, "Insert Category success");
    } catch (err) {
      console.log(err);
      next(new createError.InternalServerError());
    }
  },

  getCategory: async (req, res, next) => {
    try {
      const { rows: categories } = await categoryModel.getCategory();

      response(res, categories, 200, "Get Category success");
    } catch (err) {
      console.log(err);
      next(new createError.InternalServerError());
    }
  },

  getCategoryDetail: async (req, res, next) => {
    try {
      const { id } = req.params;

      const {
        rows: [category],
      } = await categoryModel.getCategoryDetail(id);

      response(res, category, 200, "Get Category Detail success");
    } catch (err) {
      console.log(err);
      next(new createError.InternalServerError());
    }
  },

  updateCategory: async (req, res, next) => {
    try {
      const { id } = req.params;

      const { name } = req.body;
      let image;

      if (req.file) {
        image = await cloudinary.uploader.upload(req.file.path);
      }

      const data = {
        name,
        file: image.url,
      };

      await categoryModel.updateCategory(data);

      const {
        rows: [category],
      } = await categoryModel.getCategoryDetail(id);

      response(res, category, 200, "Update Category success");
    } catch (err) {
      console.log(err);
      next(new createError.InternalServerError());
    }
  },

  deleteCategory: async (req, res, next) => {
    try {
      const { id } = req.params;

      const {
        rows: [category],
      } = await categoryModel.getCategoryDetail(id);

      await categoryModel.deleteCategory(id);

      response(res, category, 200, "Delete Category success");
    } catch (err) {
      console.log(err);
      next(new createError.InternalServerError());
    }
  },
};

module.exports = categoryController;
