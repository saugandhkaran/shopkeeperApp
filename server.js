var express = require('express'),
  app = express(),
  port = process.env.PORT || 4000,
  mongoose = require('mongoose'),
  Task = require('./api/models/mobileEntryModel'), //created model loading here
  bodyParser = require('body-parser');

//for CORS
app.use(function(req, res, next) {
 res.header("Access-Control-Allow-Origin", "http://localhost:3000");
 res.header("Access-Control-Allow-Credentials", "true");
 res.header("Access-Control-Allow-Headers", "Origin,Content-Type, Authorization, x-id, Content-Length, X-Requested-With");
 res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
 next(); });

// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/mobileServiceDB',{
  useMongoClient : true
});


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var routes = require('./api/routes/routes'); //importing route
routes(app); //register the route


app.listen(port);

app.use(function(req, res) {
  res.status(404).send({url: req.originalUrl + ' not found'})
});


console.log('todo list RESTful API server started on: ' + port);
