const { pool } = require("./conn.js");

const getProductAtId = (product_id) => {
  let product, client;
  return pool
    .connect()
    .then((conn) =>
      conn
        .query(`select * from products where id = ${product_id};`)
        .then(({ rows }) => {
          product = rows[0];
          client = conn;
          return product;
        })
    )
    .then(() =>
      client.query(
        `select feature, value from features where product_id = ${product_id};`
      )
    )
    .then(({ rows }) => {
      if (rows.length) {
        product.features = rows;
      }
      client.release();
      return product;
    })
    .catch(() =>
      console.log(`Database Error: getProductAtId in productAtId.js`)
    );
};

module.exports = { getProductAtId };
