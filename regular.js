'use strict';

var fs       = require('fs');
var memwatch = require('memwatch');
var mongoose = require('mongoose');
var Record   = require('./record');

memwatch.on('stats', console.log.bind(console, 'Stats:'));

mongoose.connect('mongodb://localhost/experiment');
mongoose.connection.on('open', main);

function main() {
  Record.find({}, null, { limit: 1000 }, function (err, records) {
    fs.writeFileSync('./output.txt', records);
    mongoose.disconnect();
  });
}
