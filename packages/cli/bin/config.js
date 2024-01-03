'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { 'default': mod };
};
Object.defineProperty(exports, '__esModule', { value: true });
exports.config = void 0;
const chalk_1 = __importDefault(require('chalk'));
const fs_1 = __importDefault(require('fs'));
const json_merger_1 = require('json-merger');
const log_symbols_1 = __importDefault(require('log-symbols'));
const config = (sourceFile, targetFile, options) => {
  if (!fs_1.default.existsSync(sourceFile)) {
    console.error(log_symbols_1.default.error, chalk_1.default.red('Source file does not exist. Giving up.'), chalk_1.default.bgBlue(sourceFile));
    return;
  }
  if (fs_1.default.existsSync(targetFile)) {
    try {
      if (options.format === 'json') {
        console.info(log_symbols_1.default.info, chalk_1.default.cyan('Merging missing json entries from'), chalk_1.default.bgBlue(sourceFile), chalk_1.default.cyan('into'), chalk_1.default.bgBlue(targetFile));
        const target = fs_1.default.readFileSync(targetFile, 'utf8');
        const source = fs_1.default.readFileSync(sourceFile, 'utf8');
        const result = (0, json_merger_1.mergeObjects)([JSON.parse(source), JSON.parse(target)]);
        fs_1.default.writeFileSync(targetFile, JSON.stringify(result, null, 2), 'utf8');
        console.info(log_symbols_1.default.success, chalk_1.default.green('Done'), chalk_1.default.bgBlue(targetFile));
      }
      else if (options.format === 'dotenv') {
        console.info(log_symbols_1.default.warning, chalk_1.default.red(`Cannot merge missing entries for type ${options.format} in`), chalk_1.default.bgBlue(targetFile));
      }
      else {
        console.info(log_symbols_1.default.warning, chalk_1.default.red(`Cannot merge unsupported type ${options.format} in`), chalk_1.default.bgBlue(targetFile));
      }
    }
    catch (error) {
      console.error(log_symbols_1.default.error, chalk_1.default.red(error), chalk_1.default.bgBlue(targetFile));
    }
  }
  else {
    console.info(log_symbols_1.default.info, chalk_1.default.cyan(`Creating ${options.format}`), chalk_1.default.bgBlue(targetFile));
    try {
      fs_1.default.writeFileSync(targetFile, fs_1.default.readFileSync(sourceFile, 'utf8'), 'utf8');
      console.info(log_symbols_1.default.success, chalk_1.default.green('Created'), chalk_1.default.bgBlue(targetFile));
    }
    catch (error) {
      console.error(log_symbols_1.default.error, chalk_1.default.red(error), chalk_1.default.bgBlue(targetFile));
    }
  }
};
exports.config = config;
