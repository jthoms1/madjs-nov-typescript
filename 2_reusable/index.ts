var path = require('path');
var forEachFileInDir = require('./util').forEachFileInDir;
var getFileData = require('./util').getFileData;

var dirPath = process.argv[2];
if (!dirPath) {
  throw new Error('A directory path was not provided.');
}

var fullDirPath = path.resolve(dirPath);

console.log('Contents of directory ' + fullDirPath);

forEachFileInDir(fullDirPath, function(filePath) {
  var fileData = getFileData(filePath);
  if (fileData.isHidden) {
    return;
  }
  var messageLine =
    (fileData.isDirectory ? "d" : '-') + " " +
    fileData.pathData.base;

  console.log(messageLine);
});
