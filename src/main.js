var request = require('request');

(function ($) {
    var editor = new Simditor({
        textarea: $('#editor')
    });

    $('#btn-speak').on('click',function(){
        console.log($(editor.getValue()).text());
    });
})(jQuery);