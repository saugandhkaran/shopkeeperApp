var express = require('express');
var app = express();
var mobileRoutes = express.Router();

// Require Item model in our routes module
var Mobile = require('../models/mobile');

// Defined store route
mobileRoutes.route('/register').post(function (req, res) {
  var mobile = new Mobile(req.body);
  mobile.save()
    .then(item => {
    res.status(200).json({'mobile': 'mobile details added successfully', 'id': item._id});
    })
    .catch(err => {
    res.status(400).send("unable to save to database");
    });
});

// Defined get data(index or listing) route
mobileRoutes.route('/').get(function (req, res) {
  Mobile.find(function (err, mobileData){
    if(err){
      console.log(err);
    }
    else {
      res.json(mobileData);
    }
  });
});

// Defined edit route
mobileRoutes.route('/edit/:id').get(function (req, res) {
  var id = req.params.id;
  Mobile.findById(id, function (err, mobileData){
      res.json(mobileData);
  });
});

//  Defined update route
mobileRoutes.route('/update/:id').post(function (req, res) {
  Mobile.findById(req.params.id, function(err, mobileData) {
    if (!mobileData)
      return next(new Error('Could not load Document'));
    else {
      if(req.body.date) {
        mobileData = req.body;
        mobileData.save().then(mobileData => {
          console.log(mobileData);
          res.json({msg: 'Update completed', id: mobileData._id});
      }) .catch(err => {
        res.status(400).send("unable to update the database");
      });
      } else {
        mobileData.status = req.body.status;
        mobileData.save().then(mobileData => {
          res.json({msg:'Update completed', id: mobileData._id});
      }) .catch(err => {
        res.status(400).send("unable to update the database");
      });
      }

    }
  });
});

mobileRoutes.route('/:id').get(function(req, res) {
  Mobile.findById(req.params.id, function(err, mobileData) {
    if(!mobileData){
      res.status(400);
      res.json({
        success: false,
        error: 'Invalid Id / Id not found'
      })
      res.end()
      return
    }
    else {
      res.json(mobileData);
    }
  })
})


// Defined delete | remove | destroy route
mobileRoutes.route('/delete/:id').get(function (req, res) {
  Mobile.findByIdAndRemove({_id: req.params.id}, function(err, mobileData){
        if(err) res.json(err);
        else res.json('Successfully removed');
    });
});

module.exports = mobileRoutes;
