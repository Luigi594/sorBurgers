const { body, check, validationResult } = require('express-validator');

const modelPuestos= require('../models/modelPuestos');
exports.Validacion = [
    body('descripcion').isString()
    .withMessage("Puesto no debe contener números o caracteres especiales")
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