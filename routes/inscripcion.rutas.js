const express = require("express");
const router = express.Router();
const controladorInscripcion = require("../controladores/inscripcion.controlador");

router.post("/", controladorInscripcion.crearInscripcion)
router.get("/", controladorInscripcion.verInscripciones)
router.delete("/:id", controladorInscripcion.eliminarInscripcion)
router.get("/:id", controladorInscripcion.buscarInscripcion)
router.get("/curso/:cursoID", controladorInscripcion.buscarInscripcionCurso)

module.exports = router;