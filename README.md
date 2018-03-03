
## Setup del entorno de desarrollo
Necesitas instalar:
* Git
* Node v8.9.1
* Visual Studio Code

## Instalar librerías necesarias

Si se está utilizando nvm, asegurarse que se está usando la versión de node correcta.

$ nvm use 8.9.1

Instalar las librerías

$ npm install

La configuacion del la base de datos se encuentra
/server/config/environment/development.js

"postgresql://postgres:postgres@localhost/hackday"

## Ejecucion Desarrollo

$ npm start

Navegar en `http://localhost:3000/` 
