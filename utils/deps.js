import {execa} from 'execa';

const pkgs = [
  'chalk',
  'cli-alerts',
  'cli-welcome',
  'execa',
  'meow',
  'ora'
];

const devPkgs = [
  'prettier',
  'eslint',
]

export const installDeps = async (outDirPath) =>
  Promise.all([
    execa('npm', ['install', '--save', ...pkgs], { cwd: outDirPath }),
    execa('npm', ['install', '--save-dev', ...devPkgs], { cwd: outDirPath }),
  ]);
