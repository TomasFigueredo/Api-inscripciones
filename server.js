require("dotenv").config()
const path = require("path") /*Se agrega el path cuando agrego NODE*/
const express = require("express");
const usuarioRoutes = require("./routes/usuario.rutas");
const cursoRoutes = require("./routes/curso.rutas");
const inscripcionRoutes = require("./routes/inscripcion.rutas")
const conexionBaseDatos = require("./config/conexionMongo");
const app = express();
const PUERTO = 3000;

conexionBaseDatos();

app.use(express.json())
app.use(express.static("public"))

app.use("/api/usuarios", usuarioRoutes)
app.use("/api/cursos", cursoRoutes)
app.use("/api/inscripciones", inscripcionRoutes)


app.get("/", (req, res) =>{
    res.sendFile(path.join(__dirname, "public", "index.html"))
})

app.listen(PUERTO, () =>{
    console.log(`Servidor iniciado en el puerto ${PUERTO}`);
})

