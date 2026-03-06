document.addEventListener("DOMContentLoaded", () => {
    let empleados = [];
    let contadorID = 4;
    let idEditando = null;
    let filaAEliminar = null;
    const modalEliminar = new bootstrap.Modal(document.getElementById("modalEliminar"));

    const btnAgregar = document.getElementById("btnAgregarEmpleado");
    const formEmpleado = document.getElementById("formEmpleado");
    const btnGuardar = document.getElementById("btnGuardar");
    const tabla = document.getElementById("tablaEmpleados");

    const campos = ['nombre', 'tipoDoc', 'numDoc', 'eps', 'telefono', 'correo', 'rolEmpleado'];

    // Cargar empleados iniciales del HTML
    document.querySelectorAll("#tablaEmpleados tr").forEach((fila) => {
        const celdas = fila.querySelectorAll("td");
        const emp = {
            id: parseInt(celdas[0].textContent),
            nombre: celdas[1].textContent,
            tipoDoc: celdas[2].textContent,
            numDoc: celdas[3].textContent,
            eps: celdas[4].textContent,
            telefono: celdas[5].textContent,
            correo: celdas[6].textContent,
            rol: celdas[7].textContent,
            hechas: parseInt(celdas[8].textContent),
            pendientes: parseInt(celdas[9].textContent),
            total: parseInt(celdas[10].textContent),
        };
        empleados.push(emp);
        fila.setAttribute("data-id", emp.id);
    });

    // Validación de campos
    formEmpleado.addEventListener('input', () => {
        const completos = campos.every(id => document.getElementById(id).value.trim() !== '');
        btnGuardar.disabled = !completos;
    });

    // Mostrar modal al hacer clic en Agregar
    btnAgregar.addEventListener("click", () => {
        formEmpleado.reset();
        idEditando = null;
        btnGuardar.textContent = "Guardar";
        btnGuardar.disabled = true;
        new bootstrap.Modal(document.getElementById("modalEmpleado")).show();
    });

    // Guardar o actualizar empleado
    formEmpleado.addEventListener("submit", (e) => {
        e.preventDefault();

        const datos = {
            nombre: document.getElementById("nombre").value.trim(),
            tipoDoc: document.getElementById("tipoDoc").value,
            numDoc: document.getElementById("numDoc").value.trim(),
            eps: document.getElementById("eps").value.trim(),
            telefono: document.getElementById("telefono").value.trim(),
            correo: document.getElementById("correo").value.trim(),
            rol: document.getElementById("rolEmpleado").value,
        };

        if (idEditando) {
            const emp = empleados.find(e => e.id === idEditando);
            Object.assign(emp, datos);
            actualizarTabla();
            idEditando = null;
        } else {
            const nuevoEmpleado = {
                id: contadorID++,
                ...datos,
                hechas: 0,
                pendientes: 0,
                total: 0
            };
            empleados.push(nuevoEmpleado);
            agregarFila(nuevoEmpleado);
        }

        bootstrap.Modal.getInstance(document.getElementById("modalEmpleado")).hide();
        new bootstrap.Modal(document.getElementById("modalExito")).show();
    });

    // Agrega una fila a la tabla
    function agregarFila(emp) {
        const fila = document.createElement("tr");
        fila.setAttribute("data-id", emp.id);
        fila.innerHTML = `
        <td>${emp.id}</td>
        <td>${emp.nombre}</td>
        <td>${emp.tipoDoc}</td>
        <td>${emp.numDoc}</td>
        <td>${emp.eps}</td>
        <td>${emp.telefono}</td>
        <td>${emp.correo}</td>
        <td>${emp.rol}</td>
        <td>${emp.hechas}</td>
        <td>${emp.pendientes}</td>
        <td>${emp.total}</td>
        <td>
          <button class="btn btn-sm btn-warning btn-editar"><i class="bi bi-pencil"></i></button>
          <button class="btn btn-sm btn-danger btn-eliminar"><i class="bi bi-trash"></i></button>
        </td>
      `;
        tabla.appendChild(fila);
    }

    // Actualizar toda la tabla
    function actualizarTabla() {
        tabla.innerHTML = '';
        empleados.forEach(agregarFila);
    }

    // Delegación de eventos para Editar y Eliminar
    tabla.addEventListener("click", (e) => {
        const fila = e.target.closest("tr");
        if (!fila) return;
        const id = parseInt(fila.getAttribute("data-id"));

        if (e.target.closest(".btn-editar")) {
            const emp = empleados.find(e => e.id === id);
            document.getElementById("nombre").value = emp.nombre;
            document.getElementById("tipoDoc").value = emp.tipoDoc;
            document.getElementById("numDoc").value = emp.numDoc;
            document.getElementById("eps").value = emp.eps;
            document.getElementById("telefono").value = emp.telefono;
            document.getElementById("correo").value = emp.correo;
            document.getElementById("rolEmpleado").value = emp.rol;
            idEditando = id;
            btnGuardar.textContent = "Actualizar";
            btnGuardar.disabled = false;
            new bootstrap.Modal(document.getElementById("modalEmpleado")).show();
        }

        if (e.target.closest(".btn-eliminar")) {
            filaAEliminar = id;
            modalEliminar.show();
        }
    });

    // Confirmación de eliminación
    document.getElementById("confirmarEliminar").addEventListener("click", () => {
        if (filaAEliminar !== null) {
            empleados = empleados.filter(e => e.id !== filaAEliminar);
            actualizarTabla();
            filaAEliminar = null;
            modalEliminar.hide();
        }
    });
});