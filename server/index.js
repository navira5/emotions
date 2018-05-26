const express = require('express');
const parser = require('body-parser');
const db = require('../database-mysql');
const helper = require('./utils/helper.js');
const PORT = process.env.PORT || 3000;

var app = express();
app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/../react-client/dist'));

app.get('/entry', function (req, res) {
  db.selectAll(function (err, data) {
    if (err) {
      res.sendStatus(500);
    } else {
      res.json(data);
    }
  });
});

app.post('/entry', function (req, res) {
  const body = req.body.entry;
  console.log(helper);
  helper.watson(body)
  .then((analysis) => console.log(analysis))
  .catch((err) => {
    console.error(err);
    reject(Error(err));
  })
  
});


app.listen(PORT, function() {
  console.log('listening on port: ', PORT);
});

