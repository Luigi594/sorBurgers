const sequelize = require('sequelize');
const db = require('../configuration/conexion');
const Producto = require('../models/modelProducto');
const Cliente = require('../models/modelCliente');
const modeloCarrito = db.define(
    "carrito",
    {
        id: {type: sequelize.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false},
        //clienteId: {type: sequelize.INTEGER, allowNull: true, defaultValue: null},
        //productoId: {type: sequelize.INTEGER, allowNull: false},
        nombreProducto: {type: sequelize.STRING(45), allowNull: false},
        precio: {type: sequelize.DOUBLE, allowNull: false},
        cantidad: {type: sequelize.INTEGER, allowNull: false, defaultValue: 1}
    },
    {
        tableName: "carrito",
        timestamps: false
    }
);
modeloCarrito.belongsTo(Producto);
modeloCarrito.belongsTo(Cliente);
module.exports = modeloCarrito;
