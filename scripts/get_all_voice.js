//下载all.js中所有常用字汉字的读音

var all = require('../libs/all');
var download = require('./download');

//all.length
for (var i = 0; i < all.length; i++) {
    var word = all[i];
    console.log(i+'/'+all.length);
    download(word);
}