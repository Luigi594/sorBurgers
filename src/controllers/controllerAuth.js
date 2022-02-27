const passport = require('../configuration/passport');
const modeloUsuario = require('../models/modelUsuario');

// funcion para indicar el header para el token
const respuesta = (msj, statusCode, id, res) => {

    let mensajes = {
        msj: msj,
        id: id
    }

    res.setHeader("Content-type", "application/json");
    res.statusCod = statusCode;
    res.json(mensajes);

    return respuesta;
}

// este sirve para llenar el control de quienes entran a X lugar de la aplicación
exports.Autenticado = passport.Autenticacion;

exports.Session = async (req, res) => {

    const { correo, contrasenia } = req.body;
    const buscaUsuario = await modeloUsuario.findOne({
        where:{
            correo: correo
        }
    })

    if(!buscaUsuario){
        respuesta("Usuario no registrado", 400, [], res);
    }
    else{

        // usamos la verificacion de contrasenia de bcrypt definida en el modelo
        // primero va lo que el usuario le manda, y después el campo definido en el modelo
        if(!buscaUsuario.verificarContrasenia(contrasenia, buscaUsuario.contrasenia)){
            
            respuesta("Crendenciales incorrectas", 400, [], res);
        }
        else{

            // sii existe el usuario, buscamos la propiedad de id
            // para generar el token
            const token = passport.JsonWebToken({id: buscaUsuario.id});
            const data = {
                token: token,
                data: buscaUsuario.correo
            };

            respuesta("Bienvenido", 200, data, res);
        }
    }
}

exports.Error = (req, res) => {
    respuesta("Debe estar autenticado", 400, [], res);
}