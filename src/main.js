var request = require('request');
var fs = require('fs');
var gui = require('nw.gui');

if (process.platform === "darwin") {
    var mb = new gui.Menu({type: 'menubar'});
    mb.createMacBuiltin('Voice-Editor', {
        hideEdit: false,
        hideWindow: true
    });
    gui.Window.get().menu = mb;
}

global.$ = $;

var editor = new Simditor({
    textarea: $('#editor')
});

var play_audio = function (audio_src) {
    var ele_audio = $('#audio');
    ele_audio.attr('src', audio_src);
    ele_audio[0].play();
};

//发声
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

//处理保存到文件
$('#input-saveFile').on('change', function () {
    fs.writeFile(($(this).val()), editor.getValue(), function (err) {
        if (err) {
            alert(err);
            return;
        }
        alert('已保存');
    });
    $(this).val('');
});
//处理打开文件
$('#input-openFile').on('change',function(){
    alert($(this).val());
    fs.readFile($(this).val(),function(err,data){
        if(err){
            alert(err);
        }else{
            editor.setValue(String(data));
        }
    });
});

//点击保存文件
$('#btn-saveFile').on('click', function (evt) {
    $('#input-saveFile').trigger('click');
});

//点击打开文件
$('#btn-openFile').on('click',function(evt){
    $('#input-openFile').trigger('click');
});


$('#btn-about').on('click',function(){
    $('#modal-about').modal('show')
});

var init = function () {
    //init UI
    $('#text-version').text(' v' + gui.App.manifest.version);

    play_audio('./voice/hello.mp3');
}
init();


