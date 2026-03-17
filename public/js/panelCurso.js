const btnCrear = document.getElementById("btn-crear")
const btnVerCursos = document.getElementById("btn-ver-cursos")
const btnEliminar = document.getElementById("btn-eliminar")
const btnActualizar = document.getElementById("btn-actualizar")
const tablaCursos = document.getElementById("tabla-cursos")

btnCrear.addEventListener('click', async () => {

const nombre = prompt('Ingrese nombre de curso:');
if (!nombre) return;
const cupo = prompt('Ingrese el cupo máxmio:');
if (!cupo) return;

const maxCupo = Number(cupo);
if (isNaN(maxCupo)) {
    alert('El cupo debe ser numérico');
    return;
}

const cursoAlta = { nombre, maxCupo };

try {
    const res = await fetch('/api/cursos', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(cursoAlta)
    });

    if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error);
    }

    const cursoCreado = await res.json();
    alert("Se creo con exito el curso!")

} catch (error) {
    alert('Error: ' + error.message);
}
});

btnEliminar.addEventListener("click", async () =>{
    const idEliminar = prompt("Ingrese el id del curso que desea eliminar")
    if(!idEliminar){
        return;
    }
    const confirmacion = confirm("Esta seguro que desea eliminar este curso?")
    if(confirmacion == false){
        return;
    }
    try{
        const respuestaServidor = await fetch(`/api/cursos/${idEliminar}`, {
            method : "DELETE"
        })
        if(!respuestaServidor.ok){
            const error = await respuestaServidor.json();
            throw new Error(error.error)
        }
        alert("Se elimino el curso!")
    }catch(error){
        alert(error.message)
    }
});

btnVerCursos.addEventListener("click", async () =>{
    try{
        const respuestaServidor = await fetch("/api/cursos")
        const cursos = await respuestaServidor.json()
        tablaCursos.innerHTML = ""
        cursos.forEach(c => {
            const tr = document.createElement("tr")
            tr.innerHTML = `
                <td>${c._id}</td>
                <td>${c.nombre}</td>
                <td>${c.maxCupo}</td>
            `
            tablaCursos.appendChild(tr)
        });
    }catch(error){
        alert("Error al mostrar cursos")
    }
})

btnActualizar.addEventListener('click', async () => {
const id = prompt('Ingrese ID del curso a actualizar:');
if (!id) return;

const nombre = prompt('Nuevo nombre:');
if (!nombre) return;

try {
    const res = await fetch(`/api/cursos/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nombre })
    });

    if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error);
    }
    const actualizado = await res.json();
    alert(`curso actualizado:\n${actualizado.nombre}`);

} catch (error) {
    alert(error.message);
}
});