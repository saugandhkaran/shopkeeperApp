var express = require('express');
var Expressapp = express();
var mobileRoutes = express.Router();
var Datastore = require('nedb');
const {app} = require('electron');

const db = new Datastore({
  filename: `${process.env.NODE_ENV === 'dev' ? '.' : app.getAppPath('Desktop')}/data/datafile`,
  // filename: 'datafile',
  autoload: true
});

// Defined store route - done
mobileRoutes.route('/register').post(function (req, res) {
  const mobileData = req.body;
  db.insert(mobileData, function (err, item) {
    if (err) {
      res.status(400).send("unable to save to database");
    } else {
      res.status(200).json({'mobile': 'mobile details added successfully', 'id': item._id});
    }
  })
});

// Defined get data(index or listing) route - done
mobileRoutes.route('/').get(function (req, res) {
  db.find( {}, function (err, mobileData){
    if(err){
      console.log(err);
    }
    else {
      console.log(mobileData);
      res.json(mobileData);
    }
  });
});

// Defined edit route - done
mobileRoutes.route('/edit/:id').get(function (req, res) {
  var id = req.params.id;
  Mobile.findOne({ _id: id }, function (err, mobileData){
      res.json(mobileData);
  });
});

//  Defined update route
mobileRoutes.route('/update/:id').post(function (req, res) {
  db.update({ _id: req.params.id }, { $set: { status: req.body.status } }, function (err, success) {
    if (err) {
      res.status(400).send("unable to update the database");
    } else {
      res.status(200).json({msg:'Update completed', id: success._id});
    }
  })
});

mobileRoutes.route('/:id').get(function(req, res) {
  db.find({_id: req.params.id}, function(err, mobileData) {
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
