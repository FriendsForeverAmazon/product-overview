const mongoDB = require('./mongo_index');
const ObjectId = require('mongoose').ObjectId;

// function insertProductMongoDB(values, callback) {
//   mongoDB.Products.insertMany(values, (err) => {
//     if (err) {
//       return console.log(err);
//     }
//     mongoDB.Products.connection.close();
//   });
//   callback();
// }

// function insertPhotosMongoDB(values, callback) {
//   mongoDB.Photos.insertMany(values, (err) => {
//     if (err) {
//       return console.log(err);
//     }
//   });
//   callback();
// }


function selectProductMongoDB(id, callback) {
  const objectId = new ObjectId(id);
  mongoDB.Products.find({ _id: objectId }, callback);
}

function selectPhotosMongoDB(id, callback) {
}

function insertProductMongoDB(values, callback) {
}

function insertPhotosMongoDB(values, callback) {
}

function updateProductMongoDB(values, callback) {
}

function updatePhotosMongoDB(values, callback) {
}

function deleteProductMongoDB(id, callback) {
}

function deletePhotosMongoDB(id, callback) {
}


module.exports = {
  mongoDB: {
    selectProduct: selectProductMongoDB,
    selectPhotos: selectPhotosMongoDB,
    insertProduct: insertProductMongoDB,
    insertPhoto: insertPhotosMongoDB,
    updateProduct: updateProductMongoDB,
    updatePhoto: updatePhotosMongoDB,
    deleteProduct: deleteProductMongoDB,
    deletePhotos: deletePhotosMongoDB,

  },
};
