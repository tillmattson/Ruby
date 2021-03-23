const { pool } = require("./conn.js");

const newClient = () => {
  return pool.connect().catch(console.error);
};
const getStyles = (product_id) => {
  let client, styles;
  return newClient()
    .then((conn) =>
      conn
        .query(
          `select style_id, name, sale_price, original_price, default_style from styles where product_id = ${product_id};`
        )
        .then(({ rows }) => {
          styles = rows;
          client = conn;
          return styles;
        })
    )
    .then(() =>
      Promise.all(
        styles.map((style) =>
          client
            .query(
              `select thumbnail_url, url from photos where style_id = ${style.style_id} order by id asc;`
            )
            .then(({ rows }) => {
              style.skus = {};
              style.photos = rows;
              return style;
            })
            .catch(console.error)
        )
      )
    )
    .then(() =>
      Promise.all(
        styles.map((style) =>
          client
            .query(
              `select id, size, quantity from skus where style_id = ${style.style_id} order by id asc;`
            )
            .then(({ rows }) => {
              rows.map(
                (sku) =>
                  (style.skus[sku.id] = {
                    quantity: sku.quantity,
                    size: sku.size,
                  })
              );
              return style;
            })
        )
      )
    )
    .then((data) => {
      client.release();
      return data;
    })
    .catch(() => console.log(`Database Error: getStyles in styles.js`));
};

module.exports = { getStyles };
