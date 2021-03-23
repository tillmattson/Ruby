const { Client } = require("pg");
const { DBCONFIG } = require("../config/config.js");

const client = new Client(DBCONFIG);

const run = () => {
  client
    .connect()
    .then(() => console.log("Loading Features..."))
    .catch((err) => console.error(err));
  client
    .query(`create index features_product on features(product_id);`)
    .catch(console.error);
  return client
    .query(
      `COPY features (id, product_id, feature, value) FROM '${__dirname}/../dataFiles/features.csv' delimiter ',' csv header null as 'null';`
    )
    .catch((e) => console.error(e.stack))
    .then(() => client.end())
    .catch(console.error)
    .then(() => console.log("Features Loaded\n"));
};

module.exports = { run };
