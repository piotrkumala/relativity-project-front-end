import { writeFile } from 'fs';
const targetPath = './src/environments/environment.prod.ts';

// eslint-disable-next-line no-undef
const envConfigFile = process.env['ENV'];

writeFile(targetPath, envConfigFile, 'utf8', (err) => {
  if (err) {
    return console.log(err);
  }
});
