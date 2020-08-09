const Sequelize = require('sequelize');

const Persona = db.define('persona', {
    identificador: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    tipodoc: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    documento: {
        type: Sequelize.BIGINT,
        allowNull: false
    },
    nombre: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    apellido: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    fechanac: {
        type: Sequelize.DATE,
        allowNull: false
    },
    direccion: {
        type: Sequelize.TEXT,
        allowNull: true
    }
}, {
    tableName: 'persona',
    timestamps: false,
    associations: true
});
module.exports = Persona;