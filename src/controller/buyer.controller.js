const buyerModel = require("../model/buyer.model");

const response = require("../helper/response.helper");
const generateToken = require("../helper/auth.helper");
const { v4: uuid } = require("uuid");
const { hash, compare } = require("bcryptjs");
const createError = require("http-errors");
const cloudinary = require("../helper/cloudinary");

const buyerController = {
  // auth
  register: async (req, res, next) => {
    try {
      const id = uuid();
      const { name, email, password } = req.body;

      const { rowCount: check } = await buyerModel.emailCheck(email);

      if (check) {
        next(new createError(403, "E-mail already in use"));
      }

      const hashedPassword = await hash(password, 10);

      const data = {
        id,
        name,
        email,
        password: hashedPassword,
      };

      await buyerModel.register(data);

      delete data.password;

      response(res, data, 200, "Register success");
    } catch (err) {
      console.log(err);
      next(new createError.InternalServerError());
    }
  },

  login: async (req, res, next) => {
    try {
      const { email, password } = req.body;

      const data = await buyerModel.emailCheck(email);
      const { rowCount: check } = data;
      console.log(check);

      if (!check) {
        next(new createError(403, "E-mail not registered"));
      }

      const {
        rows: [buyer],
      } = data;
      const savedPassword = buyer.password;

      const valid = await compare(password, savedPassword);

      if (!valid) {
        return next(createError(403, "E-mail or password incorrect!"));
      }

      delete buyer.password;

      const token = generateToken({
        id: buyer.buyer_id,
        name: buyer.name,
      });

      response(res, { token, buyer }, 200, "Login success");
    } catch (err) {
      console.log(err);
      next(new createError.InternalServerError());
    }
  },

  getBuyer: async (req, res, next) => {
    try {
      const { rows: buyer } = await buyerModel.getBuyer();

      response(res, buyer, 200, "Get Buyer success");
    } catch (err) {
      console.log(err);
      next(new createError.InternalServerError());
    }
  },

  getDetail: async (req, res, next) => {
    try {
      const { id } = req.params;

      const {
        rows: [buyer],
      } = await buyerModel.getDetail(id);

      delete buyer.password;

      response(res, buyer, 200, "Get Buyer Detail success");
    } catch (err) {
      console.log(err);
      next(new createError.InternalServerError());
    }
  },

  updateAccount: async (req, res, next) => {
    try {
      const { id } = req.params;

      const { name, email, phone, gender, birthdate } = req.body;
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
        gender,
        birthdate,
        file: avatar.url,
        date,
      };

      await buyerModel.updateAccount(data);

      const {
        rows: [buyer],
      } = await buyerModel.getDetail(id);

      delete buyer.password;

      response(res, buyer, 200, "Update Buyer success");
    } catch (err) {
      console.log(err);
      next(new createError.InternalServerError());
    }
  },

  deleteAccount: async (req, res, next) => {
    try {
      const { id } = req.params;

      const {
        rows: [buyer],
      } = await buyerModel.getDetail(id);

      delete buyer.password;

      await buyerModel.deleteAccount(id);

      response(res, buyer, 200, "Delete Buyer success");
    } catch (err) {
      console.log(err);
      next(new createError.InternalServerError());
    }
  },
};

module.exports = buyerController;
