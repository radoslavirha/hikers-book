"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.copy = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const glob_1 = require("glob");
const copy = () => {
    const viewsSource = path_1.default.join(__dirname, '../../tsed-common/src/views/');
    const viewsTarget = path_1.default.join(process.cwd(), 'views');
    const glob = (0, glob_1.globSync)(`${viewsSource}/**/*.ejs`);
    for (const file of glob) {
        const view = file.replace(viewsSource, '');
        const destination = path_1.default.join(viewsTarget, view);
        const dir = path_1.default.dirname(destination);
        if (!fs_1.default.existsSync(dir)) {
            fs_1.default.mkdirSync(dir);
        }
        fs_1.default.writeFileSync(destination, fs_1.default.readFileSync(file, 'utf8'), 'utf8');
    }
};
exports.copy = copy;
