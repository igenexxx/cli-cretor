#!/usr/bin/env node

import path from 'node:path';
import { basename } from 'node:path';
import enquirer from 'enquirer';

import { init } from './utils/init.js';
import {copyTemplate} from './utils/templates.js';
import {handleError} from './utils/errors.js';
import {getDirName} from './utils/files.js';
import {ask} from './utils/ask.js';
import chalk from 'chalk';
import alert from 'cli-alerts';

const { green: G, dim: D } = chalk;

const __dirname = getDirName(import.meta.url);

init();

const {
  name,
  description,
  version,
  authorName,
  authorEmail,
  authorUrl,
  license,
  command,
} = await ask();

const vars = {
  name,
  description,
  version,
  authorName,
  authorEmail,
  authorUrl,
  license,
  command: command || name
};


const inDirPath = path.join(__dirname, 'template');
const outDirPath = path.join(process.cwd(), vars.name);
const outDir = `./${vars.name}`;

const files = await copyTemplate(inDirPath, outDirPath, vars);

const fileNames = files.map(filePath => basename(filePath));

console.log(D(`\nCreated files inside ${G(outDir)}:`));
console.log(fileNames.map(filename => '✅ '.concat(filename)).join('\n'));

alert({
  type: 'success',
  name: 'All done!',
  msg: `${fileNames.length} files created in ${outDir} directory.`
})
