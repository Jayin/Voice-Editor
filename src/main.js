var request = require('request');
var fs = require('fs');

(function ($) {
    var editor = new Simditor({
        textarea: $('#editor')
    });

    var play_audio = function (audio_src) {
        $('#audio').attr('src', audio_src);
        $('#audio')[0].play();
    }

    $('#btn-speak').on('click', function () {
        var word = $(editor.getValue()).text();
        var opts = {
            url: 'http://translate.google.cn/translate_tts?ie=UTF-8&q={word}&tl=zh-CN&total=1&idx=0&textlen=8&client=t',
            headers: {
                'User-Agent': 'request',
                'Referer': 'http://translate.google.cn/?hl=en',
                'Range': 'bytes=0-'
            }
        };
        opts.url = opts.url.replace('{word}', encodeURIComponent(word));
        console.log(opts);
        request.get(opts, function (err) {
            if (err) {
                console.log(err);
            }
            else {
                play_audio('./voice/tmp.mp3')
            }
        }).pipe(fs.createWriteStream('./voice/tmp.mp3'));
    });

    play_audio('./voice/hello.mp3')

})(jQuery);