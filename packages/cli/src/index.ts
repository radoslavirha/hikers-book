#! /usr/bin/env node
import chalk from 'chalk';
import { Command, Option } from 'commander';
import logSymbols from 'log-symbols';
import { config } from './config';
import { copy } from './copy';
import { CLIConfigOptions } from './types';

console.info(logSymbols.info, chalk.green(`Using Hiker's Book CLI`));

const program = new Command();

program
  .command('config')
  .description('CLI for creating/merging configs')
  .argument('<source>', 'Source config file')
  .argument('<target>', 'Target config file')
  .addOption(
    new Option('-f, --format  [format]', 'Format of the config file').choices(['json', 'dotenv']).default('json')
  )
  .action((source: string, target: string, options: CLIConfigOptions): void => {
    return config(source, target, options);
  });

program
  .command('copy-views')
  .description('CLI for copying views from @hikers-book/tsed-common')
  .action((): void => {
    return copy();
  });

program.parse(process.argv);
