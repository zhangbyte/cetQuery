var crypt = require('./crypt.js');
var iconv = require('iconv-lite');
var http = require('http');
var ENCRYPT = 1;
var DECRYPT = 2;
var URL = 'http://find.cet.99sushe.com/search';

module.exports = function (type, name, examroom, finalRes) {
    var postData = 'type=' + type + '&provice=32&school=南京信息工程大学&name=' + name + '&examroom=' + examroom + '&m=';
    var mac = '';
    for (var i = 0; i < 5; i++) {
        mac = mac + Math.ceil(Math.random()*15).toString(16) + Math.ceil(Math.random()*15).toString(16) + '-';
    }
    mac = mac + Math.ceil(Math.random()*15).toString(16) + Math.ceil(Math.random()*15).toString(16);
    postData = postData + mac.toUpperCase();
    var res = crypt(postData, ENCRYPT);
    var buffer = new Buffer(res, 'hex');
    var opt = {
        host:'find.cet.99sushe.com',
        port:80,
        method:'POST',
        path:'/search',
        headers:{
            'Content-Type': 'application/octet-stream',
            'Content-Length': buffer.length
        }
    };
    var id = '';
    var req = http.request(opt, function(res) {
        res.on('data',function(d){
            if (parseInt(d[0]) === 53) {
                var tmp = '';
                for (var i = 2; i < d.length; i++) {
                    tmp = d[i].toString(16);
                    if (tmp.length === 1) {
                        tmp = '0' + tmp; 
                    }
                    id = id + tmp;
                }
                id = crypt(id, DECRYPT);
                buffer = new Buffer(id, 'hex');
                id = buffer.toString();
                finalRes.render('result', {id: id});
            } else {
                finalRes.render('err');
            }
        }).on('end', function(){
        });
    }).on('error', function(e) {
        console.log("Got error: " + e.message);
    });

    req.write(buffer, 'hex'); 
    req.end();
}