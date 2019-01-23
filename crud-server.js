const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const { pSql } = require('./database/pSql/pSql_modules');
const { mongoDB } = require('./database/mongo/mongo_modules');
const redis = require('./database/redis-5.0.3/redis');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// for express remove encryption to speed up the process
app.disable('etag').disable('x-powered-by');
app.use('/:productId', express.static(path.join(__dirname, './client/dist/')));
app.use(express.static(path.join(__dirname, './client/dist/')));

app.get('/updateID', (req, res) => {
  mongoDB.updateID((err, data) => {
    if (err) {
      res.status(501).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});

app.get('/products/:productId', (req, res) => {
  redis.get('product:' + req.params.productId, (error, result) => {
    if (error || result === null) {
      pSql.selectProduct(req.params.productId, (err, data) => {
        if (err) {
          res.status(501).send(err);
        } else {
          redis.set('product:' + req.params.productId, JSON.stringify(data));
          res.status(201).send(data);
        }
      });
    } else {
      res.status(201).send(JSON.parse(result));
    }
  });
});
app.get('/photos/:photosId', (req, res) => {
  redis.get('photos:' + req.params.photosId, (error, result) => {
    if (error || result === null) {
      mongoDB.selectPhotos(req.params.photosId, (err, data) => {
        if (err) {
          res.status(501).send(err);
        } else {
          redis.set('photos:' + req.params.photosId, JSON.stringify(data));
          res.status(201).send(data);
        }
      });
    } else {
      res.status(201).send(JSON.parse(result));
    }
  });
});

app.post('/products', (req, res) => {
  pSql.insertProduct(req.body, (err, data) => {
    if (err) {
      res.status(501).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});
app.post('/photos', (req, res) => {
  mongoDB.insertPhoto(req.body, (err, data) => {
    if (err) {
      res.status(501).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});

app.put('/products', (req, res) => {
  pSql.updateProduct(req.body, (err, data) => {
    if (err) {
      res.status(501).send(err);
    } else {
      res.status(202).send(data);
    }
  });
});
app.put('/photos', (req, res) => {
  mongoDB.updatePhoto(req.body, (err, data) => {
    if (err) {
      res.status(501).send(err);
    } else {
      res.status(202).send(data);
    }
  });
});

app.delete('/products/:productId', (req, res) => {
  pSql.deleteProduct(req.params.productId, (err, data) => {
    if (err) {
      res.status(501).send(err);
    } else {
      res.status(203).send(data);
    }
  });
});
app.delete('/photos/:productId', (req, res) => {
  mongoDB.deletePhotos(req.params.productId, (err, data) => {
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
