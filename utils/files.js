import {fileURLToPath} from 'node:url';
import {dirname} from 'node:path';
import {readFile} from 'node:fs/promises';
import {handleError} from './errors.js';

/*
  * @description Polyfill for __dirname
  * @param {string} importMetaUrl - The import.meta.url
 */
export const getDirName = (importMetaUrl) => {
  const __filename = fileURLToPath(importMetaUrl);
  return dirname(__filename);
}

export const asyncReadFile = async (filePath) => {
  return await readFile(filePath, 'utf-8').catch(handleError());
}
