const express = require("express");
const router = express.Router();
const controladorCurso = require("../controladores/curso.controlador");
/*mongosh "mongodb+srv://cluster0.zgvwx5g.mongodb.net/" --apiVersion 1 --username tomasfigueredoar_db_user*/

const {reglasCurso} = require("../validators/curso.validator")
router.post("/", reglasCurso, controladorCurso.crearCurso)
router.get("/", controladorCurso.obtenerCursos)
router.get("/:id", controladorCurso.obtenerUnCurso)
router.delete("/:id", controladorCurso.eliminarCurso)
router.put("/:id", controladorCurso.actualizarCurso)

module.exports = router