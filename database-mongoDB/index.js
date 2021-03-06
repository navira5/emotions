const mongoose = require('mongoose');
require('mongoose-type-url');
const Schema = mongoose.Schema
const db = mongoose.connect('mongodb://localhost/test')
  .then(() => {
    console.log('connected to db!')
  })
  .catch(err => {
    console.log('error while connecting to mongodb', err)
  })

//const db = mongoose.connection;

// db.on('error', function () {
//   console.log('mongoose connection error');
// });

// db.once('open', function () {
//   console.log('mongoose connected successfully');
// });

const toneSchema = new Schema({
  username: { type: String, unique: true },
  entries: Array
  //entry: String,
  //tones: Array
  // tone: {
  //   anger: Number,
  //   fear: Number,
  //   joy: Number,
  //   sadness: Number,
  //   analytical: Number,
  //   confident: Number,
  //   tentative: Number
  // }
});

const Tone = mongoose.model('Tone', toneSchema);

const save = async (username, entry, tone) => {

  Tone.find({ username })
    .then(user => {
      console.log('user in save', user)
      if (user.length) {
        user[0].entries.push({ entry, tone })
        user[0].save()
        .then(resp => {
          res.send(resp)
        })
        .catch(err => {
          res.status(500).send(err);
        })
      } else {
        console.log('trying to create a new entry')
        return Tone.create({ username, entries: [{ entry, tone }] });
      }
    })
}

const findByUser = function (user) {
  return Tone.findOne({ username: user })
}

const selectAll = function (callback) {
  Tone.find({}, function (err, items) {
    if (err) {
      callback(err, null);
    } else {
      callback(null, items);
    }
  });
};

module.exports.selectAll = selectAll;
module.exports.findByUser = findByUser;
module.exports.save = save;