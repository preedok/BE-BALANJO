const pool = require("../config/db");

const orderModel = {
  insertOrder: (data) => {
    return pool.query(
      `
        INSERT INTO orders (order_id, cart_id, buyer_id, total, payment)
        VALUES ($1, $2, $3, $4, $5)
        `,
      [data.id, data.cid, data.bid, data.total, data.payment]
    );
  },

  getOrder: (id) => {
    return pool.query(
      `
    SELECT orders.order_id, orders.status, product.name, product.price, cart.qty,
    product.image, (product.price * cart.qty) AS total, seller.name AS seller_name
    FROM orders JOIN (cart JOIN (product JOIN seller USING (seller_id)) USING (product_id)) USING (cart_id)
    WHERE orders.buyer_id = $1`,
      [id]
    );
  },

  getOwnOrder: (id) => {
    return pool.query(
      `
    SELECT orders.order_id, orders.status, product.name, product.price, cart.qty,
    product.image, (product.price * cart.qty) AS total, buyer.name AS buyer_name
    FROM orders JOIN buyer USING (buyer_id) 
    JOIN (cart JOIN (product JOIN seller USING (seller_id)) USING (product_id)) 
    USING (cart_id) WHERE product.seller_id = $1`,
      [id]
    );
  },

  getOrderDetail: (id) => {
    return pool.query(
      `
    SELECT orders.order_id, orders.status, product.name, product.price, cart.qty, 
    product.image, (product.price * cart.qty) AS total, seller.name AS seller_name
    FROM orders JOIN (cart JOIN (product JOIN seller USING (seller_id)) USING (product_id)) USING (cart_id)
    WHERE order_id = $1`,
      [id]
    );
  },

  updateOrder: (id) => {
    return pool.query(`UPDATE orders SET status = 1 WHERE order_id = $1`, [id]);
  },

  cancelOrder: (id) => {
    return pool.query(`UPDATE orders SET status = 2 WHERE order_id = $1`, [id]);
  },

  deleteOrder: (id) => {
    return pool.query(`DELETE FROM orders WHERE order_id = $1`, [id]);
  },
};

module.exports = orderModel;
