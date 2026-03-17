const mongoose = require("mongoose");
const CursoEsquema = new mongoose.Schema(
    {
        nombre: {type: String, required: true, unique: true}, 
        maxCupo: {type: Number, required: true}
        
    },
    {
        timestamps: true
    }
)

const Curso = mongoose.model("Curso", CursoEsquema);   
module.exports = Curso;