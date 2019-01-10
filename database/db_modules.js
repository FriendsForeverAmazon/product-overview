const pSql = require('./postgres_index');
const mongoDB = require('./mongo_index');

function insertProductPSql(values) {
  console.log(values);
}

function insertPhotosPSql(values) {
  for (let i = 0; i < values.length; i++) {
    pSql.query(`INSERT INTO photos (main_url, zoom_url, product_id, main_photo) 
                VALUES ('${values[i].mainUrl}', '${values[i].zoomUrl}', ${values[i].productId}, ${values[i].mainPhotoBool}`);
  }
}

function insertProductMongoDB(values) {
  mongoDB.Products.insertMany(values, (err) => {
    if (err) {
      return console.log(err);
    }
    console.log('succesfully seeded Mongo database with Products');
    mongoDB.Products.connection.close();
  });
}

function insertPhotosMongoDB(values) {
  mongoDB.Photos.insertMany(values, (err) => {
    if (err) {
      return console.log(err);
    }
    console.log('succesfully seeded Mongo database with Photos');
  });
}


module.exports = {
  pSql: {
    insertProduct: insertProductPSql,
    insertPhoto: insertPhotosPSql,
  },
  mongoDB: {
    insertProduct: insertProductMongoDB,
    insertPhoto: insertPhotosMongoDB,
  },
};
