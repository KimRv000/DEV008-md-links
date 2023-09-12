const { error } = require('console');
const fs = require('fs');
const path = require('path');

// Funcion para leer archivos ------FUNCIONA----------//
function readFile(userPath) {
    const dataFile = fs.readFile(userPath, 'utf8', (err, data) => {
        if (err) {
            console.log(err)
            return false
        } else {
            console.log(data)
        }
    }
    );
    return dataFile;
};
//readFile('C:/Users/Kimberly/Documents/Laboratoria-Dev008/DEV008-md-links/example.md')

// Funcion para saber extensión de archivos ------ FUNCIONA ----------//

function fileExt(userPath) {
    const ext = path.extname(userPath);
    console.log('This file ext is ' + ext)
    return ext;
};
//fileExt('C:/Users/Kimberly/Documents/Laboratoria-Dev008/DEV008-md-links/example.md')

// Funcion para leer directorios ------ FUNCIONA ----------//Devuelve array cn contenido//
function readDirectory(userPath) {
    const directory = fs.readdirSync(userPath, 'utf8')
    console.log(directory);
    return directory;
};
//readDirectory('C:/Users/Kimberly/Documents/Laboratoria-Dev008/DEV008-md-links/testing_docs/Social Networks')

//---------------------PRUEBAS CON PROMESAS----------------------//

//Declarar una promesa..............//
/*
let promiseOne = new Promise((resolve, reject)=>{
    const sum = 1+2
    resolve(sum);
    reject(new Error("…")); // ignorado

  });
  //console.log(promiseOne);

//Para mandar a llamar a la promesa.........//
  const promiseTesting =
  promiseOne.finally(() => console.log("Promesa lista"))
  promiseOne.then((result) => console.log(result));
  promiseOne.catch((error)=> console.log(error));
  */
//Opción 1//
/*
function delay(ms) {
    const promise = new Promise((resolve, reject) => {
        setTimeout(() => resolve('hello'), ms)
    });
    return promise
};
 delay(3000).then(() => console.log('se ejecuta después de 3 segundos'));
console.log(result)//No sencesita declarar la constante ni éste console.log//


//Opción 2//Más simplificada//
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  } 
  delay(3000).then(() => console.log('runs after 3 seconds'));
  */

//-----------PRUEBAS Marked---------//

const { marked } = require('marked');

 const html = marked('# Marked in Node.js\n\nRendered by **marked**.'); //opcional marked.parse('')
 //console.log(html)

// //--------------------PRUEBAS Cheerio---------------//
const cheerio = require('cheerio');

// const $ = cheerio.load(html);
// console.log($.text());

//---------------PRUEBAS para cambiar un archivo a html-----------//

const filePath = 'C:/Users/Kimberly/Documents/Laboratoria-Dev008/DEV008-md-links/example.md';
const fileContent = fs.readFileSync(filePath, 'utf-8');
const htmlContent = marked(fileContent);
//console.log(htmlContent);// FUNCIONA-----Convierte el documento en html//

//---------Para encontrar etiquetas <a>------------//
const $ = cheerio.load(htmlContent);
//const aLabels = $('a').map((index, element) => console.log($(element).text())).get();//---text--//
//const hrefLabels = $('a').map((index, element) => console.log($(element).attr('href'))).get();//---href--//
//console.log('aaaaaaa', $('a[href]'));

  //--------FUNCIONA--------------// Metodo push va agregando al array

  const aLabels = [];

  $('a').each(function() {
    const text = aLabels.push($(this).text());
  });

//--------FUNCIONA--------------//
 $('a').each(function() {
  const text = ($(this).text());
  console.log(text)
  const link = ($(this).attr('href'));
  console.log(link)
console.log( text)
});