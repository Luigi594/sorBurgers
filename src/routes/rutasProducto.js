const {Router} = require('express');
const router = Router();
const { body } = require('express-validator');
const validaciones = require('../middleware/authProducto');

//importando el controlador
const controladorProducto = require('../controllers/controllerProducto');

router.get('/', controladorProducto.ListaProductos);
router.get('/editar', controladorProducto.ObtenerProducto);
router.post('/guardar', validaciones.Validacion, controladorProducto.GuardarProducto);
router.put('/modificar', validaciones.Validacion, controladorProducto.ModificarProducto);
router.delete('/eliminar', controladorProducto.EliminarProducto);
router.get('/editar',controladorProducto.ObtenerProductos);
module.exports = router;