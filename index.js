const functions = require('./functions')
console.log(functions, 'funciones')

// module.exports = () => {
//   // ...
// };

function mdLinks(path, options){
console.log(path);
const mainPath = functions.validatePath(path)
console.log(mainPath)


}

mdLinks('example.md')
