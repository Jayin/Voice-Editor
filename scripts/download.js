var request = require('request');
var fs = require('fs');

module.exports = function (word, directory) {
    console.log(word+directory);
    directory = directory || '../voice/raw/';
    var path = directory + word + '.mp3';

    if(!fs.existsSync(path)){
        var opts = {
            url: 'http://translate.google.cn/translate_tts?ie=UTF-8&tl=zh-CN&total=1&idx=0&textlen=8&client=t&q=' + encodeURIComponent(word),
            headers: {
                'User-Agent': 'request',
                'Referer': 'http://translate.google.cn/?hl=en',
                'Range': 'bytes=0-'
            }
        };
        request(opts, function (err,res) {
            if (err) {
                console.log(err)
            }

        }).pipe(fs.createWriteStream(path));
    }
};
