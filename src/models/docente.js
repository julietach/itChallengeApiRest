const Sequelize = require('sequelize');
const Persona = require('./Persona');

const Docente = db.define('docente', {
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
    tableName: 'docente',
    timestamps: false
});
Docente.belongsTo(Persona, { foreignKey: 'idpersona', as: 'persona' });
module.exports = Docente;