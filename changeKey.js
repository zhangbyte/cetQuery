var data = require('./data.js');
var util = require('./util.js');
var rol = util.rol;
var ror = util.ror;
var shr = util.shr;
var xor = util.xor;
var and = util.and;
var mov8l = util.mov8l;
var mov8h = util.mov8h;
var turn = util.turn;

var data2_1 = [0x7CB05034,0xC2C74504,0x3484DC1C,0x0E460D06,0xF0BC9C38,0xC0040F02,0xD42CA818,0x0184CF0D,0x18A8A89C,0x8D4E8309,0xA8703098,0x4CCC83C3,0x645060D0,0x4F0CC9C4,0x0C98C0F4,0xC60D80CE,0xA414F440,0x8B4D8A88,0x380CE4B0,0xC5C90E84,0x3CFCEC20,0x008806C1,0x90686C68,0x8A0A8687,0x40A868A8,0x4F8B0583,0xCC144828,0x4C0E41C9,0x1454447C,0xCD46418E,0x20541C0C,0x42C54D8D];
var data2_2 = [0xD4F85438,0x08424402,0x80688C18,0x45424D06,0x6C9C8C0C,0x07060703,0xD8503818,0x8C04C70D,0x00FC289C,0x4BCC490C,0xBC80901C,0x424C81C5,0xA4E450D0,0x8D048B82,0xD81CE0B0,0xC3858840,0xD40CF400,0x0FC88A41,0x3830A4E0,0xC9088E8B,0x4C64E880,0x48C906C6,0x74C86868,0xC60A02C8,0x84306468,0x86C9018B,0x601C4020,0x89CF4584,0x38844C34,0x4486008F,0xB8B01C28,0x0A850C08];

module.exports = function (key1, key2, flag) {
  var data2 = [];
  if (flag === 1) {
    data2 = data2_1;
  } else {
    data2 = data2_2;
  }
  key1 = '0x'+turn(key1);
  key2 = '0x'+turn(key2);

  //初始化
  var eax = parseInt(key1);
  var ecx = 0;
  var edx = 0;
  var ebx = 1;
  var edi = parseInt(key2);
  var esi = 0;
  // var ebp = parseInt(0x003BD2C0); 
  var ebp = parseInt(0x0142D2C0);

  //前半部
  eax = rol(eax, 4);
  esi = eax;
  eax = xor(eax, edi);
  eax = and(eax, 0xF0F0F0F0);
  esi = xor(esi, eax);
  edi = xor(edi, eax);
  edi = rol(edi, 20);
  eax = edi;
  edi = xor(edi, esi);
  edi = and(edi, 0xFFF0000F);
  eax = xor(eax, edi);
  esi = xor(esi, edi);
  eax = rol(eax, 14);
  edi = eax;
  eax = xor(eax, esi);
  eax = and(eax, 0x33333333);
  edi = xor(edi, eax);
  esi = xor(esi, eax);
  esi = rol(esi, 22);
  eax = esi;
  esi = xor(esi, edi);
  esi = and(esi, 0x3FC03FC);
  eax = xor(eax, esi);
  edi = xor(edi, esi);
  eax = rol(eax, 9);
  esi = eax;
  eax = xor(eax, edi);
  eax = and(eax, 0xAAAAAAAA);
  esi = xor(esi, eax);
  edi = xor(edi, eax);
  edi = rol(edi, 1);

  //中部
  for (var i = 0; i < 8; i++) {
    eax = parseInt(data2[i*4]);
    edx = parseInt(data2[i*4+1]);
    eax = xor(eax, esi);
    edx = xor(edx, esi);
    eax = and(eax, 0xFCFCFCFC);
    edx = and(edx, 0xCFCFCFCF);
    ebx = mov8l(eax);
    ecx = mov8h(eax);
    edx = ror(edx, 4);
    edi = xor(edi, data[(ebp+ebx).toString(16)]);
    ebx = mov8l(edx);
    edi = xor(edi, data[(ebp+ecx+0x200).toString(16)]);
    ecx = mov8h(edx);
    eax = shr(eax);
    edi = xor(edi, data[(ebp+ebx+0x100).toString(16)]);
    ebx = mov8h(eax);
    edx = shr(edx);
    edi = xor(edi, data[(ebp+ecx+0x300).toString(16)]);
    ecx = mov8h(edx);
    eax = and(eax, 0xFF);
    edx = and(edx, 0xFF);
    edi = xor(edi, data[(ebp+ebx+0x600).toString(16)]);
    edi = xor(edi, data[(ebp+ecx+0x700).toString(16)]);
    edi = xor(edi, data[(ebp+eax+0x400).toString(16)]);
    edi = xor(edi, data[(ebp+edx+0x500).toString(16)]);
    
    eax = parseInt(data2[i*4+2]);
    edx = parseInt(data2[i*4+3]);
    eax = xor(eax, edi);
    edx = xor(edx, edi);
    eax = and(eax, 0xFCFCFCFC);
    edx = and(edx, 0xCFCFCFCF);
    ebx = mov8l(eax);
    ecx = mov8h(eax);
    edx = ror(edx, 4);
    esi = xor(esi, data[(ebp+ebx).toString(16)]);
    ebx = mov8l(edx);
    esi = xor(esi, data[(ebp+ecx+0x200).toString(16)]);
    ecx = mov8h(edx);
    eax = shr(eax);
    esi = xor(esi, data[(ebp+ebx+0x100).toString(16)]);
    ebx = mov8h(eax);
    edx = shr(edx);
    esi = xor(esi, data[(ebp+ecx+0x300).toString(16)]);
    ecx = mov8h(edx);
    eax = and(eax, 0xFF);
    edx = and(edx, 0xFF);
    esi = xor(esi, data[(ebp+ebx+0x600).toString(16)]);
    esi = xor(esi, data[(ebp+ecx+0x700).toString(16)]);
    esi = xor(esi, data[(ebp+eax+0x400).toString(16)]);
    esi = xor(esi, data[(ebp+edx+0x500).toString(16)]);
  };

  // 下半部
  esi = ror(esi,1);
  eax = edi;
  edi = xor(edi, esi);
  edi = and(edi, 0xAAAAAAAA);
  eax = xor(eax, edi);
  esi = xor(esi, edi);
  eax = rol(eax, 23);
  edi = eax;
  eax = xor(eax, esi);
  eax = and(eax, 0x3FC03FC);
  edi = xor(edi, eax);
  esi = xor(esi, eax);
  edi = rol(edi, 10);
  eax = edi;
  edi = xor(edi, esi);
  edi = and(edi, 0x33333333);
  eax = xor(eax, edi);
  esi = xor(esi, edi);
  esi = rol(esi, 18);
  edi = esi;
  esi = xor(esi, eax);
  esi = and(esi, 0xFFF0000F);
  edi = xor(edi, esi);
  eax = xor(eax, esi);
  edi = rol(edi, 12);
  esi = edi;
  edi = xor(edi, eax);
  edi = and(edi, 0xF0F0F0F0);
  esi = xor(esi, edi);
  eax = xor(eax, edi);
  eax = ror(eax, 4);

  return turn(eax.toString(16))+turn(esi.toString(16));
}