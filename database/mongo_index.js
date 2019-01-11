const mongoose = require('mongoose');

const DB_HOST = process.env.DB_HOST || 'localhost';
mongoose.connect(`mongodb://${DB_HOST}:27017/amazon`);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('connected to MongoDB');
});

const productsSchema = new mongoose.Schema({
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
  main_url: { type: String, required: true },
  zoom_url: { type: String, required: true },
  product_id: Number,
  main_photo: { type: Number, required: true },
});

const Products = mongoose.model('Products', productsSchema);
const Photos = mongoose.model('Photos', photosSchema);

module.exports = { Products, Photos };

