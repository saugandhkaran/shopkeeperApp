'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var MobileRegistrationSchema = new Schema({
  customer_name: {
    type: String
  },
  rate: {
    type: String
  },
  customer_imei: {
    type: String,
    required: 'Please add an IMEI number'
  },
  customer_contact: {
    type: String,
    required: 'Please add a contact number'
  },
  accessories: {
    type: String
  },
  reciept_date: {
    type: Date,
    default: Date.now
  },
  delivery_date: {
    type: Date,
    required: 'Please add a return date'
  },
  issue: {
    type: String,
    required: 'Please mention the issues'
  },
  status: {
    type: [{
      type: String,
      enum: ['pending', 'done', 'returned']
    }],
    default: ['pending']
  }
});

/*TaskSchema.methods.addQuestion = function(){
  this.question = "Question for task" + this.name;$sceDelegate
  return this.question;
};*/

module.exports = mongoose.model('MobileEntry', MobileRegistrationSchema);
