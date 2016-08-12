var express = require('express');
var bodyParder = require('body-parser');
var path = require('path');

var queryID = require('./queryID.js');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.engine('.html', require('ejs').__express);
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParder());

app.get('/', function (req, res) {
     res.render('index');
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
})

app.listen(4767, function (req, res) {
    console.log('app is running at port 4767');
});