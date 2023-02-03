const addressModel = require("../model/address.model");

const response = require("../helper/response.helper");
const createError = require("http-errors");

const addressController = {
  insertAddress: async (req, res, next) => {
    try {
      const { id } = req.decoded;
      const data = {
        id,
        label: req.body.label,
        recipient: req.body.recipient,
        phone: req.body.phone,
        residence: req.body.residence,
        city: req.body.city,
        postcode: req.body.postcode,
      };

      await addressModel.insertAddress(data);

      response(res, data, 200, "Insert Address success");
    } catch (err) {
      console.log(err);
      next(new createError.InternalServerError());
    }
  },

  getAddress: async (req, res, next) => {
    try {
      const { id } = req.decoded;

      const { rows: address } = await addressModel.getAddress(id);

      response(res, address, 200, "Get Address success");
    } catch (err) {
      console.log(err);
      next(new createError.InternalServerError());
    }
  },

  getAddressDetail: async (req, res, next) => {
    try {
      const { id } = req.params;

      const {
        rows: [address],
      } = await addressModel.getAddressDetail(id);

      response(res, address, 200, "Get Address detail success");
    } catch (err) {
      console.log(err);
      next(new createError.InternalServerError());
    }
  },

  updateAddress: async (req, res, next) => {
    try {
      const { id } = req.params;
      const date = new Date();

      const data = {
        id,
        label: req.body.label,
        recipient: req.body.recipient,
        phone: req.body.phone,
        residence: req.body.residence,
        city: req.body.city,
        postcode: req.body.postcode,
        date,
      };

      await addressModel.updateAddress(data);

      const {
        rows: [address],
      } = await addressModel.getAddressDetail(id);

      response(res, address, 200, "Update Address success");
    } catch (err) {
      console.log(err);
      next(new createError.InternalServerError());
    }
  },

  deleteAddress: async (req, res, next) => {
    try {
      const { id } = req.params;

      const {
        rows: [address],
      } = await addressModel.getAddressDetail(id);

      await addressModel.deleteAddress(id);

      response(res, address, 200, "Delete Address success");
    } catch (err) {
      console.log(err);
      next(new createError.InternalServerError());
    }
  },
};

module.exports = addressController;
