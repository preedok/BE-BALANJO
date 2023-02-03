const pool = require("../config/db");

const categoryModel = {
  insertCategory: (data) => {
    return pool.query(
      `
        INSERT INTO category (name, image)
        VALUES ($1, $2)`,
      [data.name, data.file]
    );
  },

  getCategory: () => {
    return pool.query(`SELECT * FROM category`);
  },

  getCategoryDetail: (id) => {
    return pool.query(`SELECT * FROM category WHERE category_id = $1`, [id]);
  },

  updateCategory: (data) => {
    return pool.query(
      `
    UPDATE category SET
    name = COALESCE($1, name),
    image = COALESCE($2, image)
    WHERE category_id = $3
    `,
      [data.name, data.file, data.id]
    );
  },

  deleteCategory: (id) => {
    return pool.query(`DELETE FROM category WHERE category_id = $1`, [id]);
  },
};

module.exports = categoryModel;
