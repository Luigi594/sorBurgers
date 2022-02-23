const {Router} = require('express');
const router = Router();

// importando el controlador
const controladorUsuario = require('../controllers/controllerUsuario');

router.get('/', controladorUsuario.ListaUsuariosClientes);
router.get('/empleados', controladorUsuario.ListaUsuariosEmpleados);
module.exports = router;