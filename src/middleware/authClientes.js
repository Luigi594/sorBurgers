const { body, check, validationResult } = require('express-validator');
const modeloCliente = require('../models/modelCliente');

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