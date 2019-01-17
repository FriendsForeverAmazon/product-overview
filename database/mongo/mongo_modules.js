const mongoDB = require('./mongo_index');

function selectProductMongoDB(values, callback) {
  mongoDB.Products.find({ _id: values }, callback);
}

function selectPhotosMongoDB(values, callback) {
  // aggregate operation performe a seq of operations on order
  mongoDB.Photos.aggregate([
    {
      // match is a search where filter on a condition or an array of conditions
      $match:
      {
        product_id: Number(values),
      },
    },
    {
      // lookup is a join operation
      $lookup:
        {
          from: 'photosURL',
          localField: 'photos_url',
          foreignField: 'id',
          as: 'url',
        },
    },
    {
      // replaceRoot will merge the result object from lookup as named url prevoisly
      // to the base level
      $replaceRoot: { newRoot: { $mergeObjects: [{ $arrayElemAt: ['$url', 0] }, '$$ROOT'] } },
    },
    {
      // project will delete the url object from the root level since we used replaceRoot
      // to put the keys and value in the root level
      $project: { url: 0 },
    },
  ], callback);
}

function insertProductMongoDB(values, callback) {
  const product = new mongoDB.Products({
    product_title: values.product_title || '',
    vendor_name: values.vendor_name || '',
    review_average: values.review_average || 0,
    review_count: values.review_count || 0,
    answered_questions: values.answered_questions || 0,
    list_price: values.list_price || '',
    discount: values.discount || '',
    price: values.price || '',
    prime: values.prime || 0,
    description: values.description || '',
  });
  product.save(callback);
}

function insertPhotosMongoDB(values, callback) {
  const photo = new mongoDB.Photos({
    main_url: values.main_url || '',
    zoom_url: values.zoom_url || '',
    product_id: values.product_id || 0,
    main_photo: values.main_photo || 0,
  });
  photo.save(callback);
}

function updateProductMongoDB(values, callback) {
  mongoDB.Products.updateMany({ _id: values.id }, values, callback);
}

function updatePhotosMongoDB(values, callback) {
  mongoDB.Photos.updateMany({ _id: values.id }, values, callback);
}

function deleteProductMongoDB(values, callback) {
  mongoDB.Products.deleteMany({ _id: values }, callback);
}

function deletePhotosMongoDB(values, callback) {
  mongoDB.Photos.deleteMany({ _id: values }, callback);
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
