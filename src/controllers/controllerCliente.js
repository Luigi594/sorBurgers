const modeloCliente = require('../models/modelCliente');
const { check, validationResult } = require('express-validator');

// listar clientes
exports.ListaClientes = async (req, res) => {

    const listaClientes = await modeloCliente.findAll();

    if(!listaClientes.length > 0){
        res.status(200).json({msj: "No hay datos por mostrar"});
    }
    else{
        res.status(200).json(listaClientes);
    }
}

// obtener un dato en específico
exports.ObtenerCliente = async (req, res) => {

    const { id } = req.query;
    
    const lista = await modeloCliente.findOne({
        where: {
            id: id
        }
    })

    if(!lista){
        res.status(200).json({msj: "No existe el cliente"})
    }
    else {
        res.status(200).json(lista)
    }
}

// guardar datos del cliente
exports.GuardarCliente = async (req, res) => {

    const { nombre, apellido, telefono, fechaNacimiento } = req.body;

    const buscaRegistro = await modeloCliente.findOne({
        where:{
            telefono: telefono
        }
    })

    if(buscaRegistro){
        res.status(422).json({msj: "Registro duplicado!"});
    }
    else{
        
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
            res.status(406).json({msj: "El registro no pudo ser guardado"});
        })
    }
   
}

// modificar datos del cliente
exports.ModificarCliente = async (req, res) => {

    const { id } = req.query;
    const { nombre, apellido, telefono, fechaNacimiento } = req.body;

    let buscaCliente = await modeloCliente.findOne({
        where:{
            id: id
        }
    })

    if(!buscaCliente){
        res.status(404).json({msj: "El id proporcionado no existe"});
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
            res.status(304).json({msj: "El registro no pudo ser modificado"});
        })
    }
}