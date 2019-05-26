var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Define collection and schema for Items
var mobile = new Schema({
  name: {
    type: String
  },
  imei: {
    type: String
  },
  contact: {
    type: Number
  },
  accessories: {
    type: String
  },
  issue: {
    type: String
  },
  status: {
    type: String
  },
  rate: {
    type: Number
  },
  date: {
    type: Date
  },
  return: {
    type: Date
  }
},{
    collection: 'mobile'
});

module.exports = mongoose.model('mobile', mobile);
