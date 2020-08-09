const Sequelize = require('sequelize');
const Persona = require('./Persona');

const Alumno = db.define('alumno', {
    identificador: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    idpersona: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    legajo: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'alumno',
    timestamps: false
});
Alumno.belongsTo(Persona, { foreignKey: 'idpersona', as: 'persona' });
module.exports = Alumno;