global.$ = $;

var request = require('request');
var fs = require('fs');
var gui = require('nw.gui');


var editor = new Simditor({
    textarea: $('#editor')
});
var ele_audio = $('#audio');


if (process.platform === "darwin") {
    var mb = new gui.Menu({type: 'menubar'});
    mb.createMacBuiltin('Voice-Editor', {
        hideEdit: false,
        hideWindow: true
    });
    gui.Window.get().menu = mb;
}


var play_audio = function (audio_src) {
    ele_audio.attr('src', audio_src);
    ele_audio[0].play();
};

var play_audios = function(list){
    var index = 0;

    ele_audio.on('ended',function(){
        index++;
        if(index<list.length){
            play_audio(list[index]);
        }

    });
    play_audio(list[0]);
};

//发声
$('#btn-speak').on('click', function () {
    var word = '';
    if (!window.getSelection().isCollapsed) {
        word = window.getSelection();
    }

    word = word || $(editor.getValue()).text() || '请写入文字';
    voices = [];

    for(var i=0;i<word.length;i++){
        var path = './voice/raw/{cn}.mp3'.replace('{cn}',word[i]);
        console.log(path);
        if(fs.existsSync(path)){
            voices.push(path)
        }
    }
    //分词，停顿
    play_audios(voices);

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

