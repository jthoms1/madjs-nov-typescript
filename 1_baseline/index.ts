var path = require('path');
var fs = require('fs');

var dirPath = process.argv[2];
if (!dirPath) {
  throw new Error('A directory path was not provided.');
}
var fullPath = path.resolve(dirPath);

var files = fs.readdirSync(fullPath)
files.sort();

console.log('Contents of directory ' + fullPath);

for (var i = 0; i < files.length; i++) {
  var fileName = files[i];
  var isHidden = fileName.charAt[0] === '.';

  var filePath = path.join(dirPath, fileName);
  var fileStat = fs.statSync(filePath);
  var isDirectory = fileStat.isDirectory();

  var messageLine =
    (isDirectory ? "d" : '-') + " " +
    files[i];

  console.log(messageLine);
}
