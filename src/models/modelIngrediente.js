const sequelize = require('sequelize');
const db = require('../configuration/conexion');
const modeloIngrediente = db.define(

    "ingrediente",
    {
        id: {type: sequelize.INTEGER, primaryKey: true, autoIncrement: true, allowNullValues: true},
        proveedorId: {type: sequelize.INTEGER, allowNull: false},
        nombre: {type: sequelize.STRING(45), allowNull: false},
        descripcion: {type: sequelize.STRING(45), allowNull: true},
        cantidad: {type: sequelize.INTEGER, allowNull: true},
        precioCompra: {type: sequelize.DOUBLE, allowNull: false}
    },

    {
        tableName: "ingredientes",
        timestamps: false
    }
)

module.exports = modeloIngrediente;