const express = require("express");
const router = express.Router();
const controladorUsuario = require("../controladores/usuario.controlador");
/*mongosh "mongodb+srv://cluster0.zgvwx5g.mongodb.net/" --apiVersion 1 --username tomasfigueredoar_db_user*/

router.post("/", controladorUsuario.crearUsuario)
router.get("/", controladorUsuario.obtenerUsuarios)
router.get("/:id", controladorUsuario.obtenerUnUsuario)
router.put("/:id", controladorUsuario.actualizarUsuario)
router.delete("/:id", controladorUsuario.eliminarUsuario)

/*router.post("/", async(req, res) =>{
    try{
        if("nombre" in req.body && "email" in req.body){
            const user = new Usuario({
                nombre: req.body.nombre, 
                email: req.body.email})

            const userSave = await user.save();
            res.json({
                mensaje: "Se guardo con exito el usuario",
                user: userSave
            })
        }else{
            res.send("Faltan datos para crear el usuario!");
        }
    }catch(err){
        res.status(500).json({
            error: err.message
        })
    }
})*/

module.exports = router;

