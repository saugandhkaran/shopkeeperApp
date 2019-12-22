var express = require('express');
var Expressapp = express();
var mobileRoutes = express.Router();
var Datastore = require('nedb'); 
var mobileData = '';
const {app} = require('electron');

const db = new Datastore({
  filename: `${process.env.NODE_ENV === 'dev' ? '.' : app.getAppPath('Desktop')}/data/datafile`,
  // filename: 'datafile',
  autoload: true
});

const indexFinder = new Datastore({
  filename: `${process.env.NODE_ENV === 'dev' ? '.' : app.getAppPath('Desktop')}/data/indexFinder`,
  // filename: 'indexMaker',
  autoload: true
})

// Defined store route - done
mobileRoutes.route('/register').post(function (req, res, next) {
  mobileData = { ...req.body };
  indexFinder.find({}, function (err, index) {
    if (index.length == 0) {
      mobileData.slno = 1;
      indexFinder.insert({ index: 1 }, function (err, succ) {
        if (err) {
          console.log('index insert err', err);
        } else {
          next();
        }
      })
    } else {
      mobileData.slno = index[0].index + 1;
      next();
    }
  })
}, function (req, res, next) {
  db.insert(mobileData, function (err, item) {
    indexFinder.update({}, { $set: { index: mobileData.slno } }, {},
      function (err, succ) {
        if (err) {
          console.log('Failed to increase index', err);
        } else {
          console.log('success index', succ);
      }
    })
    if (err) {
      res.status(400).send("unable to save to database");
    } else {
      res.status(200).json({'mobile': 'mobile details added successfully', 'id': item._id});
    }
  })
});
  

// Defined get data(index or listing) route - done
mobileRoutes.route('/').get(function (req, res) {
  db.find( {}, function (err, data){
    if(err){
      console.log(err);
    }
    else {
      res.json(data);
    }
  });
});

// Defined edit route - done
mobileRoutes.route('/edit/:id').get(function (req, res) {
  var id = req.params.id;
  Mobile.findOne({ _id: id }, function (err, data){
      res.json(data);
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
  db.find({_id: req.params.id}, function(err, data) {
    if(!data){
      res.status(400);
      res.json({
        success: false,
        error: 'Invalid Id / Id not found'
      })
      res.end()
      return
    }
    else {
      res.json(data);
    }
  })
})


// Defined delete | remove | destroy route
mobileRoutes.route('/delete/:id').get(function (req, res) {
  Mobile.findByIdAndRemove({_id: req.params.id}, function(err, data){
        if(err) res.json(err);
        else res.json('Successfully removed');
    });
});

module.exports = mobileRoutes;
