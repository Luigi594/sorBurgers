const {Router} = require('express');
const router = Router();

// importando el controlador
const controladorUsuario = require('../controllers/controllerUsuario');

router.get('/', controladorUsuario.ListaUsuariosClientes);
router.get('/empleados', controladorUsuario.ListaUsuariosEmpleados);
router.get('/lista/clientes', controladorUsuario.ObtenerClienteRegistrado);

// este es para guardar el usuario del cliente
router.post('/guardar/cliente', controladorUsuario.GuardarUsuarioCliente);
module.exports = router;