const express = require('express');
const pSql = require('./pSql/pSql_modules');
const mongoDB = require('./mongo/mongo_modules');

const app = express();
const PORT = 3000;


app.get('/photos/:productId', (req, res) => {
  res.status(201).send('under constuction');
});
app.get('/products/:productId', (req, res) => {
  res.status(201).send('under constuction');
});

app.post('/photos/:productId', (req, res) => {
  res.status(201).send('under constuction');
});
app.post('/products/:productId', (req, res) => {
  res.status(201).send('under constuction');
});

app.put('/photos/:productId', (req, res) => {
  res.status(201).send('under constuction');
});
app.put('/products/:productId', (req, res) => {
  res.status(201).send('under constuction');
});

app.delete('/photos/:productId', (req, res) => {
  res.status(201).send('under constuction');
});
app.delete('/products/:productId', (req, res) => {
  res.status(201).send('under constuction');
});


app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
