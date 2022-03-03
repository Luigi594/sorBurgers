const sequelize = require('sequelize');
const db = require('../configuration/conexion');
const Venta = require('../models/modelVenta')
const modeloVentaDetalle = db.define(

    "venta_detalle",
    {
        id: {type: sequelize.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false},
        //ventaId: {type: sequelize.INTEGER, allowNull: false},
        productoId: {type: sequelize.INTEGER, allowNull: false},
        cantidad: {type: sequelize.INTEGER, allowNull: false},
        importe: {type: sequelize.DOUBLE, allowNull: true, defaultValue: null},
    },
    {
        tableName: "venta_detalle",
        timestamps: false
    }
);

modeloVentaDetalle.belongsTo(Venta);

module.exports = modeloVentaDetalle;