var download = require('./download');
var fs = require('fs');

var content = fs.readFileSync('./data/dict.txt',{encoding:'utf-8'});
//var content = fs.readFileSync('./data/tmp.txt',{encoding:'utf-8'});
function sleep(milliSeconds) {
    var startTime = new Date().getTime();
    while (new Date().getTime() < startTime + milliSeconds);
};
content.split('\n').forEach(function(line,index){

    if(index % 50 ==0){
        sleep(300);
    }
    var word = line.split('|')[0];
    console.log(index+':'+word);
    if(word!== undefined && word !==''){
        download(word,'../voice/tmp/');
    }
});
