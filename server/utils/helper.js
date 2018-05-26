const Request = require('request');
const Config = require('../config.js');
const ToneAnalyzerV3 = require('watson-developer-cloud/tone-analyzer/v3');
require('dotenv').config()

console.log('my heeeeeelper');

const watson = (entry) => {
  console.log('----------------', entry);
  var toneAnalyzer = new ToneAnalyzerV3({
    version: '2017-09-21',
    username: process.env.TONE_ANALYZER_USERNAME,
    password: process.env.TONE_ANALYZER_PASSOWRD,
    url: 'https://gateway-fra.watsonplatform.net/tone-analyzer/api',
  });

  var toneParams = {
    'tone_input': { 'text': entry },
    'content_type': 'application/json'
  };

  toneAnalyzer.tone(toneParams, function (error, analysis) {
    if (error) {
      console.log(error);
    } else {
      console.log(JSON.stringify(analysis, null, 2));
    }
  }); 0;
}

module.exports.watson = watson;

// const getTone = (entry) => {
//   var tone_analyzer = new ToneAnalyzerV3({
//     username: process.env.TONE_ANALYZER_USERNAME,
//     password: process.env.TONE_ANALYZER_PASSOWRD,
//     version_date: '2017-09-21'
//   });

//   var toneParams = {
//     'tone_input': { 'text': entry },
//     'content_type': 'application/json'
//   };

//   return new Promise((resolve, reject) => {
//     tone_analyzer.tone(params, function (error, response) {
//       if (error) {
//         reject(Error(error));
//       } else {
//         resolve(response);
//       }
//     });

//   });

// };

// module.exports = getTone;




