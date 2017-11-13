import * as path from 'path';
import { forEachFileInDir, getFileData } from './util';

const [,,dirPath] = process.argv;
if (!dirPath) {
  throw new Error('A directory path was not provided.');
}

const fullDirPath = path.resolve(dirPath);

console.log('Contents of directory ' + fullDirPath);

forEachFileInDir(fullDirPath, async (filePath) => {
  const { isHidden, isDirectory, pathData } = await getFileData(filePath);
  if (isHidden) {
    return;
  }
  console.log(`${isDirectory ? 'd' : '-'} ${pathData.base}`);
});
