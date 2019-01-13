const mongoDB = require('./mongo_index');

function selectProductMongoDB(id, callback) {
  mongoDB.Products.find({ 'id': id }, callback);
}

function selectPhotosMongoDB(id, callback) {
  mongoDB.Photos.find({ 'id': id }, callback);
}

function insertProductMongoDB(values, callback) {
  mongoDB.Products.insertOne(values, callback);
}

function insertPhotosMongoDB(values, callback) {
  mongoDB.Photos.insertOne(values, callback);
}

function updateProductMongoDB(values, callback) {
  mongoDB.Products.updateMany({ 'id': values.id }, values, callback);
}

function updatePhotosMongoDB(values, callback) {
  mongoDB.Photos.updateMany({ 'id': values.id }, values, callback);
}

function deleteProductMongoDB(id, callback) {
  mongoDB.Products.deleteMany({ 'id': id }, callback);
}

function deletePhotosMongoDB(id, callback) {
  mongoDB.Photos.deleteMany({ 'id': id }, callback);
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
