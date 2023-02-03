const cartModel = require("../model/cart.model");

const response = require("../helper/response.helper");
const { v4: uuid } = require("uuid");
const createError = require("http-errors");

const cartController = {
  insertCart: async (req, res, next) => {
    try {
      const id = uuid();
      const { id: bid } = req.decoded;
      const { pid, qty } = req.body;

      const data = {
        id,
        bid,
        pid,
        qty,
      };

      console.log(data);

      await cartModel.insertCart(data);

      const {
        rows: [cart],
      } = await cartModel.getCartDetail(id);

      response(res, cart, 200, "Insert Cart success");
    } catch (err) {
      console.log(err);
      next(new createError.InternalServerError());
    }
  },

  getCart: async (req, res, next) => {
    try {
      const { id } = req.decoded;
      const { rows: cart } = await cartModel.getCart(id);

      response(res, cart, 200, "Get Cart success");
    } catch (err) {
      console.log(err);
      next(new createError.InternalServerError());
    }
  },

  updateCart: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { qty } = req.body;
      const date = new Date();

      const data = {
        id,
        qty,
        date,
      };

      await cartModel.updateCart(data);

      const {
        rows: [cart],
      } = await cartModel.getCartDetail(id);

      response(res, cart, 200, "Update Cart success");
    } catch (err) {
      console.log(err);
      next(new createError.InternalServerError());
    }
  },

  deleteCart: async (req, res, next) => {
    try {
      const { id } = req.params;

      const {
        rows: [cart],
      } = await cartModel.getCartDetail(id);

      await cartModel.deleteCart(id);

      response(res, cart, 200, "Delete Cart success");
    } catch (err) {
      console.log(err);
      next(new createError.InternalServerError());
    }
  },
};

module.exports = cartController;
