// Dar un path (ejemplo)

// 1) Verificar que el path es válido -----> T/F

// 2) Si es válida (T) -----> Validar ruta absoluta -----> T/F

// 3) Si no es absoluta (F) -----> convetir



const path = require('path');
const fs = require('fs');

const examplePath = __filename; //Debe ser un string vacío/ Se llena para pruebas aquí // Con filename si lo valida correctamente

// 1)
function validatePath(userPath) { //Solo acepta rutas relativas **SOLUCIONAR**
    try {
        fs.accessSync(userPath);
        console.log('Valid path')
        validateAbsolutePath(userPath);
        return true;
    } catch (error) {
        console.log('Invalid path')
        return false;
    }
}
validatePath(examplePath);

// 2)
function validateAbsolutePath(userPath) { //REVISAR EL CASO TRUE//
    const validatedAbsolutePath = path.isAbsolute(userPath);
    const absolutePath = '';
    console.log('Absolute Path is ' + validatedAbsolutePath)
    if (validatedAbsolutePath === true){
        console.log(userPath);
        absolutePath = userPath;
        console.log('Absolute path:', absolutePath);       
        return absolutePath;
    }else{
        convertToAbsolutePath(userPath)
    }
};

// 3)
function convertToAbsolutePath(relativePath) {
    const absolutePath = path.resolve(relativePath);
    console.log('Absolute path:', absolutePath);
    return absolutePath
};
