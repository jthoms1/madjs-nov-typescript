import * as path from 'path';
import { forEachFileInDir, getFileData } from './util';

const [,,dirPath] = process.argv;
if (!dirPath) {
  throw new Error('A directory path was not provided.');
}

const fullDirPath = path.resolve(dirPath);

console.log('Contents of directory ' + fullDirPath);

(async () => {
  await forEachFileInDir(fullDirPath, (filePath) => {
    const { isHidden, isDirectory, pathData } = getFileData(filePath);
    if (isHidden) {
      return;
    }
    const messageLine =
    `${isDirectory ? 'd' : '-'} ${pathData.base}`;

    console.log(messageLine);
  });
})();
