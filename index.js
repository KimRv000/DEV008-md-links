const functions = require('./functions')
//console.log(functions)

function mdLinks(path, options){
let absolutePath = '';
let returnValues = [];

if (!functions.validatePath(path)) {
  return false;
}
if (functions.validateAbsolutePath(path)) {
  //console.log('Absolute Path is ' + path)
  absolutePath = path;
} else {
  //console.log('Absolute Path is ' + functions.convertToAbsolutePath(path))
  absolutePath = functions.convertToAbsolutePath(path)
};
//console.log(absolutePath);
if (!functions.identifyFile(absolutePath)) {
  return false
};
if (functions.identifyFileExtension(absolutePath) === '.md') {
  returnValues.push(functions.getLinks(absolutePath));
} else {
  return false
};
console.log(returnValues)
return returnValues
}
mdLinks('example.md')


module.exports = {
  mdLinks: mdLinks
}