const { body, check, validationResult } = require('express-validator');
const modeloUsuario = require('../models/modelUsuario');

exports.Validacion = [

    body('nombre').isString()
    .withMessage("Nombre no debe contener números o caracteres especiales")
    .isLength({min: 3})
    .withMessage("La longitud mínima para el nombre es de 3 caracteres"),

    body('apellido').isString()
    .withMessage("Apellido no debe contener números o caracteres especiales")
    .isLength({min: 3})
    .withMessage("La longitud mínima para el apellido es de 3 caracteres"),

    body('telefono').isMobilePhone()
    .withMessage("Telefono no debe contener caracteres especiales")
    .isLength({min: 8})
    .withMessage("Longitud incorrecta para el telefono"),

    body('fechaNacimiento').isDate()
    .withMessage("Formato incorrecto de fecha"),
    (req, res, next) => {

        const errors = validationResult(req);

        // errores no está vacío, ossa que si hay errores
        if(!errors.isEmpty()){
            return res.status(422).json({ errors: errors.array() });
        }
        else{
            next();
        }
    }
];

// este es para crear el usuario
exports.ValidarUsuarioCliente = [

    body('correo').isEmail()
    .withMessage("Formato incorrecto para el correo"),
    
    body('contrasenia').isLength({min: 6})
    .withMessage("La contraseña debe tener al menos 6 caracteres")
    .matches(/\d/)
    .withMessage("La contraseña debe contener números"),
    (req, res, next) => {

        const errors = validationResult(req);

        if(!errors.isEmpty()){
            return res.status(422).json({ errors: errors.array() });
        }
        else{
            next();
        }
    }
]