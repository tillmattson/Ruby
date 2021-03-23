const { getRelated } = require(`./queries/related.js`);
const { getStyles } = require(`./queries/styles.js`);
const { getProductAtId } = require(`./queries/productAtId.js`);
const { getProducts } = require(`./queries/products.js`);

module.exports = {
  getRelated,
  getStyles,
  getProductAtId,
  getProducts,
};
