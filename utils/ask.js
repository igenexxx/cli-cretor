import { existsSync } from 'node:fs';
import {handleError} from './errors.js';
import enquirer from 'enquirer';
import {store} from './store.js';

const { prompt } = enquirer;

function defaultValidator(value) {
  if (!value.length) {
    return 'Please enter a valid value';
  }

  if (/\w-_/.test(value)) {
    return 'Please enter a value without spaces';
  }

  return true;
}


export const ask = async () =>  await prompt([
  {
    type: 'input',
    name: 'name',
    message: 'CLI name?',
    validate: defaultValidator,
  },
  {
    type: 'input',
    name: 'command',
    message: 'CLI command?',
    hint: 'The command to run the CLI',
    initial({ enquirer: { answers }}) {
      return answers.name ;
    },
    optional: true,
    validate(input) {
      if (input && existsSync(input)) {
        return 'A directory with the same name already exists';
      }

      return input.length > 0 ? true : 'Please enter a valid value';
    }
  },
  {
    type: 'input',
    name: 'description',
    message: 'CLI description?',
    validate: defaultValidator,
  },
  {
    type: 'input',
    name: 'version',
    message: 'CLI version?',
    initial: '0.0.1',
    validate(version) {
      if (!/\d+\.\d+\.\d+/.test(version)) {
        return 'Please enter a valid version';
      }

      return true;
    }
  },
  {
    type: 'input',
    name: 'authorName',
    message: 'CLI author?',
    initial() {
      if (store.get('author')) {
        return store.get('author');
      }
    },
    validate(value) {
      store.set('author', value);
      return defaultValidator(value);
    }
  },
  {
    type: 'input',
    name: 'authorEmail',
    message: 'CLI author email?',
    initial: 'igenexxx@gmail.com',
    validate: defaultValidator,
  },
  {
    type: 'input',
    name: 'authorUrl',
    message: 'CLI author URL?',
    initial: 'google.com',
    validate: defaultValidator,
  },
  {
    type: 'input',
    name: 'license',
    message: 'CLI license?',
    initial: 'MIT',
    validate: defaultValidator,
  }
]).catch(handleError());
