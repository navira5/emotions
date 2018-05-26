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

  const cb = function(error, analysis) {
    if(error) {
      console.log("error in post request");
    } else {
      res.sendStatus(201);
      
      var tones = analysis.document_tone.tones;
      console.log('My TOOOOOOONE ', tones);
      //functionToSaveToDB(analysis);
      //res.send(analysis);
      res.end();
    }
    
  }
  helper.watson(body, cb)
  
  // .then((analysis) => {
  //   res.sendStatus(201);
  //   res.end();
  // }).catch((err) => {
  //   console.error(err);
  // })
  
});


app.listen(PORT, function() {
  console.log('listening on port: ', PORT);
});

