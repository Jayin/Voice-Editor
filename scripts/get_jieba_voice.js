var fs = require('fs');
var download = require('./download');

var content = fs.readFileSync('./data/jieba.dict.utf8',{encoding:'utf-8'});

content.split('\n').forEach(function(line,index){
    var word = line.split(' ')[0];
    console.log(index+':'+word);
    if(!word && word !==''){
        download(word);
    }
});

