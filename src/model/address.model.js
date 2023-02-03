const pool = require("../config/db");

const addressModel = {
  insertAddress: (data) => {
    return pool.query(
      `
    INSERT INTO address (buyer_id, label, recipient, phone, residence, city, postcode)
    VALUES ($1, $2, $3, $4, $5, $6, $7)    
    `,
      [
        data.id,
        data.label,
        data.recipient,
        data.phone,
        data.residence,
        data.city,
        data.postcode,
      ]
    );
  },

  getAddress: (id) => {
    return pool.query(`SELECT * FROM address WHERE buyer_id = $1`, [id]);
  },

  getAddressDetail: (id) => {
    return pool.query(`SELECT * FROM address WHERE address_id = $1`, [id]);
  },

  updateAddress: (data) => {
    return pool.query(
      `
    UPDATE address SET
    label = COALESCE($1, label),
    recipient = COALESCE($2, recipient),
    phone = COALESCE($3, phone),
    residence = COALESCE($4, residence),
    city = COALESCE($5, city),
    postcode = COALESCE($6, postcode),
    updated_at = COALESCE($7, updated_at)
    WHERE address_id = $8
    `,
      [
        data.label,
        data.recipient,
        data.phone,
        data.residence,
        data.city,
        data.postcode,
        data.date,
        data.id,
      ]
    );
  },

  deleteAddress: (id) => {
    return pool.query(`DELETE FROM address WHERE address_id = $1`, [id]);
  },
};

module.exports = addressModel;
