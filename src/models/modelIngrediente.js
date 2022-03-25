const sequelize = require('sequelize');
const db = require('../configuration/conexion');
const Proveedores = require('../models/modelProveedores');
const modeloIngrediente = db.define(

    "ingrediente",
    {
        id: {type: sequelize.INTEGER, primaryKey: true, autoIncrement: true, allowNullValues: true},
        nombre: {type: sequelize.STRING(45), allowNull: false},
        descripcion: {type: sequelize.STRING(45), allowNull: true},
        precioCompra: {type: sequelize.DOUBLE, allowNull: false},
        cantidad: {type: sequelize.INTEGER, allowNull: true}
    },

    {
        tableName: "ingredientes",
        timestamps: false
    }
)
modeloIngrediente.belongsTo(Proveedores);
module.exports = modeloIngrediente;