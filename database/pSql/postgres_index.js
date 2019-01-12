const { Pool } = require('pg');
const psqlConfig = require('./config.js');

const pool = new Pool(psqlConfig);

pool.connect()
  .then((client) => {
    console.log('connected to Postgres');
  })
  .catch((err) => {
    console.log(err);
  });

module.exports = {
  query: (text, params, callback) => {
    return pool.query(text, params, callback);
  },
};
