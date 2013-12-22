'use strict';

var fs       = require('fs');
var memwatch = require('memwatch');
var mongoose = require('mongoose');
var through  = require('through');
var Record   = require('./record');

memwatch.on('stats', console.log.bind(console, 'Stats:'));

mongoose.connect('mongodb://localhost/experiment');
mongoose.connection.on('open', main);

function main() {
  var file = fs.createWriteStream('./output.txt');
  var stream = Record
      .find({}, null, { limit: 1000 })
      .stream();

  stream.pipe(through(function (record) {
    this.queue(record.toString());
  })).pipe(file);

  stream.on('close', function () {
    file.end();
    mongoose.disconnect();
  });
}
