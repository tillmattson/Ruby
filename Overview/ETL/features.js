const { Pool } = require("pg");
const { DBCONFIG } = require("../config/config.js");

const client = new Pool(DBCONFIG);

const run = () => {
  console.log("Loading Features...");
  return client
    .query(`create index features_product on features(product_id);`)
    .then(() =>
      client.query(
        `COPY features (id, product_id, feature, value) FROM '${__dirname}/../dataFiles/features.csv' delimiter ',' csv header null as 'null';`
      )
    )
    .then(() => console.log("Features Loaded\n"))
    .catch(console.error)
    .then(() => client.end());
};

module.exports = { run };
