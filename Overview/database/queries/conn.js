const { DBCONFIG } = require("../../config/config.js");

const { Pool } = require("pg");

const pool = new Pool(DBCONFIG);

module.exports.pool = pool;
