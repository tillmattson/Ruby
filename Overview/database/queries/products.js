const { pool } = require("./conn.js");

const getProducts = (pageNumber, resultsPerPage) => {
  let start = (pageNumber - 1) * resultsPerPage;
  let num = resultsPerPage < 5000 ? resultsPerPage : 5000;
  let products = [];
  return pool
    .query(
      `select * from products order by id asc limit ${num} offset ${start};`
    )
    .then(({ rows }) => {
      if (rows.length) {
        products = rows;
      }
      return products;
    })
    .catch(() => console.log(`Database Error: getProducts in products.js`));
};
module.exports = { getProducts };
