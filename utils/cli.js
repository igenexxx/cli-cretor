import meow from 'meow';
import chalk from 'chalk';

const {green, yellow, dim} = chalk;

const flags = {
  clear: {
    type: 'boolean',
    shortFlag: 'c',
    default: true,
    description: 'Clear the console'
  },
  debug: {
    type: 'boolean',
    shortFlag: 'd',
    default: false,
    description: 'Print debug info'
  },
  version: {
    type: 'boolean',
    shortFlag: 'v',
    description: 'Print CLI version'
  }
};

const commands = {
  help: {
    description: 'Print help info',
    isOptional: true
  }
};

const helpText = ({flags, commands, command}) => {
  const shortFlagLength = 3;
  const longestFlag = Object.keys(flags).reduce((acc, flag) => flag.length > acc ? flag.length : acc, 0) + shortFlagLength;
  const longestCommand = Object.keys(commands).reduce((acc, command) => command.length > acc ? command.length : acc, 0);

  const flagText = Object.entries(flags).map(([flag, {description, default: defaultValue, shortFlag}]) => {
    const flagName = flag.concat(shortFlag ? `, ${shortFlag}` : '').padEnd(longestFlag);
    const flagDescription = description + (defaultValue ? ` ${dim(`(default: ${defaultValue})`)}` : '');
    return `  ${green(flagName)}  ${flagDescription}`;
  }).join('\n');

  const commandText = Object.entries(commands).map(([command, {description, isOptional}]) => {
    const commandName = command.padEnd(longestCommand);
    const commandDescription = description + (isOptional ? ` ${dim('(optional)')}` : '');
    return `  ${yellow(commandName)}  ${commandDescription}`;
  }).join('\n');

  return `
${green.inverse(command)} - CLI tool to generate a new project

Usage
  $ ${command} ${green('[options]')} ${yellow('<input>')}

${flagText}

${commandText}
`;
};

export const cli = meow(helpText({flags, commands, command: 'cli-img'}), {
  importMeta: import.meta,
  flags,
  inferType: true,
  description: false,
  hardRejection: false
});
