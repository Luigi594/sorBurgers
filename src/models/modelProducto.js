/*const sequelize = require('sequelize');
const db = require('../configuration/conexion');
const Receta = require('../models/modelReceta');
const modeloProducto = db.define(

    "producto",
    {
        id: {type: sequelize.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false},
        recetaId: {type: sequelize.INTEGER, allowNull: false},
        nombre: {type: sequelize.STRING(45), allowNull: false},
        descripcionProducto: {type: sequelize.STRING(250), allowNull: false},
        precio: {type: sequelize.DOUBLE, allowNull: false}
    },
    {
        tableName: "productos",
        timestamps: false
    }
);
modeloUsuario.belongsTo(Receta);
module.exports = modeloProducto;
*/