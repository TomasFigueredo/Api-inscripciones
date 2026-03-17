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
        console.log(`${inscripciones.length}`)
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

/*btnMostrarTodo.addEventListener('click', async () => {
try {
    const res = await fetch('/api/inscripciones');
    const inscripciones =  await res.json();
    cuerpoTabla.innerHTML = '';
    
    // Crear filas
    inscripciones.forEach(inscr => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
        <td>${inscr._id}</td>
        <td>${inscr.curso?.cursoID || 'Sin curso'}</td>
        <td>${inscr.usuario?.nombreID || 'Sin usuario'}</td>
        <td>${new Date(inscr.fechaInscripcion).toLocaleDateString()}</td>
        `;
        cuerpoTabla.appendChild(tr);
    });
} catch (error) {
    alert('Error al listar inscriptos: ' + error.message);
}
});*/