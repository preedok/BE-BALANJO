const sellerModel = require("../model/seller.model");

const response = require("../helper/response.helper");
const generateToken = require("../helper/auth.helper");
const { v4: uuid } = require("uuid");
const { hash, compare } = require("bcryptjs");
const createError = require("http-errors");
const cloudinary = require("../helper/cloudinary");

const sellerController = {
  // auth
  register: async (req, res, next) => {
    try {
      const id = uuid();
      const { name, email, phone, password } = req.body;

      const { rowCount: check } = await sellerModel.emailCheck(email);

      if (check) {
        next(new createError(403, "E-mail already in use"));
      }

      const hashedPassword = await hash(password, 10);

      const data = {
        id,
        name,
        email,
        phone,
        password: hashedPassword,
      };

      await sellerModel.register(data);

      delete data.password;

      response(res, data, 200, "Register Seller success");
    } catch (err) {
      console.log(err);
      next(new createError.InternalServerError());
    }
  },

  login: async (req, res, next) => {
    try {
      const { email, password } = req.body;

      const data = await sellerModel.emailCheck(email);
      const { rowCount: check } = data;
      console.log(check);

      if (!check) {
        next(new createError(403, "E-mail not registered"));
      }

      const {
        rows: [seller],
      } = data;
      const savedPassword = seller.password;

      const valid = await compare(password, savedPassword);

      if (!valid) {
        return next(createError(403, "E-mail or password incorrect!"));
      }

      delete seller.password;

      const token = generateToken({
        id: seller.seller_id,
        name: seller.name,
      });

      response(res, { token, seller }, 200, "Login Seller success");
    } catch (err) {
      console.log(err);
      next(new createError.InternalServerError());
    }
  },

  // store
  getStore: async (req, res, next) => {
    try {
      const { rows: store } = await sellerModel.getStore();

      response(res, store, 200, "Get Store success");
    } catch (err) {
      console.log(err);
      next(new createError.InternalServerError());
    }
  },

  getDetail: async (req, res, next) => {
    try {
      const { id } = req.params;

      const {
        rows: [seller],
      } = await sellerModel.getDetail(id);

      delete seller.password;

      response(res, seller, 200, "Get Seller success");
    } catch (err) {
      console.log(err);
      next(new createError.InternalServerError());
    }
  },

  updateStore: async (req, res, next) => {
    try {
      const { id } = req.params;

      const { name, email, phone, description } = req.body;
      const date = new Date();
      let avatar = null;

      if (req.file) {
        avatar = await cloudinary.uploader.upload(req.file.path);
      }

      const data = {
        id,
        name,
        email,
        phone,
        description,
        file : avatar.url,
        date,
      };

      await sellerModel.updateStore(data);

      const {
        rows: [seller],
      } = await sellerModel.getDetail(id);

      delete seller.password;

      response(res, seller, 200, "Update Seller success");
    } catch (err) {
      console.log(err);
      next(new createError.InternalServerError());
    }
  },

  deleteStore: async (req, res, next) => {
    try {
      const { id } = req.params;

      const {
        rows: [seller],
      } = await sellerModel.getDetail(id);

      delete seller.password;

      await sellerModel.deleteStore(id);

      response(res, seller, 200, "Delete Seller success");
    } catch (err) {
      console.log(err);
      next(new createError.InternalServerError());
    }
  },
};

module.exports = sellerController;
