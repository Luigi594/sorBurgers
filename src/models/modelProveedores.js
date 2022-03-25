const sequelize = require('sequelize');
const db = require('../configuration/conexion');
const modeloProveedores = db.define(

    "proveedores",
    {
        id: {type: sequelize.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false},
        nombreProveedor: {type: sequelize.STRING(45), allowNull: false},
        empresa: {type: sequelize.STRING(45), allowNull: false},
        direccion: {type: sequelize.STRING(45), allowNull: false},
        telefono: {type: sequelize.STRING(45), allowNull: false},
        correo: {type: sequelize.STRING(45), allowNull: true},
    },
    {
        tableName: "proveedores",
        timestamps: false
    }
)


module.exports = modeloProveedores;