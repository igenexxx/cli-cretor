#!/usr/bin/env node

import path from 'node:path';
import { basename } from 'node:path';
import enquirer from 'enquirer';

import { init } from './utils/init.js';
import {copyTemplate} from './utils/templates.js';
import {handleError} from './utils/errors.js';
import {getDirName} from './utils/files.js';
import {ask} from './utils/ask.js';

const { prompt } = enquirer;

const __dirname = getDirName(import.meta.url);

init();

const { answer: name } = await ask({ message: 'CLI name?', hint: '(kebab-case only' });
const { answer: description } = await ask({ message: 'CLI description?' });
const { answer: version } = await ask({ message: 'CLI version?', initial: '0.0.1' });

const vars = {
  name,
  description,
  version,
};
const inDir = path.join(__dirname, 'template');
const outDir = path.join(process.cwd(), vars.name);

const files = await copyTemplate(inDir, outDir, vars);

const fileNames = files.map(filePath => basename(filePath));

console.log(`Created files inside ./${vars.name}:`);
console.log(fileNames.join('\n'));
