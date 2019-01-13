const mongoose = require('mongoose');
const productsAutoIncrement = require('mongodb-autoincrement');
const photosAutoIncrement = require('mongodb-autoincrement');

productsAutoIncrement.setDefaults({
  // collection: collectionName, // collection name for counters, default: counters
  // default: 'id', // auto increment field name, default: _id
  step: 1, // auto increment step
});

photosAutoIncrement.setDefaults({
  // collection: collectionName, // collection name for counters, default: counters
  // default: 'id', // auto increment field name, default: _id
  step: 1, // auto increment step
});

//  You cannot set initial values for auto increment fields by the module.
//  If you need it you can always set them directly via mongodb.
//  Find a record with _id 'collectionName' in the collection 'counters' and
//  set field 'seq' to required value.

const DB_HOST = process.env.DB_HOST || 'localhost';
mongoose.connect(`mongodb://${DB_HOST}:27017/amazon`);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('connected to MongoDB');
});

const productsSchema = new mongoose.Schema({
  id: Number,
  product_title: { type: String, required: true },
  vendor_name: { type: String, required: true },
  review_average: Number,
  review_count: { type: Number, default: 0 },
  answered_questions: Number,
  list_price: { type: String, required: true },
  discount: String,
  price: { type: String, required: true },
  prime: { type: String, required: true },
  description: String,
});

const photosSchema = new mongoose.Schema({
  id: Number,
  main_url: { type: String, required: true },
  zoom_url: { type: String, required: true },
  product_id: Number,
  main_photo: { type: Number, required: true },
});

// productsSchema.createIndex({ id: 1 }, { unique: true });
// photosSchema.createIndex({ id: 1 }, { unique: true });

productsSchema.plugin(productsAutoIncrement.mongoosePlugin);
photosSchema.plugin(photosAutoIncrement.mongoosePlugin);

const Products = mongoose.model('Products', productsSchema);
const Photos = mongoose.model('Photos', photosSchema);

module.exports = { Products, Photos };
