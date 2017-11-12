import * as path from 'path';
import * as fs from 'fs';

export function getFileData(filePath: string) {

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

export function forEachFileInDir(dirPath: string, callback: (filePath: string) => void) {
  var files = fs.readdirSync(dirPath);
  files.sort();

  for (var i = 0; i < files.length; i++) {
    var filePath = path.join(dirPath, files[i]);
    callback(filePath);
  }
};
