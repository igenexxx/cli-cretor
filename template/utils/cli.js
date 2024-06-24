import meow from 'meow';
import chalk from 'chalk';

const {green, yellow, dim} = chalk;

const flags = {
  clear: {
    type: 'boolean',
    alias: 'c',
    default: true,
    description: 'Clear the console'
  },
  debug: {
    type: 'boolean',
    alias: 'd',
    default: false,
    description: 'Print debug info'
  },
  version: {
    type: 'boolean',
    alias: 'v',
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
  const longestFlag = Object.keys(flags).reduce((acc, flag) => flag.length > acc ? flag.length : acc, 0);
  const longestCommand = Object.keys(commands).reduce((acc, command) => command.length > acc ? command.length : acc, 0);

  const flagText = Object.entries(flags).map(([flag, {description, default: defaultValue}]) => {
    const flagName = flag.padEnd(longestFlag);
    const flagDescription = description + (defaultValue ? ` ${dim(`(default: ${defaultValue})`)}` : '');
    return `  ${green(flagName)}  ${flagDescription}`;
  }).join('\n');

  const commandText = Object.entries(commands).map(([command, {description, isOptional}]) => {
    const commandName = command.padEnd(longestCommand);
    const commandDescription = description + (isOptional ? ` ${dim('(optional)')}` : '');
    return `  ${yellow(commandName)}  ${commandDescription}`;
  }).join('\n');

  return `
${command} - CLI tool to generate a new project
${flagText}
${commandText}
`;
};

export const cli = meow(helpText({flags, commands, name: 'cli-img'}), {
  flags,
  inferType: true,
  description: false,
  hardRejection: false
});
