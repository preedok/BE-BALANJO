const pool = require("../config/db");

const productModel = {
  insertProduct: (data) => {
    return pool.query(
      `
        INSERT INTO product (product_id, seller_id, category_id, name, price, stock, condition, description, image)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
        `,
      [
        data.id,
        data.sid,
        data.cid,
        data.name,
        data.price,
        data.stock,
        data.condition,
        data.description,
        data.file,
      ]
    );
  },

  getProduct: (category, seller, search, sortBy, sortOrder, limit, offset) => {
    let query = {
      text: `
      SELECT seller.name AS seller_name, product.* FROM product JOIN seller using (seller_id)
      WHERE product.name ILIKE '%${search}%' AND seller.name ILIKE '%${seller}%'
      `,
    };

    if (category) {
      query.text = query.text + " " + `AND category_id = ${category}`;
    }

    query.text =
      query.text +
      " " +
      `ORDER BY ${sortBy} ${sortOrder} LIMIT ${limit} OFFSET ${offset}`;

    return pool.query(query);
  },

  getOwnProduct: (id, search, sortBy, sortOrder, limit, offset) => {
    return pool.query(`
    SELECT * FROM product WHERE name ILIKE '%${search}%' AND seller_id = '${id}'
    ORDER BY ${sortBy} ${sortOrder} LIMIT ${limit} OFFSET ${offset}
    `);
  },

  countProduct: () => {
    return pool.query(`SELECT COUNT(*) AS total FROM product`);
  },

  getProductDetail: (id) => {
    return pool.query(
      `
    SELECT seller.name AS seller_name, product.* FROM product JOIN seller using (seller_id)
     WHERE product_id = $1
    `,
      [id]
    );
  },

  updateProduct: (data) => {
    return pool.query(
      `
    UPDATE product SET
    category_id = COALESCE($1, category_id),
    name = COALESCE($2, name),
    price = COALESCE($3, price),
    stock = COALESCE($4, stock),
    condition = COALESCE($5, condition),
    description = COALESCE($6, description),
    image = COALESCE($7, image),
    updated_at = COALESCE($8, updated_at)
    WHERE product_id = $9
    `,
      [
        data.cid,
        data.name,
        data.price,
        data.stock,
        data.condition,
        data.description,
        data.file,
        data.date,
        data.id,
      ]
    );
  },

  deleteProduct: (id) => {
    return pool.query(`DELETE FROM product WHERE product_id = $1`, [id]);
  },
};

module.exports = productModel;
