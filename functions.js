const path = require('path');
const fs = require('fs');

const { marked } = require('marked');
const cheerio = require('cheerio');

function validatePath(userPath) {
  try {
    fs.accessSync(userPath);
    //console.log('Valid path')
    return true;
  } catch (error) {
    //console.log('Invalid path')
    return false;
  }
};

function validateAbsolutePath(userPath) {
  const validatedAbsolutePath = path.isAbsolute(userPath);
  return validatedAbsolutePath;
};

function convertToAbsolutePath(relativePath) {
  let absolutePath = '';
  const absolutePathResolved = path.resolve(relativePath);
  if (absolutePathResolved.includes,('\\')) {
    const newAbsolutePath = absolutePathResolved.replaceAll('\\', '/');
    absolutePath = newAbsolutePath
  }
  //console.log('Absolute path:', absolutePath);
  return absolutePath
};

//---------FUNCION PARA CREAR PATH ABSOLUTO-----------// 
function createAbsolutePath(userPath) {
  let absolutePath = '';
  if (validatePath(userPath)) {
    if (validateAbsolutePath(userPath)) {
      absolutePath = userPath;
    } else {
      absolutePath = convertToAbsolutePath(userPath)
    };
  }
  //console.log(absolutePath);
  return absolutePath
};

function identifyFile(filePath) {
  try {
    const stats = fs.statSync(filePath);
    if (stats.isFile()) {
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

function identifyFileExtension(filePath) {
  const fileExt = path.extname(filePath);
  //console.log('File extension: ' + fileExt);
  return fileExt;
};

//Lee archivos//
function readFile(filePath) {
  const fileData = fs.readFileSync(filePath, 'utf8');
  //console.log(fileData);
  return fileData;
};

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

const validateLinks = (userPath) => {
  return new Promise((resolve, reject) => {
    let linkData = {};
    const links = getLinks(userPath);
    const linkValidation = links.map((link) => {
      return fetch(link.href)
        .then((response) => {
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
          return linkData
        })
    })
    Promise.all(linkValidation).then(value => {
      resolve(value)
    })
  })
};

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