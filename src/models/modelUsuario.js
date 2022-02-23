const sequelize = require('sequelize');
const db = require('../configuration/conexion');
const bcrypt = require('bcrypt');
const Cliente = require('../models/modelCliente');
const Empleado = require('../models/modelEmpleado');

const modeloUsuario = db.define(

    "usuario",
    {
        Idusuario: {type: sequelize.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false},
        correo: {type: sequelize.STRING(45), allowNull: false},
        contrasenia: {type: sequelize.STRING(250), allowNull: false},
        estado: {type: sequelize.ENUM('AC', 'NA'), allowNull: false, defaultValue: 'AC'},
        pin: {type: sequelize.CHAR(5), allowNull: true},
        tipoUsuario: {type: sequelize.ENUM('CL', 'EM'), defaultValue: 'CL'}
    },
    {
        tableName: "usuarios",
        timestamps: false,
        hooks:{

            // encriptar la contraseña
            beforeCreate(usuario){
                const hash = bcrypt.hashSync(usuario.contrasenia, 10);
                usuario.contrasenia = hash;
            },
            beforeUpdate(usuario){
                const hash = bcrypt.hashSync(usuario.contrasenia, 10);
                usuario.contrasenia = hash;
            }
        }
    }
);

// definiendo las relaciones de tablas 1:1
modeloUsuario.belongsTo(Cliente);
modeloUsuario.belongsTo(Empleado);

// hacer comparación de la contraseña
modeloUsuario.prototype.verificarContrasenia = (con, com) => {
    return bcrypt.compareSync(con , com);
}

module.exports = modeloUsuario;