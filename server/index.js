var express = require('express');
var parser = require('body-parser');
var db = require('../database-mysql');


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
  const body = req.body
  console.log(body);
  res.set('Content-Type', 'text/plain')
  res.send(body);
});


app.listen(3000, function() {
  console.log('listening on port 3000!');
});

