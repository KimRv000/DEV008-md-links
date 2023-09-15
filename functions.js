const path = require('path');
const fs = require('fs');

const { marked } = require('marked');
const cheerio = require('cheerio');

const examplePath = 'example.md';

//PRUEBA DE FUNCION mdLinks - hacerlo en mdLinks // FUNCIONA //

function mdLinksTaster(userPath, options) {
  let absolutePath = '';

  if (!validatePath(userPath)) {
    return false;
  }
  if (validateAbsolutePath(userPath)) {
    console.log('Absolute Path is ' + userPath)
    absolutePath = userPath;
  } else {
    console.log('Absolute Path is ' + convertToAbsolutePath(userPath))
    absolutePath = convertToAbsolutePath(userPath)
  };
  //console.log(absolutePath);
  if (!identifyFile(absolutePath)) {
    return false
  };
  if (identifyFileExtension(absolutePath) === '.md') {
    getLinks(absolutePath);
  } else {
    return false
  };
};
//mdLinksTaster('example.md');  //EJEMPLO//*

/*--------------------------- PRUEBAS PARA OBJETO CON VALOR DE RETORNO  --------------------------------*/

function validatePath(userPath) {
  try {
    fs.accessSync(userPath);
    //console.log('Valid path')
    return true;
  } catch (error) {
    //console.log('Invalid path')
    return false;
  }
}
//validatePath(examplePath);  //EJEMPLO//

function validateAbsolutePath(userPath) {
  const validatedAbsolutePath = path.isAbsolute(userPath);
  //console.log('Absolute Path is ' + validatedAbsolutePath)
  return validatedAbsolutePath;
};

function convertToAbsolutePath(relativePath) { //--------------------------REVISAR-------------------------//
  let absolutePath = '';
  const absolutePathResolved = path.resolve(relativePath);
  if (absolutePathResolved.includes,('\\')) {
    const newAbsolutePath = absolutePathResolved.replaceAll('\\', '/');
    absolutePath = newAbsolutePath
  }
  //console.log('Absolute path:', absolutePath);
  return absolutePath
};
//convertToAbsolutePath(examplePath);

//---------FUNCION PARA CREAR PATH ABSOLUTO-----------// 
function createAbsolutePath(userPath) {
  let absolutePath = '';
  if (validatePath(userPath)) {
    if (validateAbsolutePath(userPath)) {
      //console.log('Absolute Path is ' + userPath)
      absolutePath = userPath;
    } else {
      absolutePath = convertToAbsolutePath(userPath)
    };
  }
  //console.log(absolutePath);
  return absolutePath
}
//createAbsolutePath(examplePath);

function identifyFile(filePath) {
  try {
    const stats = fs.statSync(filePath);
    if (stats.isFile()) {
      //console.log(stats);
      //console.log(`${filePath} is a file.`);
      return true;
    } else {
      //console.log(`${filePath} is not a file.`);
      return false;
    }
  } catch (error) {
    //console.log('Error:', error);
  }
};
//identifyFile(convertedAbsolutePath);

function identifyFileExtension(filePath) {
  const fileExt = path.extname(filePath);
  console.log('File extension: ' + fileExt);
  return fileExt;
};
//identifyFileExtension(examplePath);

//Lee archivos//
function readFile(filePath) {
  const fileData = fs.readFileSync(filePath, 'utf8');
  //console.log(fileData);
  return fileData;
};
//const fileData = readFile(examplePath);

function getLinks(userPath) {
  let linksData = [];
  const fileContent = readFile(userPath);
  const htmlContent = marked(fileContent);
  const $ = cheerio.load(htmlContent);
  $('a').each(function () {
    const text = ($(this).text());
    const link = ($(this).attr('href'));
    linksData.push({
      file: userPath,
      href: link,
      text: text
    })
  });
  //console.log('Links: ', linksData)
  return linksData
};
// const links = getLinks('example.md');
// console.log(links);

const validateLinks = (userPath) => {
  return new Promise((resolve, reject) => {
    let linksArray = [];
    let linkData = {};
    const links = getLinks(userPath);
    //console.log(links)
    const linkValidation = links.map((link) => {
      return fetch(link.href)
        .then((response) => {
          //console.log(response, 'response')
          let ok = '';
          if (response.status <= 200 && response.status < 400) {
            ok = 'ok';
          } else {
            ok = 'fail';
          }
          linkData = {
            href: link.href,
            text: link.text,
            file: link.file,
            status: response.status,
            ok: ok
          }
          //console.log(prueba)
          return linkData
        })
    })
    Promise.all(linkValidation).then(value => {
      linksArray.push(value)
      resolve(linksArray)
    })
  })
};
validateLinks('C:/Users/Kimberly/Documents/Laboratoria-Dev008/DEV008-md-links/example.md').then(data => {
  console.log(data)
})
  .catch(error => console.log('Invalid link'));

module.exports = {
  validatePath: validatePath,
  validateAbsolutePath: validateAbsolutePath,
  convertToAbsolutePath: convertToAbsolutePath,
  createAbsolutePath: createAbsolutePath,
  identifyFile: identifyFile,
  identifyFileExtension,
  readFile: readFile,
  getLinks: getLinks,
  validateLinks: validateLinks,
}