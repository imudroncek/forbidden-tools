import { replaceInFile } from 'replace-in-file';

const optionsAssets = {
  files: './dist/index.html',
  from: /\/assets\//g,
  to: '/ft/assets/',
}

const optionsIcons = {
  files: './dist/index.html',
  from: [/\/favicon/g, /\/apple/g],
  to: ['/ft/favicon', '/ft/apple'],
}

try {
  let results = await replaceInFile(optionsAssets);
  console.log('Replacement results:', results);
  results = await replaceInFile(optionsIcons);
  console.log('Replacement results:', results);
}
catch (error) {
  console.error('Error occurred:', error);
}