var express = require('express');
var open = require('open');

var app = express();
var bodyParser = require('body-parser');

var port = process.env.PORT || 3000;

var courseRouter = express.Router();

var courses = require('./courses');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(`/api`, courseRouter);

// Adding CORS support
app.all('*', function (req, res, next) {
  // Set CORS headers: allow all origins, methods, and headers:
  // you may want to lock this down in a production environment
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, PATCH, POST, DELETE');
  res.header('Access-Control-Allow-Headers', req.header('access-control-request-headers'));

  if (req.method === 'OPTIONS') {
    // CORS Preflight
    res.send();
  } else {
    next();
  }
});

courseRouter.route(`/courses`)
    .get(courses.findAll)
    .post(function(req, res, next) {
        if (req.body.length === 0 || req.body.length === undefined) {
            console.log(`request body not found`);
            return res.sendStatus(400);
        } else {
            // console.log(req.body);
            courses.saveCourse(req);
            res.status(201).send(courses.saveCourse);
        }
    })

courseRouter.route(`/courses/:id`)
    .get(courses.findById);    

app.get('/', function(req, res) {
    res.send(`welcome to my API!`);
});

app.listen(port, function(err) {
    if (err) {
        console.log(err);
    } else {
        open(`http://localhost:${port}`)
    }
});