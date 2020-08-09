const Sequelize = require('sequelize');
const Carrera = require('./carrera');
const Alumno = require('./alumno');

const InscripcionesCarrera = db.define('inscripciones_carrera', {
    idalumno: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    idcarrera: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    fechainscripcion: {
        type: Sequelize.DATE,
        allowNull: false,
        primaryKey: true
    }
}, {
    tableName: 'inscripciones_carrera',
    timestamps: false
});
InscripcionesCarrera.belongsTo(Alumno, { foreignKey: 'idalumno', as: 'alumno' });
InscripcionesCarrera.belongsTo(Carrera, { foreignKey: 'idcarrera', as: 'carrera' });
module.exports = InscripcionesCarrera;