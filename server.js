require("dotenv").config()
const helmet = require("helmet")
const cors = require("cors")
const morgan = require("morgan")
const path = require("path") /*Se agrega el path cuando agrego NODE*/
const express = require("express");
const usuarioRoutes = require("./routes/usuario.rutas");
const cursoRoutes = require("./routes/curso.rutas");
const inscripcionRoutes = require("./routes/inscripcion.rutas")
const conexionBaseDatos = require("./config/conexionMongo");
const { errorMonitor } = require("events")
const app = express();
const PUERTO = 3000;

conexionBaseDatos();
// INICIO MIDDLEWARE
app.use(helmet())
app.use(cors())
app.use(morgan("dev"))
app.use(express.json())
app.use(express.static("public", {
    etag: false,
    maxAge: 0,
    setHeaders: (res) => {
        res.setHeader('Cache-Control', 'no-store');
    }}))

app.use("/api/usuarios", usuarioRoutes)
app.use("/api/cursos", cursoRoutes)
app.use("/api/inscripciones", inscripcionRoutes)
// FIN MIDDLEWARE

app.get("/", (req, res) =>{
    res.sendFile(path.join(__dirname, "public", "index.html"))
})

app.use((req, res) =>{
    res.status(404).json({error : "Ruta no encontrada"})
})

app.use((error, req, res, next) =>{
    console.error(error.stack)
    res.status(500).json({error: "Error interno del servidor"})
})

app.listen(PUERTO, () =>{
    console.log(`Servidor iniciado en el puerto ${PUERTO}`);
})

