const mongoDB = require('./mongo_index');

function insertProductMongoDB(values, callback) {
  mongoDB.Products.insertMany(values, (err) => {
    if (err) {
      return console.log(err);
    }
    mongoDB.Products.connection.close();
  });
  callback();
}

function insertPhotosMongoDB(values, callback) {
  mongoDB.Photos.insertMany(values, (err) => {
    if (err) {
      return console.log(err);
    }
  });
  callback();
}


module.exports = {
  mongoDB: {
    insertProduct: insertProductMongoDB,
    insertPhoto: insertPhotosMongoDB,
  },
};
