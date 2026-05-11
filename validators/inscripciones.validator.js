const {body, validationResult} = require("express-validator")

const reglasInscipriones = [
    body("usuarioID")
        .isEmpty().withMessage("El ID del usuario es requerido")
        .isNumeric().withMessage("El dato debe ser numérico"),

    body("cursoID")
        .isEmpty().withMessage("El ID del curso es requerido")
        .isNumeric().withMessage("El dato debe ser numérico"),

    (req, res, next) =>{
        const errores = validationResult(req)
        if(!errores.isEmpty()){
            return res.status(400).json({errores: errores.array()})
        }
        next()
    }
]

module.exports = {reglasInscipriones}