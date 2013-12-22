'use strict';

var mongoose = require('mongoose');

// Schema
var recordSchema = new mongoose.Schema({
  recordStr: String,
  recordStrArr: [String],
  recordNumArr: [Number]
});

// Model
var Record = mongoose.model('Record', recordSchema);

// Public API
exports = module.exports = Record;
