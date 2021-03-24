const { Pool } = require("pg");
const { DBCONFIG } = require("../config/config.js");

const client = new Pool(DBCONFIG);

const run = () => {
  console.log("Loading Photos...");

  return client
    .query(
      `COPY photos (id, style_id, url, thumbnail_url) FROM '${__dirname}/../dataFiles/photos.csv' delimiter ',' csv header ;`
    )
    .then(() => client.query(`create index style_photos on photos(style_id);`))
    .then(() => client.query(`ALTER table photos drop column id;`))
    .then(() => client.query(`alter table photos rename column did to id`))
    .then(() => client.end())
    .then(() => console.log("Photos Loaded\n"))
    .catch(console.error);
};
module.exports = { run };
