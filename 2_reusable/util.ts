var path = require('path');
var fs = require('fs');

exports.getFileData = function(filePath) {

  var fileStat = fs.statSync(filePath);
  var isDirectory = fileStat.isDirectory();
  var pathData = path.parse(filePath);
  var isHidden = (pathData.name.charAt(0) === '.');

  return {
    isDirectory: isDirectory,
    isHidden: isHidden,
    filePath: filePath,
    pathData: pathData
  };
}

exports.forEachFileInDir = function(dirPath, callback) {
  var files = fs.readdirSync(dirPath);
  files.sort();

  for (var i = 0; i < files.length; i++) {
    var filePath = path.join(dirPath, files[i]);
    callback(filePath);
  }
};
