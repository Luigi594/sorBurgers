const sequelize = require('sequelize');
const db = new sequelize(
    'sorburgers', // nombre de la base
    'root', // nombre de usuario
    'root', //contraseña del MySQL
    {
        host: 'localhost',
        dialect: 'mysql', 
        port: '3306'
    }
);

module.exports = db;