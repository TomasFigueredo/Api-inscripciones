const btnAlta = document.getElementById("btn-crear")
const btnBaja = document.getElementById("btn-eliminar")
const btnMostrarTodo = document.getElementById("btn-ver")
const btnBuscarInscripcion = document.getElementById("btn-buscar-inscripcion")
const btnMostrarPorCurso = document.getElementById("ver-inscripciones-curso")
const tablaInscripcion = document.getElementById("container-tabla")
const cuerpoTabla = document.getElementById("tabla-inscripcion")

document.addEventListener("DOMContentLoaded", async() =>{
    tablaInscripcion.style.display = "none"
    btnAlta.addEventListener("click", async() =>{
        tablaInscripcion.style.display = "none"
    })
});

btnAlta.addEventListener("click", async() =>{
    const usuarioID = prompt("Ingrese el ID del usuario")
    if(!usuarioID)return
    const cursoID = prompt("Ingrese el ID del curso")
    if(!cursoID)return

    const inscripcionNueva = {usuarioID, cursoID}
    console.log(`ID DE USUARIO:${inscripcionNueva.usuarioID} ID DE CURSO:${inscripcionNueva.cursoID}`)

    try{
        const respuestaServidor = await fetch("/api/inscripciones", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(inscripcionNueva)
        })
        if(!respuestaServidor.ok){
            const error = await respuestaServidor.json()
            throw new Error(error.error)
        }else{
            const inscripcionCreada = await respuestaServidor.json()
            alert(`Inscripcion creada con exito ${inscripcionCreada._id}`)
        }
    }catch(error){
        alert(error.message)
    }

});

btnMostrarTodo.addEventListener("click", async() =>{
    tablaInscripcion.style.display = "block"
    try{
        const respuestaServidor = await fetch("/api/inscripciones")
        const inscripciones = await respuestaServidor.json()
        cuerpoTabla.innerHTML = ""
        console.table(inscripciones.map(i => ({id: i._id, curso: i.cursoID.curso, usuario: i.usuarioID.usuario})))
        inscripciones.forEach(inscr =>{
            const trow = document.createElement("tr")
            trow.innerHTML = `
                <td>${inscr._id}</td>
                <td>${inscr.cursoID.nombre}</td>
                <td>${inscr.usuarioID.nombre}</td>
                <td>${new Date(inscr.fechaInscripcion).toLocaleDateString()}</td>
            `;
            cuerpoTabla.appendChild(trow)
        })
    }catch(error){
        alert(error.message)
    }
});

btnBaja.addEventListener("click", async() =>{
    const idSeleccionado = prompt("Ingrese el ID de la inscripción a eliminar")
    if(!idSeleccionado){
        return
    }
    const confirmacion = confirm("Esta seguro que desea eliminar la inscripción?")
    if(!confirmacion){
        return
    }
    try{
        const respuestaServidor = await fetch(`/api/inscripciones/${idSeleccionado}`, {
            method: "DELETE"
        })
        if(!respuestaServidor.ok){
            const error = await respuestaServidor.json()
            throw new Error(error.error)
        }
        alert("Se elimino con exito la inscripcion!")
    }catch(error){
        alert(error.message);
    }
})

btnBuscarInscripcion.addEventListener("click", async() =>{
    const idSeleccionado = prompt("Ingrese el ID de la inscripcion que desea buscar")
    if(!idSeleccionado){
        return
    }
    try{
        const respuestaServidor = await fetch(`/api/inscripciones/${idSeleccionado}`)
        if(!respuestaServidor.ok){
            const errorVariable = await respuestaServidor.json()
            throw new Error(errorVariable.error)
        }
        const inscripcion = await respuestaServidor.json()
        alert(`La inscripcion seleccionada es la siguiente: ${inscripcion}`)
    }catch(error){
        alert(error.message)
    }

})