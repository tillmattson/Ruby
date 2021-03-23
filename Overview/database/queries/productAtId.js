const { pool } = require("./conn.js");

const getProductAtId = (product_id) => {
  let product;
  return pool
    .query(`select * from products where id = ${product_id};`)
    .then(({ rows }) => (product = rows[0]))
    .then(() =>
      pool.query(
        `select feature, value from features where product_id = ${product_id} order by id asc;`
      )
    )
    .then(({ rows }) => {
      if (rows.length) {
        product.features = rows;
      }
      return product;
    })
    .catch(() =>
      console.log(`Database Error: getProductAtId in productAtId.js`)
    );
};

module.exports = { getProductAtId };
