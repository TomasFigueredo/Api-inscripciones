const {body, validationResult} = require("express-validator")
const reglasUsuario = [
    body("nombre")
        .notEmpty().withMessage("El nombre es requerido")
        .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/).withMessage("El nombre debe ser texto")
        .isLength({min: 2, max: 30}).withMessage("El nombre debe tener entre 2 y 30 letras"),
    
    body("email")
        .notEmpty().withMessage("El email es requerido")
        .isEmail().withMessage("El email debe estar en el formato adecuado"),

    (req, res, next) =>{
        const errores = validationResult(req)
        if(!errores.isEmpty()){
            return res.status(400).json({errores: errores.array()})
        }
        next()
    }
]

module.exports = {reglasUsuario};