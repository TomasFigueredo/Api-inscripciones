const Curso = require("../models/curso.modelo");

exports.crearCurso = async(req, res) =>{
    try{
        const curso = await Curso.create(req.body)
        res.status(201).json(curso)
    }catch(err){
        res.status(400).json({error: err.message})
    }
}

exports.obtenerCursos = async(req, res) =>{
    try{
        const cursos = await Curso.find()
        res.status(201).json(cursos)
    }catch(err){
        res.status(400).json({error: err.message})
    }
}

exports.obtenerUnCurso = async(req, res) =>{
    try{
        const curso = await Curso.findById(req.params.id)
        if(curso){
            res.status(201).json(curso)
        }else{
            res.status(404).json({err: "El curso no fue encontrado"})
        }
    }catch(err){
        res.status(400).json({error: err.message})
    }
}

exports.eliminarCurso = async(req, res) =>{
    try{
        const curso = await Curso.findByIdAndDelete(req.params.id)
        if(curso){
            res.status(201).json({message: "El curso se elimino con exito!"})
        }else{
            res.status(404).json({err: "El curso no fue encontrado"})
        }
    }catch(err){
        res.status(400).json({error: err.message})
    }
}

exports.actualizarCurso = async (req, res) => {
try {
    console.log(req.body)
    const curso = await Curso.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true } 
    );

    if (!curso) return res.status(404).json({ error: "Curso no encontrado" });
    console.log("Curso encontrado " + curso.nombre)
    res.json(curso);
    return
} catch (error) {
    res.status(400).json({ error: error.message });
}
};