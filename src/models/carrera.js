const Sequelize = require('sequelize');

const Carrera = db.define('carrera', {
    identificador: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    nombre: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    descripcion: {
        type: Sequelize.TEXT,
        allowNull: true
    },
    fechadesde: {
        type: Sequelize.DATE,
        allowNull: false
    },
    fechahasta: {
        type: Sequelize.DATE,
        allowNull: true
    }
}, {
    tableName: 'carrera',
    timestamps: false
});
module.exports = Carrera;