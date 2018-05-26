const express = require('express');
const parser = require('body-parser');
const db = require('../database-mysql');
const helper = require('./utils/helper.js');

var app = express();
app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/../react-client/dist'));
console.log('WHAT UP HAILEY', helper.watson);


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
  const body = req.body;
  console.log(helper);
  helper.watson(body)
  .then((analysis) => res.json(tones))
  .catch((err) => {
    console.error(err);
    reject(Error(err));
  })
  
});


app.listen(3000, function() {
  console.log('listening on port 3000!');
});

