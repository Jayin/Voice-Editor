var request = require('request');
var fs = require('fs');

(function ($) {
    var editor = new Simditor({
        textarea: $('#editor')
    });

    var play_audio = function (audio_src) {
        var ele_audio = $('#audio');
        ele_audio.attr('src', audio_src);
        ele_audio[0].play();
    };

    $('#btn-speak').on('click', function () {
        var word = '';
        if (!window.getSelection().isCollapsed) {
            word = window.getSelection();
        }

        word = word || $(editor.getValue()).text() || '请写入文字';

        var opts = {
            url: 'http://translate.google.cn/translate_tts?ie=UTF-8&tl=zh-CN&total=1&idx=0&textlen=8&client=t&q=' + encodeURIComponent(word),
            headers: {
                'User-Agent': 'request',
                'Referer': 'http://translate.google.cn/?hl=en',
                'Range': 'bytes=0-'
            }
        };

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