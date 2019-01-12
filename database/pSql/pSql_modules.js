const pSql = require('./postgres_index');

function insertProductPSql(values, callback) {
  console.log(values);
}

function insertPhotosPSql(values, callback) {
  for (let i = 0; i < values.length; i++) {
    const array = [values[i].main_url, values[i].zoom_url, values[i].product_id, values[i].main_photo];
    pSql.query('INSERT INTO photos (main_url, zoom_url, product_id, main_photo) VALUES ($1, $2, $3, $4)', array, callback);
  }
}

module.exports = {
  pSql: {
    insertProduct: insertProductPSql,
    insertPhoto: insertPhotosPSql,
  },
};
