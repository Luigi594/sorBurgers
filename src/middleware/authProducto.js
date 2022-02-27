const { body, check, validationResult } = require('express-validator');

const modeloProducto = require('../models/modelProducto');
exports.Validacion = [
    body('nombre').isString()
    .withMessage("Nombre no debe contener números o caracteres especiales")
    .isLength({min: 3})
    .withMessage("La longitud mínima para el nombre es de 3 caracteres"),

    body('precio').isFloat()
    .withMessage("El precio solo deben de ser numeros")
    .isLength({min: 2})
    .withMessage("La longitud mínima para el precio es de 2 numeros"),

    body('descripcionProducto').isString()
    .withMessage("La descripcion no debe contener números o caracteres especiales")
    .isLength({min: 3})
    .withMessage("La longitud mínima para el nombre es de 3 caracteres"),

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