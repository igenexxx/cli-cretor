import {cli} from './cli.js';
import alert from 'cli-alerts';

const { flags: { debug } } = cli;

export const log = (info) => {
  if (debug || process.env.DEBUG === 'true') {
    alert({
      type: 'warning',
      name: 'DEBUG LOG',
      msg: '',
    });

    console.log(`Debug info: `, info);
    console.log();
  }
}
