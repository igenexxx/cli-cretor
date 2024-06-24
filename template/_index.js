#!/usr/bin/env node

/*
  * {{name}}
  * {{description}}
  *
  * @author {{authorName}} <{{authorEmail}}>
  * @version {{version}}
 */

import { init } from './utils/init';
import { cli } from './utils/cli';

const { flags, input } = cli;
const { clear, debug } = flags;

await init({ clear });

input.includes('help') && cli.showHelp(0);

console.log(`Input: `, input);
console.log(`Flags: `, flags);
