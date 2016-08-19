var express = require('express');
var bodyParder = require('body-parser');
var path = require('path');

var queryID = require('./queryID.js');
var queryScore = require('./queryScore.js');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.engine('.html', require('ejs').__express);
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParder());

app.get('/', function (req, res) {
     res.render('index');
});

app.get('/queryScore', function (req, res) {
    res.render('query');
});

app.post('/query', function (req, res) {
    var name = req.body.name;
    var examroom = req.body.examroom;
    var type = req.body.type;
    if (examroom) {
        while(examroom.length<3){
            examroom = '0' + examroom;
        }
        examroom = examroom.substring(0,3);
    }
    if (!name) {
        res.render('err');
    }
    queryID(type, name, examroom, res);
});

app.post('/queryScore', function (req, res) {
    var name = req.body.name;
    var id = req.body.id;
    if (!name || !id) {
        res.render('err');
    }
    name = name.substring(0,name.length>2?2:name.length);
    if (id.length === 16) {
        id = id.substring(0,12) + id.substring(13,16);
    }
    queryScore(id, name, res);
});

app.listen(4767, function (req, res) {
    console.log('app is running at port 4767');
});