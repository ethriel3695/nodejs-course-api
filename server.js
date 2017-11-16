var express = require('express');
var open = require('open');

var app = express();

var port = process.env.PORT || 3000;

var courseRouter = express.Router();

courseRouter.route(`/Courses`)
    .get(function(req, res) {
        var responseJson = {hello: "This is my api"};

        res.json(responseJson);
    });

app.use(`/api`, courseRouter);

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