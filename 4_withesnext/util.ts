import * as path from 'path';
import * as fs from 'fs';
import promisify from './promisify';

/*
export interface FileData {
  isDirectory: boolean;
  isHidden: boolean;
  filePath: string;
  pathData: path.ParsedPath;
}
*/

/**
 * Gather metadata about a file
 * @param filePath path to the file
 */
export async function getFileData(filePath: string) {

  const fileStat = await promisify(fs.stat)(filePath);
  const isDirectory = fileStat.isDirectory();
  const pathData = path.parse(filePath);
  const isHidden = pathData.name.startsWith('.');

  return {
    isDirectory,
    isHidden,
    filePath,
    pathData
  };
}

/**
 * Loop over the files in a directory and execute the callback for every file
 * @param dirPath The directory path as a string
 * @param callback The callback will be executing for every file found.
 */
export async function forEachFileInDir(dirPath: string, callback: (filePath: string) => void | Promise<void>) {
  const files = await promisify(fs.readdir)(dirPath)
  files.sort();

  for (const file of files) {
    const filePath = path.join(dirPath, file);
    await callback(filePath);
  }
};
