import { replaceInFile } from 'replace-in-file';

const options = {
  files: '/dist/index.html',
  from: '/assets/',
  to: '/ft/assets/',
}

try {
  const results = await replaceInFile(options)
  console.log('Replacement results:', results)
}
catch (error) {
  console.error('Error occurred:', error)
}