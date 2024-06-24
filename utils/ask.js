import {handleError} from './errors.js';
import enquirer from 'enquirer';

const { prompt } = enquirer;

export const ask = async () =>  await prompt([
  {
    type: 'input',
    name: 'name',
    message: 'CLI name?',
  },
  {
    type: 'input',
    name: 'command',
    message: 'CLI command?',
    hint: 'The command to run the CLI',
    optional: true,
  },
  {
    type: 'input',
    name: 'description',
    message: 'CLI description?',
  },
  {
    type: 'input',
    name: 'version',
    message: 'CLI version?',
    initial: '0.0.1',
  },
  {
    type: 'input',
    name: 'authorName',
    message: 'CLI author?',
    initial: 'Zhenya Snoop',
  },
  {
    type: 'input',
    name: 'authorEmail',
    message: 'CLI author email?',
    initial: 'igenexxx@gmail.com'
  },
  {
    type: 'input',
    name: 'authorUrl',
    message: 'CLI author URL?',
    initial: 'google.com',
  },
  {
    type: 'input',
    name: 'license',
    message: 'CLI license?',
    initial: 'MIT',
  }
]).catch(handleError());
