const modeloCarrito = require('../models/modelCarrito');
const { check, validationResult } = require('express-validator');

// Listar todos los Carritos
exports.ListaCarrito = async (req, res) => {
    const ListaCarrito = await modeloCarrito.findAll();
    if(!ListaCarrito.length > 0){
        res.status(200).json({msj: "No hay datos por mostrar!"});
    }
    else{
        res.status(200).json(ListaCarrito);
    }
}

//Obtener el Carrito de un Cliente 
exports.ObtenerCarrito = async (req, res) => {
    const { id } = req.query;
    const ListaCarrito = await modeloCarrito.findAll({
        where:{
            clienteId: id
        }
    })
    if(!ListaCarrito){
        res.status(200).json({msj: "No existen registros para este carrito!"});
    }
    else{
        res.status(200).json(ListaCarrito)
    }
}

// Guardar el Producto al Carrito
exports.GuardarCarrito = async (req, res) => {
    const { clienteId, productoId, nombreProducto, precio, cantidad } = req.body;
    await modeloCarrito.create({
        clienteId, 
        productoId, 
        nombreProducto, 
        precio, 
        cantidad
        })
        .then((result) => {
            res.status(201).json({msj: "Registro almacenado exitosamente!"});
        })
        .catch((err) => {
            console.log(err);
            res.status(406).json({msj: "El registro no pudo ser guardado!"});
        })
}

// Eliminar el TODO Carrito de un Cliente
exports.EliminarCarrito = async (req, res) => {
    const { id } = req.query;
    await modeloCarrito.destroy({
        where:{
            clienteId: id
        }
    })
    .then((result) => {
        if(result == 0){
            res.status(400).json({msj: "El id proporcionado no existe!"});
        }
        else{
            res.status(200).json({msj: "Registros eliminado satisfactoriamente!"});
        }
    })
}

// Eliminar solo un item del Carrito
exports.EliminarItem = async (req, res) => {
    const { id } = req.query;
    await modeloCarrito.destroy({
        where:{
            id: id
        }
    })
    .then((result) => {
        if(result == 0){
            res.status(400).json({msj: "El id proporcionado no existe!"});
        }
        else{
            res.status(200).json({msj: "Registros eliminado satisfactoriamente!"});
        }
    })
}