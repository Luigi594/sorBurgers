const modeloCliente = require('../models/modelCliente');

// listar clientes
exports.ListaClientes = async (req, res) => {

    const listaClientes = await modeloCliente.findAll();

    if(!listaClientes.length > 0){
        res.send("No hay datos por mostrar");
    }
    else{
        res.status(200).json({Clientes: listaClientes});
    }
}

// guardar datos del cliente
exports.GuardarCliente = async (req, res) => {

    const { nombre, apellido, telefono, fechaNacimiento } = req.body;

    await modeloCliente.create({
        nombre, 
        apellido, 
        telefono, 
        fechaNacimiento
    })
    .then((result) => {
        res.status(201).json({msj: "Registro almacenado exitosamente!"});
    })
    .catch((err) => {
        console.log(err);
        res.status(400).json({msj: "El registro no pudo ser guardado"});
    })
}


// modificar datos del cliente
exports.ModificarCliente = async (req, res) => {

    const { id } = req.query;
    const { nombre, apellido, telefono, fechaNacimiento } = req.body;

    let buscaCliente = await modeloCliente.findOne({
        where:{
            IdCliente: id
        }
    })

    if(!buscaCliente){
        res.status(400).json({msj: "El id proporcionado no existe"});
    }
    else{

        buscaCliente.nombre = nombre;
        buscaCliente.apellido = apellido;
        buscaCliente.telefono = telefono;
        buscaCliente.fechaNacimiento = fechaNacimiento;
        await buscaCliente.save()
        .then((result) => {
            res.status(201).json({msj: "Registro modificado exitosamente!"});
        })
        .catch((err) => {
            console.log(err);
            res.status(400).json({msj: "El registro no pudo ser modificado"});
        })
    }
}

// eliminar el cliente
exports.EliminarCliente = async (req, res) => {

    const { id } = req.query;

    await modeloCliente.destroy({
        where:{
            IdCliente: id
        }
    })
    .then((result) => {

        if(result == 0){
            res.status(401).json({msj: "El id proporcionado no existe"});
        }
        else{
            res.status(201).json({msj: "Registro eliminado satisfactoriamente"});
        }
    })
}