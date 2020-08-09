const Sequelize = require('sequelize');
const Docente = require('./docente');
const Carrera = require('./carrera');

const Curso = db.define('curso', {
    identificador: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    idcarrera: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    nombre: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    descripcion: {
        type: Sequelize.TEXT,
        allowNull: true
    },
    cupomaximo: {
        type: Sequelize.SMALLINT,
        allowNull: false
    },
    anio: {
        type: Sequelize.SMALLINT,
        allowNull: false
    },
    iddocente: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'curso',
    timestamps: false
});
Curso.belongsTo(Docente, { foreignKey: 'iddocente', as: 'docente' });
Curso.belongsTo(Carrera, { foreignKey: 'idcarrera', as: 'carrera' });
module.exports = Curso;