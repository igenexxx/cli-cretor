import { promisify } from 'node:util';
import copy from 'copy-template-dir';

const copyTemplate = promisify(copy);

export {
  copyTemplate
}
