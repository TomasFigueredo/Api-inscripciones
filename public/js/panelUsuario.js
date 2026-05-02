const btnAlta = document.getElementById("btn-alta")
const btnBaja = document.getElementById("btn-baja")
const btnModificacion = document.getElementById("btn-modificacion")
const btnListado = document.getElementById("btn-listado")
const tablaUsuarios = document.getElementById("tabla-usuarios")

btnAlta.addEventListener("click", async () =>{
    try{
        let nombre = prompt("Ingrese su Nombre")
        let email = prompt("Ingrese su Email")
        const usuario = {email, nombre}
        const respuestaServidor = await fetch("/api/usuarios", {
            method: "POST",
            headers:{'Content-Type': 'application/json'}, 
            body: JSON.stringify(usuario)
        });
        if(!respuestaServidor.ok){
            const err = await respuestaServidor.json()
            const mensaje = err.error || err.errores?.map(e => e.msg).join("\n") || "Error"
            throw new Error(mensaje)
        }
        const usuarioCreado = await respuestaServidor.json()
        alert(`Usuario creado correctamente: ${usuarioCreado.nombre} ${usuarioCreado.email}`)
    }catch(error){
        alert(`ERROR: ${error.message}`)
    }
});

btnBaja.addEventListener("click", async () =>{
    try{
        let idSeleccionado = prompt("Ingrese el id del usuario que desea dar de baja")
        if(!idSeleccionado) return
        const respuestaServidor = await fetch(`/api/usuarios/${idSeleccionado}`, {
            method: "DELETE"
        });
        if(!respuestaServidor.ok){
            const error = await respuestaServidor.json()
            throw new Error(error.error)
        }
        alert("Se dio de baja con éxito el usuario")
    }catch(error){
        alert(`Se genero un error al dar de baja el usuario ${error.message}`)
    }
})

btnModificacion.addEventListener("click", async () =>{
    try{
        console.log("Presionaron el boton")
        let idSeleccionado = prompt("Ingrese el id del usuario que desea modificar")
        if(!idSeleccionado) return
        let nombre = prompt("Ingrese su nuevo nombre")
        let email = prompt("Ingrese su nuevo email")
        const respuestaServidor = await fetch(`/api/usuarios/${idSeleccionado}`,{ 
            method: "PUT",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({nombre, email})
        });
        
        if(!respuestaServidor.ok){
            const error = await respuestaServidor.json()
            throw new Error(error.error)
        }
        const usuarioActualizado = await respuestaServidor.json()
        alert(`Usuario ${idSeleccionado} fue modificado con exito: ${usuarioActualizado.nombre} - ${usuarioActualizado.email}`)
    }catch(error){
        alert(`Se genero un error al querer modificar el usuario ${error.message}`)
    }
})

btnListado.addEventListener("click", async () =>{
    try{
        const respuestaServidor = await fetch(`/api/usuarios/`);
        const listado = await respuestaServidor.json()
        tablaUsuarios.innerHTML = '';
        listado.forEach(usuario => {
            const tr = document.createElement("tr")
            tr.innerHTML = `
                <td>${usuario._id}</td>
                <td>${usuario.nombre}</td>
                <td>${usuario.email}</td>
            `
            tablaUsuarios.appendChild(tr)
        });
    }catch(error){
        alert(`Se genero un error al querer mostrar los usuarios ${error.message}`)
    }
})