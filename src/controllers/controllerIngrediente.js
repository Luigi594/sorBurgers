const { check, validationResult } = require('express-validator');
const modeloIngrediente = require('../models/modelIngrediente');

// listar ingredientes
exports.ListarIngredientes = async (req, res) => {
    const ListaIngredientes = await modeloIngrediente.findAll();

    if(!ListaIngredientes.length > 0) {
        res.status(200).json({msj: "No hay ingredientes por mostrar"});
    }
    else {
        res.status(200).json(ListaIngredientes);
    }
}

// obtener un dato
exports.ObtenerIngrediente = async (req, res) => {

    const { id } = req.query;

    const lista = await modeloIngrediente.findOne({
        where: {id: id
        }
    })

    if(!lista){
        res.status(200).json({msj: "No existe el ingrediente"})
    }
    else {
        res.status(200).json(lista)
    }
}

// guardar datos de ingrediente
exports.GuardarIngrediente = async (req, res) => {

    const { proveedoreId, nombre, descripcion, precioCompra, cantidad } = req.body;
    await modeloIngrediente.create({   
        proveedoreId,
        nombre,
        descripcion,
        precioCompra,
        cantidad
    })

    .then((result) => {
       // console.log(result);
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
    const { proveedoreId, nombre, descripcion, precioCompra, cantidad} = req.body;

    let buscaIngrediente = await modeloIngrediente.findOne({
        where:{
            id : id
        }
    })

    if (!buscaIngrediente) {
        res.status(404).json({msj: "El id proporcionado no existe"});
    }
    else{
        buscaIngrediente.proveedoreId = proveedoreId;
        buscaIngrediente.nombre = nombre;
        buscaIngrediente.descripcion = descripcion;
        buscaIngrediente.precioCompra = precioCompra;
        buscaIngrediente.cantidad = cantidad;
        await buscaIngrediente.save()
        .then((result) =>{
            //console.log(result);
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