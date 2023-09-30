#! /usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
const commander_1 = require("commander");
const fs_1 = __importDefault(require("fs"));
const json_merger_1 = require("json-merger");
const log_symbols_1 = __importDefault(require("log-symbols"));
console.info(log_symbols_1.default.info, chalk_1.default.green("Using Hiker's Book Config CLI"));
const program = new commander_1.Command();
program
    .description('Confi CLI for creating/merging configs')
    .requiredOption('-s, --source  [source]', 'Source config file')
    .requiredOption('-t, --target  [target]', 'Target config file')
    .addOption(new commander_1.Option('-f, --format  [format]', 'Format of the config file').choices(['json', 'dotenv']).default('json'))
    .parse(process.argv);
const options = program.opts();
const solveConfig = () => {
    if (!fs_1.default.existsSync(options.source)) {
        console.error(log_symbols_1.default.error, chalk_1.default.red(`Source file does not exist. Giving up.`), chalk_1.default.bgBlue(options.source));
        return;
    }
    if (fs_1.default.existsSync(options.target)) {
        try {
            if (options.format === 'json') {
                console.info(log_symbols_1.default.info, chalk_1.default.cyan(`Merging missing json entries from`), chalk_1.default.bgBlue(options.source), chalk_1.default.cyan(`into`), chalk_1.default.bgBlue(options.target));
                const target = fs_1.default.readFileSync(options.target, 'utf8');
                const source = fs_1.default.readFileSync(options.source, 'utf8');
                const result = (0, json_merger_1.mergeObjects)([JSON.parse(source), JSON.parse(target)]);
                fs_1.default.writeFileSync(options.target, JSON.stringify(result, null, 2), 'utf8');
                console.info(log_symbols_1.default.success, chalk_1.default.green(`Done`), chalk_1.default.bgBlue(options.target));
            }
            else if (options.format === 'dotenv') {
                console.info(log_symbols_1.default.warning, chalk_1.default.red(`Cannot merge missing entries for type ${options.format} in`), chalk_1.default.bgBlue(options.target));
            }
            else {
                console.info(log_symbols_1.default.warning, chalk_1.default.red(`Cannot merge unsupported type ${options.format} in`), chalk_1.default.bgBlue(options.target));
            }
        }
        catch (error) {
            console.error(log_symbols_1.default.error, chalk_1.default.red(error), chalk_1.default.bgBlue(options.target));
        }
    }
    else {
        console.info(log_symbols_1.default.info, chalk_1.default.cyan(`Creating ${options.format}`), chalk_1.default.bgBlue(options.target));
        try {
            fs_1.default.writeFileSync(options.target, fs_1.default.readFileSync(options.source, 'utf8'), 'utf8');
            console.info(log_symbols_1.default.success, chalk_1.default.green(`Created`), chalk_1.default.bgBlue(options.target));
        }
        catch (error) {
            console.error(log_symbols_1.default.error, chalk_1.default.red(error), chalk_1.default.bgBlue(options.target));
        }
    }
};
solveConfig();
