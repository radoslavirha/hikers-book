#! /usr/bin/env node
import chalk from 'chalk';
import { Command, Option } from 'commander';
import Fs from 'fs';
import { mergeObjects } from 'json-merger';
import logSymbols from 'log-symbols';

console.info(logSymbols.info, chalk.green("Using Hiker's Book Config CLI"));

const program = new Command();
program
  .description('Confi CLI for creating/merging configs')
  .requiredOption('-s, --source  [source]', 'Source config file')
  .requiredOption('-t, --target  [target]', 'Target config file')
  .addOption(
    new Option('-f, --format  [format]', 'Format of the config file').choices(['json', 'dotenv']).default('json')
  )
  .parse(process.argv);

const options = program.opts<{ source: string; target: string; format: 'json' | 'dotenv' }>();

const solveConfig = (): void => {
  if (!Fs.existsSync(options.source)) {
    console.error(logSymbols.error, chalk.red(`Source file does not exist. Giving up.`), chalk.bgBlue(options.source));
    return;
  }
  if (Fs.existsSync(options.target)) {
    try {
      if (options.format === 'json') {
        console.info(
          logSymbols.info,
          chalk.cyan(`Merging missing json entries from`),
          chalk.bgBlue(options.source),
          chalk.cyan(`into`),
          chalk.bgBlue(options.target)
        );

        const target = Fs.readFileSync(options.target, 'utf8');
        const source = Fs.readFileSync(options.source, 'utf8');
        const result = mergeObjects([JSON.parse(source), JSON.parse(target)]);
        Fs.writeFileSync(options.target, JSON.stringify(result, null, 2), 'utf8');

        console.info(logSymbols.success, chalk.green(`Done`), chalk.bgBlue(options.target));
      } else if (options.format === 'dotenv') {
        console.info(
          logSymbols.warning,
          chalk.red(`Cannot merge missing entries for type ${options.format} in`),
          chalk.bgBlue(options.target)
        );
      } else {
        console.info(
          logSymbols.warning,
          chalk.red(`Cannot merge unsupported type ${options.format} in`),
          chalk.bgBlue(options.target)
        );
      }
    } catch (error) {
      console.error(logSymbols.error, chalk.red(error), chalk.bgBlue(options.target));
    }
  } else {
    console.info(logSymbols.info, chalk.cyan(`Creating ${options.format}`), chalk.bgBlue(options.target));
    try {
      Fs.writeFileSync(options.target, Fs.readFileSync(options.source, 'utf8'), 'utf8');

      console.info(logSymbols.success, chalk.green(`Created`), chalk.bgBlue(options.target));
    } catch (error) {
      console.error(logSymbols.error, chalk.red(error), chalk.bgBlue(options.target));
    }
  }
};

solveConfig();
