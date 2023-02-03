const pool = require("../config/db");

const buyerModel = {
  // auth
  register: (data) => {
    return pool.query(
      `
        INSERT INTO buyer (buyer_id, name, email, password)
        VALUES ($1, $2, $3, $4)
        `,
      [data.id, data.name, data.email, data.password]
    );
  },

  emailCheck: (email) => {
    return pool.query(`SELECT * FROM buyer WHERE email = $1`, [email]);
  },

  getBuyer: () => {
    return pool.query(
      `SELECT buyer.*, address.city, address.residence, address.postcode 
      FROM buyer LEFT JOIN address USING (buyer_id)`
    );
  },

  getDetail: (id) => {
    return pool.query(
      `SELECT buyer.*, address.city, address.residence, address.postcode 
      FROM buyer LEFT JOIN address USING (buyer_id) WHERE buyer_id = $1`,
      [id]
    );
  },

  updateAccount: (data) => {
    return pool.query(
      `
    UPDATE buyer SET
    name = COALESCE($1, name),
    email = COALESCE($2, email),
    phone = COALESCE($3, phone),
    gender = COALESCE($4, gender),
    birthdate = COALESCE($5, birthdate),
    avatar = COALESCE($6, avatar),
    updated_at = COALESCE($7, updated_at)
    WHERE buyer_id = $8
    `,
      [
        data.name,
        data.email,
        data.phone,
        data.gender,
        data.birthdate,
        data.file,
        data.date,
        data.id,
      ]
    );
  },

  deleteAccount: (id) => {
    return pool.query(`DELETE FROM buyer WHERE buyer_id = $1`, [id]);
  },
};

module.exports = buyerModel;
