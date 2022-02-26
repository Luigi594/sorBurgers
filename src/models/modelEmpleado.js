const sequelize = require('sequelize');
const db = require('../configuration/conexion');
const modeloEmpleado = db.define(

    "empleado",
    {
        id: {type: sequelize.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false},
        //puestoId: {type: sequelize.INTEGER, allowNull: false},
        nombre: {type: sequelize.STRING(45), allowNull: false},
        apellido: {type: sequelize.STRING(45), allowNull: false},
        telefono: {type: sequelize.STRING(20), allowNull: false},
        fechaNacimiento: {type: sequelize.DATE, allowNull: false},
        estado: {type: sequelize.ENUM('AC', 'NA'), allowNull: false, defaultValue: 'AC'}
    },
    {
        tableName: "empleados",
        timestamps: false
    }
)

// 
// modeloEmpleado.belongsTo(puesto)
module.exports = modeloEmpleado;