# itChallengeApiRest

Para correr el api hay que crear una base de datos con el nombre tecso, ejecutar el script que se encuentra dentro de la carpeta database y modificar en el archivo

src/index.js poniendo las credenciales para acceder a la base de datos.

global.db = new Sequelize('tecso', 'postgres', 'contraseña', {
    host: 'localhost',
    dialect: 'postgres'
});
