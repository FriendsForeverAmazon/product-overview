const express = require('express');
const bodyParser = require('body-parser');
const { pSql } = require('./pSql/pSql_modules');
const { mongoDB } = require('./mongo/mongo_modules');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const db = pSql;

app.get('/products/:productId', (req, res) => {
  db.selectProduct(req.params.productId, (err, data) => {
    if (err) {
      res.status(501).send(err.stack);
    } else {
      res.status(201).send(data.rows[0]);
    }
  });
});
app.get('/photos/:productId', (req, res) => {
  db.selectPhotos(req.params.productId, (err, data) => {
    if (err) {
      res.status(501).send(err.stack);
    } else {
      res.status(201).send(data.rows[0]);
    }
  });
});

app.post('/products', (req, res) => {
  db.insertProduct(req.body, (err, data) => {
    if (err) {
      res.status(501).send(err.stack);
    } else {
      res.status(201).send(data.rows[0]);
    }
  });
});
app.post('/photos', (req, res) => {
  db.insertPhoto(req.body, (err, data) => {
    if (err) {
      res.status(501).send(err.stack);
    } else {
      res.status(201).send(data.rows[0]);
    }
  });
});

app.put('/products', (req, res) => {
  db.updateProduct(req.body, (err, data) => {
    if (err) {
      res.status(501).send(err.stack);
    } else {
      res.status(202).send(data.rows[0]);
    }
  });
});
app.put('/photos', (req, res) => {
  db.updatePhoto(req.body, (err, data) => {
    if (err) {
      res.status(501).send(err.stack);
    } else {
      res.status(202).send(data.rows[0]);
    }
  });
});

app.delete('/products/:productId', (req, res) => {
  db.deleteProduct(req.params.productId, (err, data) => {
    if (err) {
      res.status(501).send(err.stack);
    } else {
      res.status(203).send(data.rows[0]);
    }
  });
});
app.delete('/photos/:productId', (req, res) => {
  db.deletePhotos(req.params.productId, (err, data) => {
    if (err) {
      res.status(501).send(err.stack);
    } else {
      res.status(203).send(data.rows[0]);
    }
  });
});


app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
