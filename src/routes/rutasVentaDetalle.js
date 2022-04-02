const {Router} = require('express');
const router = Router();
const { body } = require('express-validator');
const validaciones = require('../middleware/authVentaDetalle');

// importando el controlador
const controladorVentaDetalle = require('../controllers/controllerVentaDetalle');

router.get('/', controladorVentaDetalle.ListarDetalles);
router.post('/guardar', controladorVentaDetalle.GuardarDetalles);
router.delete('/eliminar', controladorVentaDetalle.EliminarDetalles);

module.exports = router;