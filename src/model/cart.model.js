const pool = require("../config/db");

const cartModel = {
  insertCart: (data) => {
    return pool.query(
      `
        INSERT INTO cart (cart_id, buyer_id, product_id, qty)
        VALUES ($1, $2, $3, $4)
        `,
      [data.id, data.bid, data.pid, data.qty]
    );
  },

  getCart: (id) => {
    return pool.query(
      `
    SELECT seller.name AS seller_name, product.name, product.price, product.image, cart.*
    FROM cart JOIN (product JOIN seller USING (seller_id)) USING (product_id)
    WHERE buyer_id = $1
    `,
      [id]
    );
  },

  getCartDetail: (id) => {
    return pool.query(
      `
    SELECT seller.name AS seller_name, product.name, product.price, product.image, cart.*
    FROM cart JOIN (product JOIN seller USING (seller_id)) USING (product_id)
    WHERE cart_id = $1
    `,
      [id]
    );
  },

  updateCart: (data) => {
    return pool.query(
      `
    UPDATE cart SET
    qty = COALESCE($1, qty),
    updated_at = COALESCE($2, updated_at)
    WHERE cart_id = $3
    `,
      [data.qty, data.date, data.id]
    );
  },

  checkoutCart: (id) => {
    return pool.query(`UPDATE cart SET status = 1 WHERE cart_id = $1`, [id]);
  },

  deleteCart: (id) => {
    return pool.query(`DELETE FROM cart WHERE cart_id = $1`, [id]);
  },
};

module.exports = cartModel;
