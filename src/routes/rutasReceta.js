const {Router} = require('express');
const router = Router();
const { body } = require('express-validator');
//const validaciones = require('../middleware/authMiddleware');

// importando el controlador
const controladorReceta = require('../controllers/controllerReceta');

router.get('/', controladorReceta.ListaRecetas);
router.post('/guardar', controladorReceta.GuardaReceta);
router.put('/modificar', controladorReceta.ModificarReceta);
router.delete('/eliminar', controladorReceta.EliminarReceta);

module.exports = router;