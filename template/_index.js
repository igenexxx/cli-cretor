#!/usr/bin/env node

/*
  * {{name}}
  * {{description}}
  *
  * @author {{authorName}} <{{authorEmail}}>
  * @version {{version}}
 */

import { init } from './utils/init.js';
import { cli } from './utils/cli.js';

const { flags, input } = cli;
const { clear, debug } = flags;

await init({ clear });

input.includes('help') && cli.showHelp(0);
