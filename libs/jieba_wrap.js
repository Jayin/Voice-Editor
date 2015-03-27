/**
 *封装一下，只返回分词后的
 */


module.exports.cutSync = function(sentence){
    var jieba = require("nodejieba");

    jieba.loadDict(
        "./node_modules/nodejieba/dict/jieba.dict.utf8",
        "./node_modules/nodejieba/dict/hmm_model.utf8",
        "./node_modules/nodejieba/dict/user.dict.utf8");
    return jieba.cutSync(sentence);
};





