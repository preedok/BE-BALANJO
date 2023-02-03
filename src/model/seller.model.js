const pool = require("../config/db");

const sellerModel = {
  // store
  register: (data) => {
    return pool.query(
      `
            INSERT INTO seller (seller_id, name, email, phone, password)
            VALUES ($1, $2, $3, $4, $5)
            `,
      [data.id, data.name, data.email, data.phone, data.password]
    );
  },

  emailCheck: (email) => {
    return pool.query(`SELECT * FROM seller WHERE email = $1`, [email]);
  },

  // store
  getStore: () => {
    return pool.query(`SELECT * FROM seller`);
  },

  getDetail: (id) => {
    return pool.query(`SELECT * FROM seller WHERE seller_id = $1`, [id]);
  },

  updateStore: (data) => {
    return pool.query(
      `
    UPDATE seller SET
    name = COALESCE($1, name),
    email = COALESCE($2, email),
    phone = COALESCE($3, phone),
    description = COALESCE($4, description),
    avatar = COALESCE($5, avatar),
    updated_at = COALESCE($6, updated_at)
    WHERE seller_id = $7
    `,
      [
        data.name,
        data.email,
        data.phone,
        data.description,
        data.file,
        data.date,
        data.id,
      ]
    );
  },

  deleteStore: (id) => {
    return pool.query(`DELETE FROM seller WHERE seller_id = $1`, [id]);
  },
};

module.exports = sellerModel;
