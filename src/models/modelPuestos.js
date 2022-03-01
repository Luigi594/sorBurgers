const sequelize = require('sequelize');
const db = require('../configuration/conexion');
const modeloPuestos = db.define(

    "puesto",
    {
        id: {type: sequelize.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false},
        descripcion: {type: sequelize.STRING(45), allowNull: false}
    },
    {
        tableName: "puesto",
        timestamps: false
    }
);

module.exports=modeloPuestos;