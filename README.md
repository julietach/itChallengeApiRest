# itChallengeApiRest

Para correr el api hay que crear una base de datos con el nombre tecso y ejecutar el script que se encuentra dentro de la carpeta database.
Luego modificar en el archivo src/index.js poniendo las credenciales correspondiente para acceder a la base de datos.

Ejemplo
global.db = new Sequelize('tecso', 'postgres', 'contraseña', {
    host: 'localhost',
    dialect: 'postgres'
});
