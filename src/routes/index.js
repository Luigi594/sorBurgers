const {Router} = require('express');
const router = Router();

// El inicio del sitio
router.get('/', (req, res) => {
    res.send("Bienvenido a SorBurgers Restaurant");
});

router.use('/clientes/', require('./rutasCliente'));

module.exports = router;