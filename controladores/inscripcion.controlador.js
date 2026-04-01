const Inscripcion = require("../models/inscripcion.modelo")
const Curso = require("../models/curso.modelo")
const Usuario = require("../models/usuario.modelo")
const mongoose = require("mongoose")

/*exports.crearInscripcion = async(req, res) =>{
    try{
        const {usuarioID, cursoID} = req.body
        const cursoid = cursoID
        const usuarioid = usuarioID
        const curso = await Curso.findById(cursoID)
        const usuario = await Usuario.findById(usuarioID)

        if(!curso || !usuario){
            res.status(404).json({err: "Curso o Usuario no encontrado"})
        }

        const cantidadInscriptos = await Inscripcion.countDocuments({curso: cursoID})
        if(cantidadInscriptos >= curso.maxCupo){
            res.status(404).json({err: "No hay cupos disponibles"})
        }
        console.log(`${cursoid} ${usuarioid}`)
        const inscripcion = await Inscripcion.create({
            usuarioID: usuarioid,
            cursoID: cursoid
        });
        res.status(201).json(inscripcion)
    }catch(err){
        if(err.code = 11000){
            res.status(409).json({error: "El alumno ya esta inscrito al curso"})
        }
        res.status(400).json({error: err.message})
    }
}*/

exports.crearInscripcion = async (req,res) =>{
    try{
        console.log(`ESTE ES EL BODY ${req.body}`)
        const {usuarioID,cursoID} = req.body;
        const cursoid = cursoID
        const usuarioid = usuarioID
        //BUSCAR curso
        console.log( "LOG datos recibidos: "+ { usuarioID, cursoID });
        const curso = await Curso.findById(cursoID)        
        if (!curso) return res.status(404).json({error: "Curso no encontrado"});

        // VALIDAR cant inscriptos para este curso
        const inscriptos = await Inscripcion.countDocuments({
            cursoID: cursoid
        });

        console.log(`total inscriptos ${inscriptos}`)
        if (inscriptos >= curso.cupoMax) return res.status(400).json({error:'No hay cupo disponible'});

        // CREAR inscripcion
        const inscripcion = await Inscripcion.create({usuarioID, cursoID});

        res.status(201).json(inscripcion)

        return;
        
    }catch(error){
        if (error.code === 11000) return res.status(409).json({error:'El alumno ya esta inscripto a este curso'});
        res.status(400).json({error:error.message});
    }
};

exports.verInscripciones = async(req, res) =>{
    try{
        const inscripciones = await Inscripcion.find()
            .populate("usuarioID")
            .populate("cursoID")
        res.status(200).json(inscripciones);
        console.log(`Servidor: ${inscripciones}`)
    }catch(error){
        res.status(400).json({
            error:error.message
        })
    }
}

exports.eliminarInscripcion = async(req, res) =>{
    try{
        const inscripcion = await Inscripcion.findByIdAndDelete(req.params.id)
        if(inscripcion){
            res.status(200).json(inscripcion);
            console.log("Se elimino la inscripcion con exito");
        }else{
            res.status(400).json({error:`Hubo un error al eliminar la inscripcion ${req.params.id}`})
        }
    }catch{
        res.status(400).json({
            error:err.message
        })
    }
}

exports.buscarInscripcion = async(req, res) =>{
    try{
        const inscripcion = await Inscripcion.findById(req.params.id)
            .populate("usuarioID")
            .populate("cursoID")
        if(!inscripcion){
            return res.status(404).json({error:"No se encontró la inscripción por ese ID"});
        }
        return res.json(inscripcion);
    }catch(error){
        res.status(400).json({
            error: error.message
        })
    }
};

exports.buscarInscripcionCurso = async(req, res) =>{
    try{
        console.log(`ESTE ES EL CURSO RECIBIDO ${req.params.cursoID}`)
        const cursoBuscado = req.params.cursoID
        if(!mongoose.Types.ObjectId.isValid(cursoBuscado)){
            return res.status(400).json({error:"El ID buscado no es valido"})
        }
        const listaInscripciones = await Inscripcion.find({cursoID : cursoBuscado})
            .populate("usuarioID");
            if(!listaInscripciones){
            return res.status(404).json({error:"No se encontró la inscripción"});
        }
        console.log("TABLA LISTA INSCRIPTOS")
        console.table(listaInscripciones.map(i => i.toObject()))
        const usuariosInscriptos = listaInscripciones.map(i => i.usuarioID)
        return res.json(usuariosInscriptos)
    }catch(error){
        res.status(500).json({
            error: error.message
        })
    }
};
