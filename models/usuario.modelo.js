const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const UsuarioEsquema = new mongoose.Schema(
    {
        nombre: {type: String, required: true, unique: true}, 
        email: {type: String, required: true, unique: true, lowercase: true, trim: true},
        password: {type: String, required: true, minlength: 6},
        rol: {type: String, enum: ["usuario", "admin"], default: "usuario"}

    },
    {
        timestamps: true
    }
)

UsuarioEsquema.pre("save", async function() {
    if(!this.isModified("password")) return
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
});

UsuarioEsquema.methods.compararPasswords = async function (passwordIngresada) {
    return await bcrypt.compare(passwordIngresada, this.password)
}

const Usuario = mongoose.model("Usuario", UsuarioEsquema);   
module.exports = Usuario;

