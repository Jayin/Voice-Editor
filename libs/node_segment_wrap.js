/**
 *封装一下，只返回分词后的
 */


module.exports.cutSync = function(sentence){
// 载入模块
    var Segment = require('segment').Segment;
// 创建实例
    var segment = new Segment();
// 使用默认的识别模块及字典，载入字典文件需要1秒，仅初始化时执行一次即可
    segment.useDefault();
    var result = [];
    segment.doSegment(sentence).forEach(function(element){
        result.push(element.w)
    });
    return result;
};





