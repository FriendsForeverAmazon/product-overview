const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Mightymang0',
  database: 'product_overview',
});

connection.connect();


const saveProductRecord = (arrayRecord) => {
  const query = `INSERT INTO products 
  (product_title, vendor_name, review_average, review_count, answered_questions,
  list_price, discount, price, prime, description) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  connection.query(query, arrayRecord, (err) => {
    if (err) {
      throw (err);
    } else {
      console.log('success');
    }
  });
};

const savePhotoRecord = (url, productId, mainPhotoBool) => {
  const query = `INSERT INTO photos (url, product_id, main_photo) 
  VALUES ('${url}', ${productId}, ${mainPhotoBool});`;
  connection.query(query, (err) => {
    if (err) {
      throw (err);
    } else {
      console.log('success');
    }
  });
};

const getPhotos = (req, res) => {
  const productId = req.params.productId;
  const query = `SELECT * FROM PHOTOS WHERE product_id = ${productId};`;
  connection.query(query, (err, photos) => {
    if (err) {
      res.statusCode(500).send();
    } else {
      res.send(photos);
    }
  });
};

const getProduct = (req, res) => {
  const id = req.params.productId;
  const query = `SELECT * FROM products WHERE id = ${id};`;
  connection.query(query, (err, data) => {
    if (err) {
      res.statusCode(500).send();
    } else {
      res.send(data);
    }
  });
};


module.exports = {
  saveProductRecord,
  savePhotoRecord,
  getPhotos,
  getProduct,
};