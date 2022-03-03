const { body, check, validationResult } = require('express-validator');
const modeloVentaDetalle = require('../models/modelVentaDetalle');

exports.Validacion = [
    body('cantidad').isInt()
    .withMessage("La cantidad solo debe de ser numeros enteros")
    .isEmpty()
    .withMessage("La cantidad no puede quedar vacia"),

    body('importe').isFloat()
    .withMessage("El importe solo deben de ser numeros")
    .isEmpty()
    .withMessage("El importe no puede quedar vacio"),

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