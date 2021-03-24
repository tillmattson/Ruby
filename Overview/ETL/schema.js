const { Pool } = require("pg");
const { DBCONFIG } = require("../config/config.js");

const tables = [
  {
    query: `create table products (id int not null primary key, name text not null, slogan text not null, description text not null, category text not null, default_price real not null);`,
    name: `products`,
  },
  {
    query: `create table features (id int not null primary key, product_id int not null, feature text not null, value text);`,
    name: `features`,
  },
  {
    query: `create table styles (style_id int not null primary key, product_id int not null, name text not null, sale_price real, original_price real not null, default_style boolean);`,
    name: `styles`,
  },
  {
    query: `create table skus (id int not null primary key, style_id int not null, size text not null, quantity int not null);`,
    name: `skus`,
  },
  {
    query: `create table photos (did SERIAL PRIMARY KEY, id int, style_id int not null, url text not null, thumbnail_url text not null);`,
    name: `photos`,
  },
  {
    query: `create table related (id int not null primary key, product_id int not null, related int not null);`,
    name: `related`,
  },
];

const pool = new Pool(DBCONFIG);

const run = () => {
  console.log(`Loading Schema...`);
  return Promise.all(
    tables.map(({ query, name }) =>
      pool.query(query).then(() => console.log(`Created Table: ${name}`))
    )
  )
    .then(() => console.log("Schema complete\n\nStarting load process...\n"))
    .catch(console.error)
    .then(() => pool.end());
};
module.exports = { run };
