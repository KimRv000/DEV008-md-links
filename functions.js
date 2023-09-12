const path = require('path');
const fs = require('fs');

const { marked } = require('marked');
const cheerio = require('cheerio');

const examplePath = 'example.md';

//PRUEBA DE FUNCION mdLinks - hacerlo en mdLinks // FUNCIONA //
/*
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
    findLinksInFile(absolutePath);
  } else {
    return false
  };
  return validatedLink(userPath);
};
//mdLinksTaster('example.md');  //EJEMPLO//*
*/

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
    findLinksInFile(absolutePath);
  } else {
    return false
  };
  return validatedLink(userPath);
};
//mdLinksTaster('example.md');  //EJEMPLO//**/

/*--------------------------- PRUEBAS PARA OBJETO CON VALOR DE RETORNO  --------------------------------*/

function validatePath(userPath) {
  try {
    fs.accessSync(userPath);
    console.log('Valid path')
    return true;
  } catch (error) {
    console.log('Invalid path')
    return false;
  }
}
//validatePath(examplePath);  //EJEMPLO//

function validateAbsolutePath(userPath) {
  const validatedAbsolutePath = path.isAbsolute(userPath);
  console.log('Absolute Path is ' + validatedAbsolutePath)
  return validatedAbsolutePath;
};

function convertToAbsolutePath(relativePath) {
  const absolutePath = path.resolve(relativePath);
  //console.log('Absolute path:', absolutePath);
  return absolutePath
};
//const convertedAbsolutePath = convertToAbsolutePath(examplePath);

//---------FUNCION PARA CREAR PATH ABSOLUTO-----------// 
function createAbsolutePath(userPath) {
  let absolutePath = '';
  if (validatePath(userPath) === true) {
    if (validateAbsolutePath(userPath) === true) {
      console.log('Absolute Path is ' + userPath)
      absolutePath = userPath;
    } else {
      absolutePath = convertToAbsolutePath(userPath)
    };
  }
  console.log(absolutePath);
  return absolutePath
}
//const absolutePath = createAbsolutePath(examplePath);

function identifyFile(filePath) {
  try {
    const stats = fs.statSync(filePath);
    if (stats.isFile()) {
      //console.log(stats);
      console.log(`${filePath} is a file.`);
      return true;
    } else {
      console.log(`${filePath} is not a file.`);
      return false;
    }
  } catch (error) {
    //console.log('Error:', error);
  }
};
//identifyFile(convertedAbsolutePath);

function identifyFileExtension(filePath) {
  const fileExt = path.extname(filePath);
  //console.log('File extension: ' + fileExt);
  return fileExt;
};
//const fileExt = identifyFileExtension(convertedAbsolutePath);

//Lee archivos//
function readFile(filePath) {
  const fileData = fs.readFileSync(filePath, 'utf8');
  //console.log(fileData);
  return fileData;
};
//const fileData = readFile(convertedAbsolutePath);

function getLinks(userPath) {
  let linksData = [];
  const fileContent = readFile(userPath);
  const htmlContent = marked(fileContent);
  const $ = cheerio.load(htmlContent);
  $('a').each(function () {
    const text = ($(this).text());
    const link = ($(this).attr('href'));
    linksData.push({
      href: link,
      text: text
    })
  });
  //console.log(linksData)
  return linksData
};
const links = getLinks('example.md');
console.log(links);

const validateLinks = (userPath) =>{
  new Promise((resolve, reject) => {
    let links = [];

  })
}

/*
//------------Para validar los links-------------------//
let promiseValidateLink = new Promise(function(resolve, reject) {
  resolve(console.log('Done'));
  reject(new Error("error"));
});

function validateLink(links) {
  let validatedLinks = [];
  links.forEach((element) => {
    fetch(element)
      .then(response => {
        const linkStatus = {
          href: response.url,
          //text: response.textContent,
          status: response.status,
          ok: response.statusText
        }
        validatedLinks.push(linkStatus)
        //console.log(validatedLinks)
        return validatedLinks
      })
      .catch(error => console.log('FAIL'));
  })
}
promiseValidateLink.then( response => {
  const links = linksText()
   const testingValidation = validateLink(links)
   console.log(testingValidation)
   return testingValidation
  }
)
testingValidation = validateLink(['https://www.youtube.com/', 'https://www.instagram.com/', 'https://www.facebook.com/']);
//console.log(testingValidation)
*/


module.exports = {
    validatePath: validatePath
}