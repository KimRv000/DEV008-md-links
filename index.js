const functions = require('./functions')

function mdLinks(path, options) {
  return new Promise((resolve, reject) => {
    let absolutePath = '';
    if (!functions.validatePath(path)) {
      reject('Invalid path');
    }
    if (functions.validateAbsolutePath(path)) {
      absolutePath = path;
    } else {
      absolutePath = functions.convertToAbsolutePath(path)
    };
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