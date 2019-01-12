const pSql = require('./postgres_index');

function selectProductPSql(id, callback) {
  pSql.query('SELECT * FROM products WHERE id = ($1)', [id], callback);
}

function selectPhotosPSql(id, callback) {
  pSql.query('SELECT * FROM photos WHERE id = ($1)', [id], callback);
}

function insertProductPSql(values, callback) {
  const array = [values.product_title || '', values.vendor_name || '', values.review_average || 0,
    values.review_count || 0, values.answered_questions || 0, values.list_price || '', values.discount || '',
    values.price || '', values.prime || 0, values.description || ''];
  pSql.query('INSERT INTO products (product_title, vendor_name, review_average, review_count, answered_questions, list_price, discount, price, prime, description) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)', array, callback);
}

function insertPhotosPSql(values, callback) {
  const array = [values.main_url || '', values.zoom_url || '', values.product_id || 0, values.main_photo || 0];
  pSql.query('INSERT INTO photos (main_url, zoom_url, product_id, main_photo) VALUES ($1, $2, $3, $4)', array, callback);
}

function updateProductPSql(values, callback) {
  const array = [values.id || 0, values.product_title || '', values.vendor_name || '', values.review_average || 0,
    values.review_count || 0, values.answered_questions || 0, values.list_price || '', values.discount || '',
    values.price || '', values.prime || 0, values.description || ''];
  if (array[0] !== 0) {
    pSql.query('UPDATE products SET product_title = ($2), vendor_name = ($3), review_average = ($4), review_count = ($5), answered_questions = ($6), list_price = ($7), discount = ($8), price = ($9), prime = ($10), description = ($11) WHERE id = ($1)', array, callback);
  }
}

function updatePhotosPSql(values, callback) {
  const array = [values.id || 0, values.main_url || '', values.zoom_url || '', values.product_id || 0, values.main_photo || 0];
  if (array[0] !== 0) {
    pSql.query('UPDATE photos SET main_url = ($2), zoom_url = ($3), product_id = ($4), main_photo = ($5) WHERE id = ($1)', array, callback);
  }
}

function deleteProductPSql(id, callback) {
  pSql.query('DELETE FROM products WHERE id = ($1)', [id], callback);
}

function deletePhotosPSql(id, callback) {
  pSql.query('DELETE FROM photos WHERE id = ($1)', [id], callback);
}

module.exports = {
  pSql: {
    selectProduct: selectProductPSql,
    selectPhotos: selectPhotosPSql,
    insertProduct: insertProductPSql,
    insertPhoto: insertPhotosPSql,
    updateProduct: updateProductPSql,
    updatePhoto: updatePhotosPSql,
    deleteProduct: deleteProductPSql,
    deletePhotos: deletePhotosPSql,

  },
};
