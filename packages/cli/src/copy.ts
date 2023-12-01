import Fs from 'fs';
import { globSync } from 'glob';
import path from 'path';

export const copy = (): void => {
  const viewsSource = path.join(__dirname, '../../tsed-common/src/views/');
  const viewsTarget = path.join(process.cwd(), 'views');

  const glob = globSync(`${viewsSource}/**/*.ejs`);

  for (const file of glob) {
    const view = file.replace(viewsSource, '');
    const destination = path.join(viewsTarget, view);
    const dir = path.dirname(destination);

    if (!Fs.existsSync(dir)) {
      Fs.mkdirSync(dir);
    }

    Fs.writeFileSync(destination, Fs.readFileSync(file, 'utf8'), 'utf8');
  }
};
