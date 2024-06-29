import path, {basename} from 'node:path';
import {copyTemplate} from './templates.js';
import alert from 'cli-alerts';
import chalk from 'chalk';

import {getDirName} from './files.js';
import {execa} from 'execa';
import {cleanPackageFile} from './generic.js';
import ora from 'ora';
import {installDeps} from './deps.js';

const { green: G, dim: D } = chalk;
const __dirname = getDirName(import.meta.url);

export const templateGenerate = async (answers) => {
  const spinner = ora({ text: 'Creating files...', color: 'yellow' });

  spinner.start();
  const inDirPath = path.join(__dirname, '..', 'template');
  const outDirPath = path.join(process.cwd(), answers.name);
  const outDir = `./${answers.name}`;

  const files = await copyTemplate(inDirPath, outDirPath, answers);

  const fileNames = files.map(filePath => basename(filePath));

  console.log(D(`\nCreated files inside ${G(outDir)}:`));
  console.log(fileNames.map(filename => '✅ '.concat(filename)).join('\n'));

  await cleanPackageFile(outDirPath);

  spinner.stop();

  spinner.start('Installing dependencies...');
  await installDeps(outDirPath);
  spinner.succeed('Dependencies installed');

  console.log(`Linking the CLI as "${answers.command}"...`);
  await execa('npm', ['link'], { cwd: outDirPath });

  console.log(`Adding execute rights...`);
  await execa('chmod', ['+x', 'index.js'], { cwd: outDirPath });

  alert({
    type: 'success',
    name: 'All done!',
    msg: `${fileNames.length} files created in ${outDir} directory.`
  })
}
