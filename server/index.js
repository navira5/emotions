const express = require('express');
const parser = require('body-parser');
//const db = require('../database-mysql');
const db = require('../database-mongoDB');
const helper = require('./utils/helper.js');
const PORT = process.env.PORT || 3000;

var app = express();
app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/../react-client/dist'));
app.use(express.static(__dirname + '/../node-js-getting-started/public'));

app.get('/items/:user', (req, res) => {
  console.log('all items', req.params.user)
  if (!req.params.user) {
    res.status(400).send('User not specified')
    res.end()
  }
  db.findByUser(req.params.user)
    .then(user => {
      console.log('user found', user)
      res.send(user)
    })
    .catch(err => {
      res.status(500).send(err)
    })
})

console.log('db object', db)
app.post('/entry', function (req, res) {
  const { entry:body, user } = req.body;
  
  const cb = async (error, analysis) => {
    
    if(error) {
      res.status(500).send(error)
      res.end()
    }

    try {
      var tones = analysis.document_tone.tones;
      const result = await db.save(user, body, tones)
      res.status(201).send({result, tones});        
    } catch (error) {
      res.status(500).send(error)
    }
  }

  helper.watson(body, cb)

  
});


app.listen(PORT, function() {
  console.log('listening on port: ', PORT);
});

