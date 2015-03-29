var en_punctuation = '`~!@#$%^&*()_-+={[}]|\\\";\'<,>.?/';
var cn_punctuation = '！【】；：‘“《》，。？、';

module.exports.isPunctuation = function(char){
  return ''.concat(en_punctuation, cn_punctuation).indexOf(char) !== -1;
};


