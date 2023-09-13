// Dar un path 

// 1) Verificar que el path es válido -----> T/F

// 2) Si es válida (T) -----> Validar ruta absoluta -----> T/F

// 3) Si no es absoluta (F) -----> convetir 

// 4) Identificar si es archivo o directorio -----> trabajar con archivo

// 5) Archivo -----> identificar extensión .md

// 6) Leer el archivo

// 7) Identificar links

//**COMPLETADO**//  FUNCIONA (PROBADO)

// 8) Validar links  //solicitud HTTP// 

//Hacer función que me devuelva un objeto por cada validación de cada link-----> valor de retorno//



//Crear objeto de option con propiedad validate//

//---------*****---------Funciones de ejemplo están comentadas------------*****-----------//


const path = require('path');
const fs = require('fs');
const https = require('https');
const marked = require('marked');

const examplePath = 'example.md'; //Debe ser un string vacío/ Se llena para pruebas aquí // Con filename si lo valida correctamente

//FUNCION QUE RELACIONA TODAS LAS FUNCIONES//

//Options ---> validate (objeto)
const options = {
  validate: true
};
function mdLinksTaster(userPath, options) {  //AQUI SE JUNTAN TODAS LAS FUNCIONES Y SE RELACIONAN  - hacerlo en mdLinks // FUNCIONA //
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
//mdLinksTaster('C:/Users/Kimberly/Documents/Laboratoria-Dev008/DEV008-md-links/testing_docs/DataLovers.md');  //EJEMPLO//**/

/*--------------------------- PRUEBAS PARA OBJETO CON VALOR DE RETORNO  --------------------------------*/

function createReturnValuesObject() {
  const returnValues = {
    href: link,
    text: linkText,
    file: filePath,
    status: statusCode,
    ok: statusMessage
  };
};

// 1)
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

// 2)
function validateAbsolutePath(userPath) {
  const validatedAbsolutePath = path.isAbsolute(userPath);
  console.log('Absolute Path is ' + validatedAbsolutePath)
  return validatedAbsolutePath;
};

// 3)
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

//4
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

// 5)
function identifyFileExtension(filePath) {
  const fileExt = path.extname(filePath);
  //console.log('File extension: ' + fileExt);
  return fileExt;
};
//const fileExt = identifyFileExtension(convertedAbsolutePath);

// 6) //Lee archivos//

function readFileSync(filePath) {
  const fileData = fs.readFileSync(filePath, 'utf8');
  console.log(fileData);
  return fileData;
};
//const readFileSync = readFile(convertedAbsolutePath);

/*
function readFiles(filePath) { //NO FUNCIONA //
  const dataFile = fs.readFile(filePath, 'utf8', (data) => {
          console.log(data)
  }
  );
  return dataFile;
};
readFiles('C:/Users/Kimberly/Documents/Laboratoria-Dev008/DEV008-md-links/example.md')
*/

// 7) //Lee y encuentra los links en un archivo//
function findLinksInFile(filePath) {
  const fileData = readFiles(filePath);
  const linkRegex = /https?:\/\/[^\s]+/g;
  const links = fileData.match(linkRegex); 
  console.log('Links:', links);
  return links; //Devuelve un array con los links //
};
const links = findLinksInFile('C:/Users/Kimberly/Documents/Laboratoria-Dev008/DEV008-md-links/example.md');
//const link = links.forEach((link)=> console.log(link)); //--------------->PRUEBAS PARA TEXTO EN LOS LINKS
/*--------------------------- PROBADO--------------------------------*/

/*--------------------------- PRUEBAS PARA STATUS y OK (Mensaje) --------------------------------*/

// 8) petición HTTP  // Se puede separar en dos, una función que valide y otra que muestre el mensaje //
function validateLink(link) {
  return fetch(link)
    .then(response => {
      if (response.status <= 200 && response.status < 400) {
        console.log(response.statusText);
      } else {
        console.log("FAIL");
      }
      return response.status;
    })
  //.then(response => console.log(response.status))
  //.catch (error=> console.log('Error:', error)); 
}

function getLinkText(link) {
  return fetch(link)
    .then(response => {
      console.log(response.text())
    })
}
getLinkText('https://www.youtube.com/')

/*function validateLink(link) {
  return fetch(link)
      .then(response => response.status)
  };

function validateLinkMessage(statusCode){
  let message = '';
  if (statusCode <= 200 && statusCode < 400) {
    console.log('ok')
    message = 'ok'
  } else {
    console.log('fail');
    message ='fail'
  }
  return message;
};*/


/*function validatedLink(filePath) {
  const links = findLinksInFile(filePath)
  const statusValidation = validateLinkMessage(statusCode);
  links.forEach(link => {
    validateLink(link)
      .then(statusCode => {
        console.log(`Link: ${link} Status Code: ${statusCode} Status Message:${statusValidation} `);
      })
      .catch((error) => {
        console.error(error);
      });
  });
};*/

function validatedLink(filePath) {
  const links = findLinksInFile(filePath)
  links.forEach(link => {
    validateLink(link)
      .then(statusCode => {
        console.log(`Link: ${link} Status Code: ${statusCode} `);
      })
      .catch((error) => {
        console.error(error);
      });
  });
};
//validatedLink('C:/Users/Kimberly/Documents/Laboratoria-Dev008/DEV008-md-links/testing_docs/DataLovers.md') //EJEMPLO//FUNCIONA ---> 404
//validatedLink('C:/Users/Kimberly/Documents/Laboratoria-Dev008/DEV008-md-links/example.md') //EJEMPLO// FUNCIONA ---> 200
//console.log(validateLink('https://www.youtube.com/'))// FUNCIONA

/*--------------------------- PRUEBAS PARA ETIQUETAS <a> --------------------------------*/

//función para identificar etiquetas <a>*******

/*function identifyLabels(filePath) { //NO FUNCIONA
  const data = readFile(filePath)
  const labels = data.getElementsByTagName('a');
  //console.log(data);
  console.log(labels);
  return labels
}*/
//identifyLabels('C:/Users/Kimberly/Documents/Laboratoria-Dev008/DEV008-md-links/example.md')

//************** Función para obtener texto de las labels//********** 
/*function getTextInLabel(labelElement) {
  //const labelText = getTextInLabel(label);
  return labelElement.textContent;
}*/

//************* Función para obtener href de las labels//**********

/***********************Función para crear el objeto que va a devolver la función mdLinks//********/

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