const {body, validationResult} = require("express-validator")

const reglasCurso = [
    body("nombre")
        .isEmpty().withMessage("El nombre es requerido")
        .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/).withMessage("El nombre debe ser texto")
        .isLength({min: 2, max: 30}).withMessage("Debe tener entre 2 y 30 letras"),

    body("maxCupo")
        .isEmpty().withMessage("El cupo es requerido")
        .isNumeric().withMessage("El dato debe ser numérico")
        .isLength({min: 2, max: 20}).withMessage("El cupo debe estar entre 2 y 20"),

    (req, res, next) =>{
        const errores = validationResult(req)
        if(!errores.isEmpty()){
            return res.status(400).json({errores: errores.array()})
        }
        next()
    }
]

module.exports = {reglasCurso}