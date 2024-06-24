import {handleError} from './errors.js';
import enquirer from 'enquirer';

const { prompt } = enquirer;

export const ask = async ({ message, hint, initial }) => await prompt({
  type: 'input',
  name: 'answer',
  hint,
  initial,
  message,
}).catch(handleError());
