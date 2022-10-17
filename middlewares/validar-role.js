
const { response } = require('express');
const Usuario = require('../models/user.model');


const validarADMIN_ROLE_o_MismoUsuario = async (req , res, next)=>{
    const uid = req.uid;
    const id = req.params.id;
    try {
        const usuarioDb = await Usuario.findById(uid);
        if(!usuarioDb){
            return res.status(404).json({
                ok:false,
                msj:'Usuario no existe'
            })
        }

        if( usuarioDb.role === 'ADMIN_ROLE' && uid=== id ){
            next();  
        } else {
            return res.status(404).json({
                ok:false,
                msj:'No tiene privilegios para hacer eso'
            })
        }
    } catch (error) {
        res.status(500).json({
            ok:false,
            msj:'Hable con el administrador'
        })
    }
}

const validarADMIN_ROLE = async (req , res, next)=>{
    const uid = req.uid;
    try {
        const usuarioDb = await Usuario.findById(uid);
        if(!usuarioDb){
            return res.status(404).json({
                ok:false,
                msj:'Usuario no existe'
            })
        }

        if( usuarioDb.role !== 'ADMIN_ROLE' ){
            return res.status(404).json({
                ok:false,
                msj:'No tiene privilegios para hacer eso'
            })
        }

        next();
    } catch (error) {
        res.status(500).json({
            ok:false,
            msj:'Hable con el administrador'
        })
    }
}

module.exports = {
    validarADMIN_ROLE,
    validarADMIN_ROLE_o_MismoUsuario
}