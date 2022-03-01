const { body, check, validationResult } = require('express-validator');

const modelProveedores = require('../models/modelProveedores');
exports.Validacion = [
    body('nombreProveedor').isString()
    .withMessage("Nombre no debe contener números o caracteres especiales")
    .isLength({min: 3})
    .withMessage("La longitud mínima para el nombre es de 3 caracteres"),

    body('empresa').isString()
    .withMessage("Nombre de la Empresa debe contener al menos 1 caracter")
    .isLength({min: 1})
    .withMessage("La longitud mínima para el nombre es de 5 caracteres"),

    body('direccion').isString()
    .withMessage("Aguire es culero")
    .isLength({min: 3})
    .withMessage("La longitud mínima para el nombre es de 3 caracteres"),

    body('telefono').isMobilePhone()
    .withMessage("Telefono no debe contener caracteres especiales")
    .isLength({min: 8})
    .withMessage("Longitud incorrecta para el telefono"),

    body('correo').isEmail()
    .withMessage("Correo no debe contener espacios o caracteres especiales (Excepton '@' '_' '_ ')")
    .isLength({min: 10})
    .withMessage("La longitud mínima para el email es de 10 caracteres"),

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