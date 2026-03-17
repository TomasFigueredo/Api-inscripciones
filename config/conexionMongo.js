const mongoose = require("mongoose");
const conectarMongo = async() =>{
    try{
        const uri = process.env.MONGO_URI
        await mongoose.connect(uri);
        console.log("La conexion con MONGO fue un exito!")
    }catch(err){
        console.log(`Se genero el siguiente error ${err.message}`);
    }
}

module.exports = conectarMongo;