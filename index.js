const functions = require('./functions')
//console.log(functions)

function mdLinks(path, options) {
  return new Promise((resolve, reject) => {
    let absolutePath = '';
    //return returnValues
    if (!functions.validatePath(path)) {
      reject('Invalid path');
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
      reject("It's not a file")
    };
    if (functions.identifyFileExtension(absolutePath) === '.md') {
      if (!options.validation) {
        resolve(functions.getLinks(absolutePath))
      } else {
        functions.validateLinks(absolutePath).then((data) => resolve(data))
          .catch((error) => reject(error))
      }
    } else {
      reject("It's not an md file")
    }
  })
}
let options = {
  validation: true
};
//mdLinks('example.md', options).then((data) => console.log( data))
  //.catch((error) => console.log(error))


  module.exports = {
    mdLinks: mdLinks
  }