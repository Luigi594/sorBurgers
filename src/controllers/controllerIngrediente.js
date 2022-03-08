const { check, validationResult } = require('express-validator');
const modeloIngrediente = require('../models/modelIngrediente');

// listar ingredientes
exports.ListarIngredientes = async (req, res) => {
    const listaIngredientes = await modeloIngrediente.findAll();

    if(!listaIngredientes.length > 0) {
        res.status(200).json({msj: "No hay ingredientes por mostrar"});
    }
    else {
        res.status(200).json({Ingredientes: listaIngredientes});
    }
}

// guardar datos de ingrediente
exports.GuardarIngrediente = async (req, res) => {

    const { proveedorId, nombre, descripcion, cantidad, precioCompra} = req.body;
    await modeloIngrediente.create({   
        proveedorId,
        nombre,
        descripcion,
        cantidad,
        precioCompra
    })

    .then((result) => {
        console.log(result);
        res.status(201).json({msj: "Registro almacenado exitosamente!"});
    })
    .catch((err) => {
        console.log(err);
        res.status(406).json({msj: "El registro no pudo ser guardado"});
        })
}

// modificar el dato del ingrediente
exports.ModificarIngrediente = async (req, res) => {

    const {id} = req.query;
    const { proveedorId, nombre, descripcion, cantidad, precioCompra} = req.body;

    let buscaIngrediente = await modeloIngrediente.findOne({
        where:{
            id : id
        }
    })

    if (!buscaIngrediente) {
        res.status(404).json({msj: "El id proporcionado no existe"});
    }
    else{
        buscaIngrediente.proveedorId = proveedorId;
        buscaIngrediente.nombre = nombre;
        buscaIngrediente.descripcion = descripcion;
        buscaIngrediente.cantidad = cantidad;
        buscaIngrediente.precioCompra = precioCompra;
        await buscaIngrediente.save()
        .then((result) =>{
            console.log(result);
            res.status(201).json({msj: "Registro modificado exitosamente!"});
        })
        .catch((err) => {
            console.log(err);
            res.status(304).json({msj: "El registro no pudo ser modificado"});
        })
    }
}

// eliminar el ingrediente
exports.EliminarIngrediente = async (req, res) => {
    const {id} = req.query;

    await modeloIngrediente.destroy({
        where:{
            id : id
        }
    })
    .then((result) =>{

        if(result == 0){
            res.status(400).json({msj: "El id proporcionado no existe"});
        }
        else{
            res.status(200).json({msj: "Registro eliminado satisfactoriamente"});
        }
    })
}