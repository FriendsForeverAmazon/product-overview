const { Pool } = require('pg');
const psqlConfig = require('./config.js');

const pool = new Pool(psqlConfig);

pool.connect()
  .then((client) => {
    return client.query('SELECT * FROM users WHERE id = $1', [1])
      .then((res) => {
        client.release();
        console.log(res.rows[0]);
      })
      .catch((err) => {
        client.release();
        console.log(err.stack);
      });
  });

module.exports = {
  query: (text, params, callback) => {
    return pool.query(text, params, callback);
  },
};
