const { request, response } = require('express');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');

const User = require('../models/User');

const loginUser = async( req = request, res = response ) => {
    const { email, password } = req.body;
    
    try {
        
        const user = await User.findOne({ email });

        if ( !user ) {
            return res.status(400).json({
                ok: false,
                msg: 'El usuario no existe'
            });
        }

        // Confirmar los passwords
        const validPassword = bcrypt.compareSync( password, user.password );

        if ( !validPassword ) {
            return res.status(400).json({
                ok: false,
                msg: 'El password esta mal'
            });
        }

        //TODO: Generar JWT
        const token = await generarJWT( user.id, user.name );


        res.status(200).json({
            ok: true,
            uid: user.id,
            name: user.name,
            token
        });

    } catch (error) {
        console.log({error});
        res.status(500).json({
            ok: false, 
            msg: 'Por favor hable con el administrador'
        });
    }
}

const createUser = async( req = request, res = response ) => {
    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        
        if ( user ) {
            return res.status(400).json({
                ok: false, 
                msg: `El email ${ email } ya esta en uso`
            });
        }

        user = new User( req.body );
        
        // Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync( password, salt );

        await user.save();
        
        //TODO: Generar JWT
        const token = await generarJWT( user.id, user.name );

        res.status(201).json({
            ok: true,
            uid: user.id,
            name: user.name,
            token
        });
        
    } catch (error) {
        console.log({error});
        // const { code, keyValue } = error;
        let msg = 'Por favor hable con el administrador';
        // if ( code === 11000 ) {
        //     msg = `El email ${ keyValue.email } ya esta en uso`;
        // }
        res.status(500).json({
            ok: false, 
            msg
        });
    }
    
}


const revalidarToken = async( req = request, res = response ) => {

    const { uid, name } = req;

    // TODO: generar un nuevo jwt y retornarlo

    const token = await generarJWT( uid, name );
    res.json({
        ok: true,
        uid,
        name,
        token
    });
}



module.exports = {
    createUser,
    loginUser,
    revalidarToken
};