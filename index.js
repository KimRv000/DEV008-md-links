const functions = require('./functions')
//console.log(functions)

function mdLinks(path, options){
let absolutePath = '';

if (!functions.validatePath(path)) {
  return false;
}
if (functions.validateAbsolutePath(path)) {
  console.log('Absolute Path is ' + path)
  absolutePath = path;
} else {
  console.log('Absolute Path is ' + functions.convertToAbsolutePath(path))
  absolutePath = functions.convertToAbsolutePath(path)
};
//console.log(absolutePath);
if (!functions.identifyFile(absolutePath)) {
  return false
};
if (functions.identifyFileExtension(absolutePath) === '.md') {
  functions.getLinks(absolutePath);
} else {
  return false
};
}
mdLinks('example.md')
