'use strict';

var fs = require('fs');

var data = fs.readFileSync('./config.json'),
    values;

try {
  values = JSON.parse(data);
  console.dir(values);
}
catch (err) {
  console.log('There has been an error parsing your JSON.');
  console.log(err);
}

//Exports
module.exports = values;
