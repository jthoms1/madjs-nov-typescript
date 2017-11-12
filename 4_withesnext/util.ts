import * as path from 'path';
import * as fs from 'fs';

/*
export interface FileData {
  isDirectory: boolean;
  isHidden: boolean;
  filePath: string;
  pathData: path.ParsedPath;
}
*/

export function getFileData(filePath: string) {

  const fileStat = fs.statSync(filePath);
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

export async function forEachFileInDir(dirPath: string, callback: (filePath: string) => void | Promise<void>) {
  const files = fs.readdirSync(dirPath).sort();

  for (const file of files) {
    const filePath = path.join(dirPath, file);
    await callback(filePath);
  }
};
