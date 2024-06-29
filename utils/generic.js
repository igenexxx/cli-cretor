import {execa} from 'execa';

export const cleanPackageFile = async (outputPath) => {
  process.chdir(outputPath);
  await execa('npm', ['dedupe']);
}
