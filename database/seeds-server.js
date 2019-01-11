const express = require('express');
const { pSql, mongoDB } = require('./db_modules');
const sampleData = require('./sampleData');

const app = express();
const PORT = 3000;

app.get('/seed/mongo/photos', (req, res) => {
  mongoDB.insertPhoto(sampleData);
  res.status(201).send('seeded the database');
});

app.get('/seed/psql/photos', (req, res) => {
  pSql.insertPhoto(sampleData);
  res.status(201).send('seeded the database');
});


app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
