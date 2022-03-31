const {Router} = require('express');
const router = Router();
const { body } = require('express-validator');
//const validaciones = require('../middleware/authProducto');

//importando el controlador
const controladorCarrito = require('../controllers/controllerCarrito');

router.get('/', controladorCarrito.ListaCarrito);
router.get('/obtener', controladorCarrito.ObtenerCarrito);
router.post('/guardar', controladorCarrito.GuardarCarrito);
router.delete('/eliminar', controladorCarrito.EliminarCarrito);
router.delete('/eliminarItem', controladorCarrito.EliminarItem);
module.exports = router;