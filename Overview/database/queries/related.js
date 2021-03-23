const { pool } = require("./conn.js");

const getRelated = (product_id) => {
  let rel = [];
  return pool
    .query(
      `select related from related where product_id = ${product_id} order by related asc;`
    )
    .then(({ rows }) => {
      if (rows.length) {
        rel = rows.map(({ related }) => related);
      }
      return rel;
    })
    .catch(() => console.log("Database Error: at getRelated in related.js"));
};

module.exports = { getRelated };
