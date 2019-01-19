const mongoose = require('mongoose');
const productsAutoIncrement = require('mongoose-auto-increment');
const photosAutoIncrement = require('mongoose-auto-increment');
const photosURLAutoIncrement = require('mongoose-auto-increment');

const DB_HOST = process.env.DB_HOST || 'localhost';
mongoose.connect(`mongodb://${DB_HOST}:27017/amazon`, {
  useCreateIndex: true,
  useNewUrlParser: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('connected to MongoDB');
});


productsAutoIncrement.initialize(db);
photosAutoIncrement.initialize(db);
photosURLAutoIncrement.initialize(db);


const productsSchema = new mongoose.Schema({
  product_title: { type: String, required: true },
  vendor_name: { type: String, required: true },
  review_average: Number,
  review_count: { type: Number, default: 0 },
  answered_questions: Number,
  list_price: { type: String, required: true },
  discount: String,
  price: { type: String, required: true },
  prime: { type: Number, required: true },
  description: String,
});

const photosSchema = new mongoose.Schema({
  photos_url: { type: Number, required: true },
  product_id: Number,
  main_photo: { type: Number, required: true },
});

const photosURLSchema = new mongoose.Schema({
  main_url: { type: Number, required: true },
  zoom_url: { type: Number, required: true },
});


productsSchema.plugin(productsAutoIncrement.plugin, {
  model: 'Products',
  field: '_id',
  startAt: 1,
  incrementBy: 1,
});
photosSchema.plugin(photosAutoIncrement.plugin, {
  model: 'Photos',
  field: '_id',
  startAt: 1,
  incrementBy: 1,
});
photosURLSchema.plugin(photosAutoIncrement.plugin, {
  model: 'PhotosURL',
  field: '_id',
  startAt: 1,
  incrementBy: 1,
});


const Products = mongoose.model('Products', productsSchema);
const Photos = mongoose.model('Photos', photosSchema);
const PhotosURL = mongoose.model('PhotosURL', photosURLSchema);

module.exports = { Products, Photos, PhotosURL };
