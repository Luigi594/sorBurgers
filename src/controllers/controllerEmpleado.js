const modeloEmpleado = require('../models/modelEmpleado');
const modeloPuestos = require('../models/modelPuestos');

exports.ListaEmpleados = async (req, res) => {

    const listaEmpleados = await modeloEmpleado.findAll({
        include:{
            model: modeloPuestos,
            attributes: ['descripcion']
        },
        where:{estado: 'AC'}
    });

    if(!listaEmpleados.length > 0){
        res.status(200).json({msj: "No hay datos por mostrar"});
    }
    else{
        res.status(200).json(listaEmpleados);
    }
}

// guardar datos del empleado
exports.GuardarEmpleado = async (req, res) => {

    const { puestoId, nombre, apellido, telefono, fechaNacimiento } = req.body;

    const buscaRegistro = await modeloEmpleado.findOne({
        where:{
            telefono: telefono
        }
    })

    if(buscaRegistro){
        res.status(422).json({msj: "Registro duplicado!"});
    }
    else{

        await modeloEmpleado.create({
            puestoId,
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

// modificar el dato del empleado
exports.ModificarEmpleado = async (req, res) => {

    const { id } = req.query;
    const { puestoId, nombre, apellido, telefono, fechaNacimiento } = req.body;

    let buscaEmpleado = await modeloEmpleado.findOne({
        where:{
            id: id
        }
    })

    if(!buscaEmpleado){
        res.status(404).json({msj: "El id proporcionado no existe"});
    }
    else{

        buscaEmpleado.puestoId = puestoId;
        buscaEmpleado.nombre = nombre;
        buscaEmpleado.apellido = apellido;
        buscaEmpleado.telefono = telefono;
        buscaEmpleado.fechaNacimiento = fechaNacimiento;
        await buscaEmpleado.save()
        .then((result) => {
            res.status(201).json({msj: "Registro modificado exitosamente!"});
        })
        .catch((err) => {
            console.log(err);
            res.status(304).json({msj: "El registro no pudo ser modificado"});
        })
    }
}