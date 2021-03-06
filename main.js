global.$ = $;

var fs = require('fs');
var gui = require('nw.gui');
//var cutSync = require('./libs/jieba_wrap').cutSync;
var cutSync = require('./libs/node_segment_wrap').cutSync;
var isPunctuation = require('./libs/punctuation').isPunctuation;

var editor = new Simditor({
    textarea: $('#editor')
});
var ele_audio = $('#audio');

var voices = []; //声音播放列表
var type = 1;//智能分词朗读模式


if (process.platform === "darwin") {
    var mb = new gui.Menu({type: 'menubar'});
    mb.createMacBuiltin('Voice-Editor', {
        hideEdit: false,
        hideWindow: true
    });
    gui.Window.get().menu = mb;
}


//更新播放状态框
var updateModalDialog = function(visiblity, content){

    content = content || '播放中';
    if('show' === visiblity){
        $('.ve-modal').show();
        $('.ve-modal  p').text(content);
    }else{
        $('.ve-modal').hide();
    }

};

var play_audio = function (audio_src) {
    ele_audio.attr('src', audio_src);
    ele_audio[0].play();

};

var play_audios = function(list){
    updateModalDialog('show');

    var index = 0;
    ele_audio.on('ended',function(){
        index++;
        if(index<list.length){
            console.log(index);
            play_audio(list[index]);
        }else{
            console.log('ok');
            setTimeout(function(){
                updateModalDialog('hide');
            },1500)
        }

    });
    play_audio(list[0]);
};



//发声
$('#btn-speak').on('click', function () {
    updateModalDialog('show', '处理中..');

    var sentence = '';
    if (!window.getSelection().isCollapsed) {
        sentence = window.getSelection();
    }

    sentence = sentence || $(editor.getValue()).text() || '请输入文字';

    //逐个读字
    var single_word = function(sentence){
        var voices = [];
        for(var i=0; i<sentence.length; i++){
            var path = './voice/raw/{cn}.mp3'.replace('{cn}', sentence[i]);

            if(fs.existsSync(path)){
                voices.push(path)
            }else{
                if(isPunctuation(sentence[i])){
                    console.log('[Punctuation]: {punctuation} is not exist!'.replace('{punctuation}', sentence[i]));
                }else{
                    console.error('[Word]: {word} is not exist!'.replace('{word}', sentence[i]));
                }
            }
        }
        return voices;
    };

    //分词
    var cut_word = function(sentence){
        var voices = [];

        var cut_words = cutSync(sentence);
        for(var i=0;i<cut_words.length;i++){
            var path = './voice/raw/{cn}.mp3'.replace('{cn}',cut_words[i]);

            if(fs.existsSync(path)){
                voices.push(path)
            }else{
                if(isPunctuation(cut_words[i])){
                    console.log('[Punctuation]: {punctuation} is not exist!'.replace('{punctuation}', cut_words[i]));
                }else{
                    console.error('[Segment]: {segment} is not exist!'.replace('{segment}', cut_words[i]));
                    voices = voices.concat(single_word(cut_words[i]));
                }
            }
        }
        return voices;
    };

    if(type == 1){
        voices = cut_word(sentence);
    }else {
        voices = single_word(sentence);
    }
    console.log(voices);
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

$('#select-model').on('change',function(){
    type = $(this).val();
    console.log('on change->' + type);
});



var init = function () {

    //init UI
    $('#text-version').text(' v' + gui.App.manifest.version);


    play_audio('./voice/hello.mp3');
};
init();


