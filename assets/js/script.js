const tareas = [
{
    id: 1658447679863,
    nombre: "Hacer compras",
    terminada: true
},
{
    id: 1658447679864,
    nombre: "Ir al banco",
    terminada: false
},
{
    id: 1658447679865,
    nombre: "Estudiar",
    terminada: false
}
]

const tablaTarea = document.querySelector(".id-tarea tbody")
const realizadas = document.querySelector(".realizadas")
const total = document.querySelector(".total")
const btnAgregar = document.querySelector("#btnAgregar")
const nuevaTarea = document.querySelector("#nuevaTarea")


const reIniciar = (listaTareas) => {
    let html = ""

    listaTareas.forEach(tarea => {
        if (tarea.terminada) {
            html+=
            `
                <tr>
                    <th scope="row">${tarea.id}</th>
                    <td class="text-muted">${tarea.nombre} <span class="text-success">(Terminada)</span></td>
                    <td>
                        <input type="checkbox" onclick="handleCheckbox(${tarea.id})" checked />
                        &nbsp;
                        <img src="assets/img/imgx.png" alt="Eliminar" onclick="handleDelete(${tarea.id})" />
                    </td>
                </tr>
            `
        } else {
            html +=
            `
                <tr>
                    <th scope="row">${tarea.id}</th>
                    <td>${tarea.nombre}</td>
                    <td>
                        <input type="checkbox" onclick="handleCheckbox(${tarea.id})" />
                        &nbsp;
                        <img src="assets/img/imgx.png" alt="Eliminar" onclick="handleDelete(${tarea.id})" />
                    </td>
                </tr>
            `
        }
    });
    tablaTarea.innerHTML= html
    realizadas.innerHTML = tareas.filter(tarea => tarea.terminada === true).length
    total.innerHTML = tareas.length

}

const handleCheckbox = id => {
    tareas.forEach((tarea) => {
        if (tarea.id === id) {
            tarea.terminada = !tarea.terminada
        }
    })
    reIniciar(tareas)
}

const handleDelete = id => {
    tareas.forEach((tarea, index) =>{
        if(tarea.id === id){
            tareas.splice(index, 1)
        }
    })
    reIniciar(tareas)
}

reIniciar(tareas)
btnAgregar.addEventListener("click", () =>{
    if(!nuevaTarea.value.trim()) {
        alert("Debe ingresar una tarea antes de agregarla")
    } else {
        tareas.unshift({
            id: Date.now(),
            nombre: nuevaTarea.value,
            terminada: false
        })
        reIniciar(tareas)
    }
    nuevaTarea.value = ""
})