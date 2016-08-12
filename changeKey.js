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

var data2_1 = [0x34989C30,0x45C70C02,0x50A0DC30,0x83428C0D,0xA8AC88A8,0x0CC2CE0A,0xF054A88C,0x4542C341,0x3C3830CC,0x0F0E434E,0x48F83054,0xC04D49C5,0xA4CCD054,0x0E8D488D,0x9090D434,0xCF418A81,0x8C6CC4B0,0x82458A0D,0x30C8A4B0,0x8BC28643,0xE8242CC0,0x4E8A8641,0x145C28C8,0x490BC4CA,0x5C2C48CC,0xC64941C7,0x74F0546C,0x888541C9,0x80245474,0xCEC50D0C,0xF47C5434,0x02860C8E]; 
var data2_2 = [0x140C9C34,0x41470C0D,0xA830DC30,0x03868805,0x08C480B8,0x0902CE06,0xD8CCA884,0x4602C342,0xD47030CC,0x030EC249,0x082430D4,0x8B4949CC,0x38C4D044,0x44CD48C0,0xB474D474,0x06018A80,0x84A844B0,0x40C58A8A,0xE404E4B0,0x81428443,0x78000CE0,0x8D8A864A,0x487828C8,0x40C3C4C8,0x244848CC,0x024B414F,0x6080146C,0x8E4541C3,0xE01C5454,0x48854D08,0x90D85034,0x87C60D80];

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
  var ebp = parseInt(0x00DFE1C0); 

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