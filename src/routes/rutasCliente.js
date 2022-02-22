const {Router} = require('express');
const router = Router();

// importando el controlador
const controladorCliente = require('../controllers/controllerCliente');

router.get('/', controladorCliente.ListaClientes);
router.post('/guardar', controladorCliente.GuardarCliente);
router.put('/modificar', controladorCliente.ModificarCliente);
router.delete('/eliminar', controladorCliente.EliminarCliente);

module.exports = router;