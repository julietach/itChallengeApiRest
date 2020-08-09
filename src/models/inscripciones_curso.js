const Sequelize = require('sequelize');
const Alumno = require('./alumno');
const Curso = require('./curso');

const InscripcionesCurso = db.define('inscripciones_curso', {
    idalumno: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    idcurso: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    fechainscripcion: {
        type: Sequelize.DATE,
        allowNull: false,
        primaryKey: true
    },
    notafinal: {
        type: Sequelize.NUMBER,
        allowNull: true
    },
    estado: {
        type: Sequelize.TEXT,
        allowNull: true
    }
}, {
    tableName: 'inscripciones_curso',
    timestamps: false
});
InscripcionesCurso.belongsTo(Alumno, { foreignKey: 'idalumno', as: 'alumno' });
InscripcionesCurso.belongsTo(Curso, { foreignKey: 'idcurso', as: 'curso' });
module.exports = InscripcionesCurso;