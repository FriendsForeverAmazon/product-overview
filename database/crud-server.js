require('newrelic');
const express = require('express');
const bodyParser = require('body-parser');
const { pSql } = require('./pSql/pSql_modules');
const { mongoDB } = require('./mongo/mongo_modules');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let Switch = true;
let db = pSql;

app.get('/switchDatabase', (req, res) => {
  if (Switch) {
    db = mongoDB;
    Switch = !Switch;
    res.status(200).end('Switch to Mongo database');
  } else {
    db = pSql;
    Switch = !Switch;
    res.status(200).end('Switch to Postgres database');
  }
});

app.get('/updateID', (req, res) => {
  db.updateID((err, data) => {
    if (err) {
      res.status(501).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});

app.get('/products/:productId', (req, res) => {
  db.selectProduct(req.params.productId, (err, data) => {
    if (err) {
      res.status(501).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});
app.get('/photos/:productId', (req, res) => {
  db.selectPhotos(req.params.productId, (err, data) => {
    if (err) {
      res.status(501).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});

app.post('/products', (req, res) => {
  db.insertProduct(req.body, (err, data) => {
    if (err) {
      res.status(501).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});
app.post('/photos', (req, res) => {
  db.insertPhoto(req.body, (err, data) => {
    if (err) {
      res.status(501).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});

app.put('/products', (req, res) => {
  db.updateProduct(req.body, (err, data) => {
    if (err) {
      res.status(501).send(err);
    } else {
      res.status(202).send(data);
    }
  });
});
app.put('/photos', (req, res) => {
  db.updatePhoto(req.body, (err, data) => {
    if (err) {
      res.status(501).send(err);
    } else {
      res.status(202).send(data);
    }
  });
});

app.delete('/products/:productId', (req, res) => {
  db.deleteProduct(req.params.productId, (err, data) => {
    if (err) {
      res.status(501).send(err);
    } else {
      res.status(203).send(data);
    }
  });
});
app.delete('/photos/:productId', (req, res) => {
  db.deletePhotos(req.params.productId, (err, data) => {
    if (err) {
      res.status(501).send(err);
    } else {
      res.status(203).send(data);
    }
  });
});


app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
