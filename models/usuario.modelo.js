const mongoose = require("mongoose");
const UsuarioEsquema = new mongoose.Schema(
    {
        nombre: {type: String, required: true, unique: true}, 
        email: {type: String, required: true, unique: true}
    },
    {
        timestamps: true
    }
)

const Usuario = mongoose.model("Usuario", UsuarioEsquema);   
module.exports = Usuario;

