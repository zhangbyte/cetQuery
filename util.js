//移位，n为移的位数
exports.rol = function (value, n) {
    var v = value.toString(2);
    var len = v.length;
    for (var i = 0; i < 32-len; i++) {
        v = '0' + v;
    };
    v = v.substring(n, 32) + v.substring(0, n);
    return parseInt(v, 2);
}
exports.ror = function (value, n) {
  var v = value.toString(2);
  var len = v.length;
  for (var i = 0; i < 32-len; i++) {
    v = '0' + v;
  };
  v = v.substring(32-n, 32) + v.substring(0, 32-n);
  return parseInt(v, 2);
}
exports.shr = function (value) {
  var v = value.toString(16);
  var len = v.length;
  return parseInt('0x'+v.substring(0,len-4));
}

//异或运算，解决js异或溢出问题
exports.xor = function (a,b){
  a=parseInt(a).toString(2).split('').reverse();
  b=parseInt(b).toString(2).split('').reverse();
  var L=Math.max(a.length,b.length),re=[];
  for(var i=0;i<L;i++){
    re.push(   a[i]&& b[i]?(  a[i]!=b[i]?1:0):( a[i]||b[i] )  );
  }
  return parseInt( re.reverse().join(''),2);
}

//AND运算，解决js异或溢出问题
exports.and = function (a,b){
  a=a.toString(2).split('').reverse();
  b=b.toString(2).split('').reverse();
  var L=Math.max(a.length,b.length),re=[];
  for(var i=0;i<L;i++){
    re.push(   a[i]&& b[i]?(  a[i]==='1'&&b[i]==='1'?1:0):( 0 )  );
  }
  return parseInt( re.reverse().join(''),2);
}

//取其低八位寄存器的值
exports.mov8l = function (eax){
  var al = '00' + eax.toString(16);
  al = al.substring(al.length-2, al.length);
  return parseInt(al, 16);
}

//取其高八位寄存器的值
exports.mov8h = function (eax){
  var al = '0000' + eax.toString(16);
  al = al.substring(al.length-4, al.length-2);
  return parseInt(al, 16);
}

//翻转
exports.turn = function (key){
  var keyStr = '';
  var tmpKey = '00000000'+key;
  var len = tmpKey.length;
  for (var i = 0; i < 4; i++) {
    keyStr = keyStr + tmpKey.substring(len-i*2-2, len-i*2);
  };
  return keyStr;
}