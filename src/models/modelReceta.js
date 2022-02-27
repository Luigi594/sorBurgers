const sequelize = require('sequelize');
const db = require('../configuration/conexion');
const modeloReceta = db.define(

    "receta",
    {
        id: {type: sequelize.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false},
        descripcion: {type: sequelize.STRING(500), allowNull: false}
    },
    {
        tableName: "recetas",
        timestamps: false
    }
);

module.exports=modeloReceta;