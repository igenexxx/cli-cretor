import {ask} from './ask.js';

export const getAnswers = async () => {
  const {
    name,
    description,
    version,
    authorName,
    authorEmail,
    authorUrl,
    license,
    command,
  } = await ask();

  return {
    name,
    description,
    version,
    authorName,
    authorEmail,
    authorUrl,
    license,
    command: command || name
  };
}
