const modeloUsuario = require('../models/modelUsuario');
const Cliente = require('../models/modelCliente');
const Empleado = require('../models/modelEmpleado');

// esto solo lo podrá hacer el empleado con puesto Gerente
// este lista solo los clientes
exports.ListaUsuariosClientes = async (req, res) => {

    // en teoría es como hacer:
    /* select * from de usuarios y un join con clientes
    donde attributes, son los datos que queremos mostrar de
    la tabla usuarios y clientes, y el include es el join con la otra tabla
    */

    const listaUsuarios = await modeloUsuario.findAll({
        attributes:[
            'correo', 'tipoUsuario'
        ],
        where: {
            'tipoUsuario': 'CL'
        },
        include: {
            model: Cliente,
            attributes: [
                'nombre', 'apellido'
            ]
        }
    });

    if(!listaUsuarios.length > 0){
        res.status(200).json({msj: "No hay datos por mostrar"});
    }
    else{
        res.status(200).json({Usuarios: listaUsuarios});
    }
}

// este solo lista los empleados
exports.ListaUsuariosEmpleados = async (req, res) => {

    // donde el tipo de Usuario sea empleado
    const listaEmpleados = await modeloUsuario.findAll({
        attributes: [
            'correo', 'tipoUsuario'
        ],
        where: {
            'tipoUsuario': 'EM'
        },
        include: {
            model: Empleado,
            attributes: [
                'nombre', 'apellido'
            ]
        }
    });

    if(!listaEmpleados.length > 0){
        res.status(200).json({msj: "No hay datos por mostrar"});
    }
    else{
        res.status(200).json({Usuarios: listaEmpleados});
    }
}