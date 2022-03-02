const passport = require('passport');
const jwtStrategy = require('passport-jwt').Strategy;
const extractJwt = require('passport-jwt').ExtractJwt;
const jwt = require('jsonwebtoken');
const modeloUsuario = require('../models/modelUsuario');

// se supone que es la duración de una 1h para el token
const duration = 60 * 60 * 3600;
const key = process.env.KEY_JWT;

// el jsonwebtoken utiliza el id como payload
// es para generar el jsonwebtoken
module.exports.JsonWebToken = (id) => {

    return jwt.sign({id}, key, {expiresIn: duration});
}
 
const opciones = {};

// la function fromAuth... busca el jsonwebtoken 
opciones.jwtFromRequest = extractJwt.fromAuthHeaderAsBearerToken();
opciones.secretOrKey = key;

passport.use(new jwtStrategy(opciones, async (payload, done) => {

    return await modeloUsuario.findOne({
        where:{
            id: payload.id
        }
    })
    .then((result) => {
        return done(null, result.id);
    })
    .catch((err) => {
        return done(null, false);
    });
}));

// exportamos la auntentiación del jsonwebtoken
module.exports.Autenticacion = passport.authenticate('jwt', {session: false, failureRedirect: '/api/autenticacion/error'});