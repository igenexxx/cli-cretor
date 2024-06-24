import welcome from 'cli-welcome';
import alert from 'cli-alerts';

import {asyncReadFile} from './files.js';

const unparsedPkg = await asyncReadFile('package.json');
const pkg = JSON.parse(unparsedPkg);

export const init = () => {
  process.on('uncaughtException', (error) => {
    alert({ type: 'error', msg: error.message });
    process.exit(1);
  });

  welcome({
    title: 'cli-img',
    tagLine: 'by Zhenya Snoop',
    description: pkg.description,
    version: pkg.version,
    bgColor: '#6cc23a',
    color: '#000',
    bold: true,
    clear: true
  });
}