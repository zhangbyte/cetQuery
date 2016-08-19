var superagent = require('superagent');

// module.exports = function (id, name) {
    
// }

var URL = 'http://www.chsi.com.cn/cet/';
var URL_Q = 'http://www.chsi.com.cn/cet/query';
var id = '320100152107021';
var name = '张祯杰';

superagent.get(URL)
    .end(function (err, res) {
        // var cookie = res.header['set-cookie'];
        // cookie[0] = cookie[0].substring(0, cookie[0].indexOf(';')+1);
        // cookie[0] = cookie[0] + ' __utmt=1; __utma=65168252.83041665.1471246241.1471345518.1471396812.3; __utmb=65168252.1.10.1471396812; __utmc=65168252; __utmz=65168252.1471246241.1.1.utmcsr=(direct)|utmccn=(direct)|utmcmd=(none)';

        // console.log(cookie);
        param = {
            zkzh: '320100152107021',
            xm: '张祯杰'
        };
        superagent.get(URL_Q)
            // .set('Cookie', cookie)
            .set('Referer', 'http://www.chsi.com.cn')
            .query(param)
            .end(function(err, res){
                console.log(res.text);
            });
        // superagent.get('http://www.chsi.com.cn/cet/query?zkzh=320100152107021&xm=张祯杰')
        //     .set('Cookie', cookie)
        //     .end(function (err, res) {
        //         console.log(res.text);
        //     })
    });