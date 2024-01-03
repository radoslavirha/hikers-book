#! /usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
const commander_1 = require("commander");
const log_symbols_1 = __importDefault(require("log-symbols"));
const config_1 = require("./config");
const copy_1 = require("./copy");
console.info(log_symbols_1.default.info, chalk_1.default.green(`Using Hiker's Book CLI`));
const program = new commander_1.Command();
program
    .command('config')
    .description('CLI for creating/merging configs')
    .argument('<source>', 'Source config file')
    .argument('<target>', 'Target config file')
    .addOption(new commander_1.Option('-f, --format  [format]', 'Format of the config file').choices(['json', 'dotenv']).default('json'))
    .action((source, target, options) => {
    return (0, config_1.config)(source, target, options);
});
program
    .command('copy-views')
    .description('CLI for copying views from @hikers-book/tsed-common')
    .action(() => {
    return (0, copy_1.copy)();
});
program.parse(process.argv);
