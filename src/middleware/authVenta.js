const { body, check, validationResult } = require('express-validator');
const modeloVenta = require('../models/modelVenta');

exports.Validacion = [
    body('fechaVenta').isDate()
    .withMessage("La fecha debe ser una fecha valida"),

    body('impuesto').isFloat()
    .withMessage("El impuesto solo deben de ser numeros"),

    body('subtotal').isFloat()
    .withMessage("El impuesto solo deben de ser numeros"),

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