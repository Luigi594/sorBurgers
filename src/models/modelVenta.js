const sequelize = require('sequelize');
const db = require('../configuration/conexion');
const Empleado = require('../models/modelEmpleado');
const Cliente = require('../models/modelCliente');
const modeloVenta = db.define(

    "ventas",
    {
        id: {type: sequelize.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false},
        //empleadoId: {type: sequelize.INTEGER, allowNull: false},
        //clienteId: {type: sequelize.INTEGER, allowNull: false},
        fechaVenta: {type: sequelize.DATE, allowNull: false},
        impuesto: {type: sequelize.DOUBLE, allowNull: true, defaultValue: null},
        subtotal: {type: sequelize.DOUBLE, allowNull: false},
    },
    {
        tableName: "ventas",
        timestamps: false
    }
);

modeloVenta.belongsTo(Empleado);
modeloVenta.belongsTo(Cliente);

module.exports = modeloVenta;