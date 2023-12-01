import chalk from 'chalk';
import Fs from 'fs';
import { mergeObjects } from 'json-merger';
import logSymbols from 'log-symbols';
import { CLIConfigOptions } from './types';

export const config = (sourceFile: string, targetFile: string, options: CLIConfigOptions): void => {
  if (!Fs.existsSync(sourceFile)) {
    console.error(logSymbols.error, chalk.red(`Source file does not exist. Giving up.`), chalk.bgBlue(sourceFile));
    return;
  }
  if (Fs.existsSync(targetFile)) {
    try {
      if (options.format === 'json') {
        console.info(
          logSymbols.info,
          chalk.cyan(`Merging missing json entries from`),
          chalk.bgBlue(sourceFile),
          chalk.cyan(`into`),
          chalk.bgBlue(targetFile)
        );

        const target = Fs.readFileSync(targetFile, 'utf8');
        const source = Fs.readFileSync(sourceFile, 'utf8');
        const result = mergeObjects([JSON.parse(source), JSON.parse(target)]);
        Fs.writeFileSync(targetFile, JSON.stringify(result, null, 2), 'utf8');

        console.info(logSymbols.success, chalk.green(`Done`), chalk.bgBlue(targetFile));
      } else if (options.format === 'dotenv') {
        console.info(
          logSymbols.warning,
          chalk.red(`Cannot merge missing entries for type ${options.format} in`),
          chalk.bgBlue(targetFile)
        );
      } else {
        console.info(
          logSymbols.warning,
          chalk.red(`Cannot merge unsupported type ${options.format} in`),
          chalk.bgBlue(targetFile)
        );
      }
    } catch (error) {
      console.error(logSymbols.error, chalk.red(error), chalk.bgBlue(targetFile));
    }
  } else {
    console.info(logSymbols.info, chalk.cyan(`Creating ${options.format}`), chalk.bgBlue(targetFile));
    try {
      Fs.writeFileSync(targetFile, Fs.readFileSync(sourceFile, 'utf8'), 'utf8');

      console.info(logSymbols.success, chalk.green(`Created`), chalk.bgBlue(targetFile));
    } catch (error) {
      console.error(logSymbols.error, chalk.red(error), chalk.bgBlue(targetFile));
    }
  }
};
