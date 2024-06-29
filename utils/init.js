import welcome from 'cli-welcome';
import alert from 'cli-alerts';

import {asyncReadFile} from './files.js';
import { cli } from './cli.js';

const unparsedPkg = await asyncReadFile('package.json');
const pkg = JSON.parse(unparsedPkg);

const { flags: { clear }, input } = cli;

export const init = () => {
  process.on('uncaughtException', (error) => {
    alert({ type: 'error', msg: error.message });
    process.exit(1);
  });

  process.on('SIGINT', () => {
    alert({ type: 'warning', msg: 'You closed the CLI.' });
    process.exit(0);
  });

  welcome({
    title: 'cli-img',
    tagLine: 'by Zhenya Snoop',
    description: pkg.description,
    version: pkg.version,
    bgColor: '#6cc23a',
    color: '#000',
    bold: true,
    clear,
  });

  input.includes('help') && cli.showHelp(0);
}
