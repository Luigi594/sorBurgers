const { body, check, validationResult } = require('express-validator');
const modeloVenta = require('../models/modelVenta');

exports.Validacion = [
    body('fechaVenta').isDate()
    .withMessage("La fecha debe ser una fecha valida")
    .isEmpty()
    .withMessage("La fecha no puede quedar vacia"),

    body('impuesto').isFloat()
    .withMessage("El impuesto solo deben de ser numeros")
    .isEmpty()
    .withMessage("El impuesto no puede quedar vacio"),

    body('subtotal').isFloat()
    .withMessage("El impuesto solo deben de ser numeros")
    .isEmpty()
    .withMessage("El subtotal no puede quedar vacio"),

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