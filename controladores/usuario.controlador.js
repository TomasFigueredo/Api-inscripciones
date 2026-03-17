const Usuario = require("../models/usuario.modelo");

exports.crearUsuario = async(req, res) =>{
    try{
        const usuario = await Usuario.create(req.body);
        res.status(200).json(usuario);
    }catch(err){
        res.status(400).json({
            error: err.message
        })
    }
}

exports.obtenerUsuarios = async(req, res) =>{
    try{
        const usuarios = await Usuario.find();
        res.status(200).json(usuarios);
    }catch(err){
        res.status(400).json({
            error:err.message
        })
    }
}

exports.obtenerUnUsuario = async(req, res) =>{
    try{
        console.log(`${req.params.id}`)
        const usuario = await Usuario.findById(req.params.id)
        if(usuario){
            res.status(200).json(usuario);
        }else{
            res.status(400).json({error:"Usuario no encontrado"})
        }
    }catch(err){
        res.status(400).json({
            error:err.message
        })
    }
}

exports.actualizarUsuario = async(req, res) =>{
    try{
        const usuario = await Usuario.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true})
        if(usuario){
            res.status(200).json(usuario);
        }else{
            res.status(400).json({error:`Hubo un error en la actualización del usuario ${req.params.id}`})
        }
    }catch(err){
        res.status(400).json({
            error:err.message
        })
    }
}

exports.eliminarUsuario = async(req, res) =>{
    try{
        const usuario = await Usuario.findByIdAndDelete(req.params.id)
        if(usuario){
            res.status(200).json(usuario);
            console.log("Se elimino el usuario con exito");
        }else{
            res.status(400).json({error:`Hubo un error al eliminar el usuario ${req.params.id}`})
        }
    }catch(err){
        res.status(400).json({
            error:err.message
        })
    }
}