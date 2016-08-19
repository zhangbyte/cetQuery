var superagent = require('superagent');
var iconv = require('iconv-lite');
var URL = 'http://cet.99sushe.com/';
var URL_Q = 'http://cet.99sushe.com/getscore';

module.exports = function (id, name, finalRes) {

    var data = 'id=' + id + '&name=' + name;
    data = iconv.encode(data, 'gbk');

    superagent.post(URL_Q + id)
        .set('Referer', URL)
        .set('Content-Type', 'application/octet-stream')
        .send(data)
        .end(function(err, res){
            var resstr = res.text;
            if (resstr[0] === '6') {
                var scores = resstr.split(',');
                finalRes.render('result_2', {score_1: scores[1], score_2: scores[2], score_3: scores[3], score: scores[4],});
            } else {
                finalRes.render('err');
            }
        });
}