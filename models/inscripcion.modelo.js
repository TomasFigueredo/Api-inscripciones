const mongoose = require("mongoose")
const InscripcionSchema = new mongoose.Schema(
    {
        usuarioID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Usuario",
            required: true
        },
        cursoID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Curso",
            required: true
        },
        fechaInscripcion:{
            type: Date,
            default: Date.now
        }
    },
    {
        timestamps: true
    }

);

InscripcionSchema.index(
    {usuarioID: 1, cursoID: 1},
    {unique: true}
)

const Inscripcion = mongoose.model("Inscripcion", InscripcionSchema)

module.exports = Inscripcion; 