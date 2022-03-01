const sequelize = require('sequelize');
const db = require('../configuration/conexion');
const modeloCliente = db.define(

    "cliente",
    {
        id: {type: sequelize.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false},
        nombre: {type: sequelize.STRING(45), allowNull: false},
        apellido: {type: sequelize.STRING(45), allowNull: false},
        telefono: {type: sequelize.STRING(20), allowNull: false},
        fechaNacimiento: {type: sequelize.DATE, allowNull: false},
        estado: {type: sequelize.ENUM('AC', 'NA'), allowNull: false, defaultValue: 'AC'},
        imagen: {type: sequelize.STRING(250), allowNull: true}
    },
    {
        tableName: "clientes",
        timestamps: false
    }
);

module.exports = modeloCliente;