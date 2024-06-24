import alert from 'cli-alerts';
import { cli } from './cli.js';

const { flags: { debug } } = cli;

export const handleError = ({ exitCode = 1, defaultValue = null } = {}) =>  (err) => {
  const showDebug = debug || process.env.DEBUG === 'true';

  if (showDebug) {
    alert({ type: 'error', msg: 'ERROR ⬇️'})
    console.error(err);
    console.log('\n');
  } else {
    alert({ type: 'error', msg: 'Something went wrong! Run with `--debug` flag for more info.'})
  }


  if (defaultValue) {
    return defaultValue;
  } else {
    process.exitCode = exitCode;
    throw err;
  }
}
