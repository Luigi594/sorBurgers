const modeloProducto = require('../models/modelProducto');
const { check, validationResult } = require('express-validator');

// listar clientes
exports.ListaProductos = async (req, res) => {

    const ListaProductos = await modeloProducto.findAll();

    if(!ListaProductos.length > 0){
        res.status(200).json({msj: "No hay datos por mostrar"});
    }
    else{
        res.status(200).json(ListaProductos);
    }
}

// guardar datos del cliente
exports.GuardarProducto = async (req, res) => {

    const { recetumId, nombre, descripcionProducto, precio } = req.body;

    await modeloProducto.create({
            recetumId,
            nombre, 
            descripcionProducto, 
            precio
        })
        .then((result) => {
            res.status(201).json({msj: "Registro almacenado exitosamente!"});
        })
        .catch((err) => {
            console.log(err);
            res.status(406).json({msj: "El registro no pudo ser guardado"});
        })
   
}


// modificar datos del cliente
exports.ModificarProducto = async (req, res) => {

    const { id } = req.query;
    const { recetumId, nombre, descripcionProducto, precio } = req.body;

    let buscaProducto = await modeloProducto.findOne({
        where:{
            id: id
        }
    })

    if(!buscaProducto){
        res.status(404).json({msj: "El id proporcionado no existe"});
    }
    else{
        buscaProducto.recetumId = recetumId
        buscaProducto.nombre =  nombre;
        buscaProducto.descripcionProducto =  descripcionProducto;
        buscaProducto.precio = precio;
        await buscaProducto.save()
        .then((result) => {
            res.status(201).json({msj: "Registro modificado exitosamente!"});
        })
        .catch((err) => {
            console.log(err);
            res.status(304).json({msj: "El registro no pudo ser modificado"});
        })
    }
}

// eliminar el cliente
exports.EliminarProducto = async (req, res) => {

    const { id } = req.query;

    await modeloProducto.destroy({
        where:{
            id: id
        }
    })
    .then((result) => {

        if(result == 0){
            res.status(400).json({msj: "El id proporcionado no existe"});
        }
        else{
            res.status(200).json({msj: "Registro eliminado satisfactoriamente"});
        }
    })
}