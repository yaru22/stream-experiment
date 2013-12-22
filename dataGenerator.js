'use strict';

var _        = require('lodash');
var async    = require('async');
var mongoose = require('mongoose');
var Record   = require('./record');

mongoose.connect('mongodb://localhost/experiment');
mongoose.connection.on('open', main);

function main() {
  async.eachSeries(_.range(0, 10000), function (i, done) {
    console.log('Saving record #' + i);
    var record = new Record({
      recordStr: 'Test record string. Hello world. ' + i,
      recordStrArr: _.range(0, 1000).map(function (num) {
        return 'String Array ' + num;
      }),
      recordNumArr: _.range(0, 1000)
    });
    record.save(done);
  }, function (err) {
    if (err) {
      console.error(err);
    }
    mongoose.disconnect();
  });
}
