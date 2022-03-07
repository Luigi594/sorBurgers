const { body, check, validationResult } = require('express-validator');
const modeloIngrediente = require('../models/modelIngrediente');

exports.Validacion = [
    
    body('nombre').isString()
    .withMessage("Nombre no debe contener números o caracteres especiales")
    .isLength({min: 3})
    .withMessage("La longitud mínima para el nombre es de 3 caracteres"),

    body('descripcion').isString()
    .withMessage("La descripcion no debe contener números o caracteres especiales")
    .isLength({min: 3})
    .withMessage("La longitud mínima para la descripcion es de 3 caracteres"),

    body('cantidad').isFloat()
    .withMessage("La cantidad solo deben de ser numeros")
    .isLength({min: 1})
    .withMessage("La longitud mínima para el precio es de 1 numero"),

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