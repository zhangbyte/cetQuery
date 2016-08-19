var iconv = require('iconv-lite');
var changeKey = require('./changeKey.js');
var xor = require('./util.js').xor;

module.exports = function (postData, flag) {
  var KEY1 = '31323179';
  var KEY2 = '4F37643D';
  var postHex = postData;
  if (flag === 1) {
    KEY1 = '51676864';
    KEY2 = '573B4F3B';
    postHex = iconv.encode(postData, 'gbk').toString('hex');
  }

  var len = parseInt(postHex.length/16);
  var over = postHex.length%16;
  var tmpkey1 = KEY1;
  var tmpkey2 = KEY2;
  var tmpHex1 = KEY1;
  var tmpHex2 = KEY2;
  var key1 = '';
  var key2 = '';
  var res = '';
  var keyStr = '';
  for (var i = 0; i < len; i++) {
    if (flag === 1) {
      keyStr = changeKey(tmpkey1, tmpkey2, 1);
    } else {
      keyStr = changeKey(tmpHex1, tmpHex2, 2);
    }
    key1 = '0x'+keyStr.substring(0,8);
    key2 = '0x'+keyStr.substring(8,16);
    tmpHex1 = '0x'+postHex.substring(16*i,16*i+8);
    tmpkey1 = xor(key1, tmpHex1).toString(16);
    tmpHex2 = '0x'+postHex.substring(16*i+8,16*(i+1));
    tmpkey2 = xor(key2, tmpHex2).toString(16);
    while(tmpkey1.length<8){
      tmpkey1 = '0' + tmpkey1;
    }
    while(tmpkey2.length<8){
      tmpkey2 = '0' + tmpkey2;
    }
    res = res + tmpkey1 + tmpkey2;
  };
  if (flag === 1) {
    keyStr = changeKey(tmpkey1, tmpkey2, 1);
  } else {
    keyStr = changeKey(tmpHex1, tmpHex2, 2);
  }
  key1 = '0x'+keyStr.substring(0,8);
  key2 = '0x'+keyStr.substring(8,16);
  if (over > 8) { 
    tmpHex1 = '0x'+postHex.substring(16*i,16*i+8);
    tmpkey1 = xor(key1, tmpHex1).toString(16);
    tmpHex2 = '0x'+postHex.substring(16*i+8,postHex.length);
    tmpkey2 = xor(key2.substring(0,tmpHex2.length), tmpHex2).toString(16);
    while(tmpkey1.length<8){
      tmpkey1 = '0' + tmpkey1;
    }
    while(tmpkey2.length<tmpHex2.length){
      tmpkey2 = '0' + tmpkey2;
    }
    res = res + tmpkey1 + tmpkey2;
  } else {
    tmpHex1 = '0x'+postHex.substring(16*i,postHex.length);
    tmpkey1 = xor(key1.substring(0,tmpHex1.length), tmpHex1).toString(16);
    while(tmpkey1.length<tmpHex1.length){
      tmpkey1 = '0' + tmpkey1;
    }
    res = res + tmpkey1;
  };

  return res;
}