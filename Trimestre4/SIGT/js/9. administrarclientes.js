document.addEventListener('DOMContentLoaded', () => {
    const tabla = document.getElementById('tablaInventario');
    const form = document.getElementById('formProducto');
    const modal = new bootstrap.Modal(document.getElementById('clienteModal'));
    const modalEliminar = new bootstrap.Modal(document.getElementById('modalEliminar'));
    const modalEliminado = new bootstrap.Modal(document.getElementById('modalEliminado'));

    const nombre = document.getElementById('nombre');
    const correo = document.getElementById('correo');
    const telefono = document.getElementById('telefono');
    const direccion = document.getElementById('dirección');
    const departamento = document.getElementById('departamento');
    const productosAdquiridos = document.getElementById('productosAdquiridos');
    const modo = document.getElementById('modo');
    const filaEditar = document.getElementById('filaEditar');

    let idAEliminar = null;
    let contador = tabla.querySelectorAll('tr').length + 1;

    // Abrir modal para crear
    document.getElementById('btnAgregarCliente').addEventListener('click', () => {
        form.reset();
        modo.value = 'crear';
        filaEditar.value = '';
        document.getElementById('clienteModalLabel').textContent = 'Agregar Cliente';
        modal.show();
    });

    // Enviar formulario
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const id = `cliente-${contador}`;
        const total = parseInt(productosAdquiridos.value);

        if (modo.value === 'crear') {
            const fila = crearFila(id, contador, nombre.value, correo.value, telefono.value, direccion.value, departamento.value, total);
            tabla.appendChild(fila);
            contador++;
        } else {
            const fila = document.getElementById(filaEditar.value);
            const celdas = fila.querySelectorAll('td');
            celdas[1].textContent = nombre.value;
            celdas[2].textContent = correo.value;
            celdas[3].textContent = telefono.value;
            celdas[4].textContent = direccion.value;
            celdas[5].textContent = departamento.value;
            celdas[6].textContent = total;
        }

        actualizarTopClientes();
        actualizarGraficoClientes();
        modal.hide();
    });

    // Crear fila
    function crearFila(id, num, nombre, correo, telefono, direccion, depto, adquiridos) {
        const tr = document.createElement('tr');
        tr.id = id;
        tr.innerHTML = `
      <td>${num}</td>
      <td>${nombre}</td>
      <td>${correo}</td>
      <td>${telefono}</td>
      <td>${direccion}</td>
      <td>${depto}</td>
      <td>${adquiridos}</td>
      <td>
        <button class="btn btn-sm btn-warning btn-editar" data-id="${id}"><i class="bi bi-pencil"></i></button>
        <button class="btn btn-sm btn-danger btn-eliminar" data-id="${id}"><i class="bi bi-trash"></i></button>
      </td>
    `;
        return tr;
    }

    // Delegar editar/eliminar
    tabla.addEventListener('click', (e) => {
        const btn = e.target.closest('button');
        if (!btn) return;

        const id = btn.dataset.id;
        const fila = document.getElementById(id);
        const celdas = fila.querySelectorAll('td');

        if (btn.classList.contains('btn-editar')) {
            modo.value = 'editar';
            filaEditar.value = id;
            nombre.value = celdas[1].textContent;
            correo.value = celdas[2].textContent;
            telefono.value = celdas[3].textContent;
            direccion.value = celdas[4].textContent;
            departamento.value = celdas[5].textContent;
            productosAdquiridos.value = celdas[6].textContent;
            document.getElementById('clienteModalLabel').textContent = 'Editar Cliente';
            modal.show();
        }

        if (btn.classList.contains('btn-eliminar')) {
            idAEliminar = id;
            modalEliminar.show();
        }
    });

    document.getElementById('confirmarEliminar').addEventListener('click', () => {
        if (idAEliminar) {
            const fila = document.getElementById(idAEliminar);
            if (fila) fila.remove();
            idAEliminar = null;
            actualizarTopClientes();
            actualizarGraficoClientes();
            modalEliminar.hide();
            modalEliminado.show();
        }
    });

    // TOP 5 CLIENTES
    function actualizarTopClientes() {
        const lista = document.getElementById('listaTopClientes');
        const filas = tabla.querySelectorAll('tr');
        const clientes = [];

        filas.forEach(fila => {
            const celdas = fila.querySelectorAll('td');
            if (celdas.length < 7) return;

            const nombre = celdas[1].textContent;
            const productos = parseInt(celdas[6].textContent);
            clientes.push({ nombre, productos });
        });

        const top = clientes.sort((a, b) => b.productos - a.productos).slice(0, 5);

        lista.innerHTML = '';
        top.forEach(cli => {
            lista.innerHTML += `
        <li class="list-group-item d-flex justify-content-between align-items-center">
          ${cli.nombre}
          <span class="badge bg-success">${cli.productos}</span>
        </li>
      `;
        });
    }

    // GRÁFICO TORTA
    let graficoClientes;

    function actualizarGraficoClientes() {
        const filas = tabla.querySelectorAll('tr');
        let bogota = 0;
        let otros = 0;

        filas.forEach(fila => {
            const celdas = fila.querySelectorAll('td');
            if (celdas.length < 7) return;
            const depto = celdas[5].textContent.trim().toLowerCase();
            const productos = parseInt(celdas[6].textContent);

            if (depto === 'bogota') {
                bogota += productos;
            } else {
                otros += productos;
            }
        });

        const data = {
            labels: ['Bogotá', 'Otros Departamentos'],
            datasets: [{
                data: [bogota, otros],
                backgroundColor: ['#198754', '#0dcaf0']
            }]
        };

        const options = {
            responsive: true,
            plugins: {
                legend: { position: 'bottom' },
                title: { display: true, text: 'Productos Adquiridos por Región' }
            }
        };

        if (graficoClientes) {
            graficoClientes.destroy();
        }

        const ctx = document.getElementById('graficoClientes').getContext('2d');
        graficoClientes = new Chart(ctx, {
            type: 'pie',
            data,
            options
        });
    }

    actualizarTopClientes();
    actualizarGraficoClientes();
});



//modal Actualizar Datos
document.getElementById('formActualizarDatos').addEventListener('submit', function (e) {
    e.preventDefault();
    alert('Datos actualizados correctamente');
    const modal = bootstrap.Modal.getInstance(document.getElementById('modalActualizarDatos'));
    modal.hide();
});

//modal actualizar contraseña
document.addEventListener('DOMContentLoaded', () => {
    const formCambiar = document.getElementById('formCambiarContrasena');
    const modalCambiar = bootstrap.Modal.getInstance(document.getElementById('modalCambiarContraseña'));
    const modalExito = new bootstrap.Modal(document.getElementById('modalExito'));
    const modalRecuperar = new bootstrap.Modal(document.getElementById('modalRecuperar'));
    const modalTemporal = new bootstrap.Modal(document.getElementById('modalTemporal'));

    const nueva = document.getElementById('nuevaContrasena');
    const repetir = document.getElementById('repetirContrasena');

    formCambiar.addEventListener('submit', function (e) {
        e.preventDefault();
        if (nueva.value !== repetir.value) {
            alert('Las contraseñas no coinciden.');
            return;
        }

        modalCambiar.hide();
        setTimeout(() => modalExito.show(), 400);
    });

    document.getElementById('linkOlvidoContrasena').addEventListener('click', (e) => {
        e.preventDefault();
        modalCambiar.hide();
        setTimeout(() => modalRecuperar.show(), 400);
    });

    document.getElementById('formRecuperar').addEventListener('submit', (e) => {
        e.preventDefault();
        modalRecuperar.hide();

        // Simular contraseña temporal
        const clave = generarClave(8);
        const claveSpan = document.getElementById('claveTemporal');
        claveSpan.textContent = clave;

        // Mostrar modal con contraseña temporal
        setTimeout(() => modalTemporal.show(), 400);

        // Botón mostrar/ocultar
        const btnToggle = document.getElementById('btnToggle');
        let visible = false;
        btnToggle.onclick = () => {
            visible = !visible;
            claveSpan.textContent = visible ? clave : '********';
            btnToggle.textContent = visible ? 'Ocultar' : 'Mostrar';
        };
    });

    function generarClave(length) {
        const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let result = '';
        for (let i = 0; i < length; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result;
    }
});

document.addEventListener("DOMContentLoaded", function () {
    // Elementos de los modales
    const modalCambiar = bootstrap.Modal.getOrCreateInstance(document.getElementById("modalCambiarContraseña"));
    const modalRecuperar = bootstrap.Modal.getOrCreateInstance(document.getElementById("modalRecuperarCorreo"));
    const modalClave = bootstrap.Modal.getOrCreateInstance(document.getElementById("modalClaveTemporal"));

    // Enlace para pasar del modalCambiar al modalRecuperar
    document.getElementById("enlaceRecuperar").addEventListener("click", function (e) {
        e.preventDefault();
        modalCambiar.hide();
        setTimeout(() => {
            modalRecuperar.show();
        }, 400);
    });

    const botones = document.querySelectorAll('.toggle-password');

    botones.forEach(boton => {
        boton.addEventListener('click', function () {
            const inputId = this.getAttribute('data-input');
            const input = document.getElementById(inputId);
            const icono = this.querySelector('i');

            if (input.type === 'password') {
                input.type = 'text';
                icono.classList.replace('bi-eye', 'bi-eye-slash');
            } else {
                input.type = 'password';
                icono.classList.replace('bi-eye-slash', 'bi-eye');
            }
        });
    });

    document.getElementById("formCambiarContraseña").addEventListener("submit", function (e) {
        e.preventDefault();

        const pass1 = document.getElementById("passwordNueva").value.trim();
        const pass2 = document.getElementById("passwordRepetir").value.trim();
        const error = document.getElementById("errorCoincidencia");

        if (pass1 !== pass2) {
            error.classList.remove("d-none");
            return;
        }

        error.classList.add("d-none");
    });

    document.addEventListener("DOMContentLoaded", function () {
        const form = document.getElementById("formCambiarContraseña");
        const errorCoincidencia = document.getElementById("errorCoincidencia");

        form.addEventListener("submit", function (e) {
            e.preventDefault();

            const pass1 = document.getElementById("passwordNueva").value.trim();
            const pass2 = document.getElementById("passwordRepetir").value.trim();

            if (pass1 !== pass2) {
                errorCoincidencia.classList.remove("d-none");
                return;
            }

            errorCoincidencia.classList.add("d-none");

            // Cierra el modal de cambiar contraseña
            const modalCambiar = bootstrap.Modal.getInstance(document.getElementById("modalCambiarContraseña"));
            modalCambiar.hide();

            // Abre el modal de éxito
            const modalExito = new bootstrap.Modal(document.getElementById("modalClaveCambiada"));
            setTimeout(() => {
                modalExito.show();
            }, 400); // espera la animación fade del anterior
        });
    });


    // Formulario de recuperación de correo
    document.getElementById("formRecuperarCorreo").addEventListener("submit", function (e) {
        e.preventDefault();
        const correo = document.getElementById("emailRecuperar").value.trim();
        const mensajeError = document.getElementById("mensajeErrorCorreo");

        // Validación básica del correo
        if (!correo.includes("@") || correo === "") {
            mensajeError.classList.remove("d-none");
            return;
        }

        mensajeError.classList.add("d-none");

        // Generar clave temporal
        const clave = generarClave(8);
        document.getElementById("claveTemporalReal").textContent = clave;

        // Mostrar la clave temporal real y ocultar la oculta
        document.getElementById("claveTemporalReal").classList.remove("d-none");
        document.getElementById("claveTemporalOculta").classList.add("d-none");
        document.getElementById("iconoToggleClave").className = "bi bi-eye-slash";

        // Cerrar modal de recuperación y abrir el de clave temporal
        modalRecuperar.hide();
        setTimeout(() => {
            modalClave.show();
        }, 400);
    });

    // Mostrar/ocultar clave temporal
    document.getElementById("btnToggleClave").addEventListener("click", function () {
        const claveReal = document.getElementById("claveTemporalReal");
        const claveOculta = document.getElementById("claveTemporalOculta");
        const icono = document.getElementById("iconoToggleClave");

        const mostrando = !claveReal.classList.contains("d-none");

        claveReal.classList.toggle("d-none", mostrando);
        claveOculta.classList.toggle("d-none", !mostrando);
        icono.className = mostrando ? "bi bi-eye" : "bi bi-eye-slash";
    });

    // Función generadora de clave
    function generarClave(longitud) {
        const caracteres = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        let clave = "";
        for (let i = 0; i < longitud; i++) {
            const index = Math.floor(Math.random() * caracteres.length);
            clave += caracteres.charAt(index);
        }
        return clave;
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const formCambiar = document.getElementById("formCambiarContraseña");
    const modalCambiar = bootstrap.Modal.getOrCreateInstance(document.getElementById("modalCambiarContraseña"));
    const modalExito = new bootstrap.Modal(document.getElementById("modalExito"));
    const errorCoincidencia = document.getElementById("errorCoincidencia");

    formCambiar.addEventListener("submit", function (e) {
        e.preventDefault(); // Evita el envío por defecto

        const pass1 = document.getElementById("passwordNueva").value.trim();
        const pass2 = document.getElementById("passwordRepetir").value.trim();

        if (pass1 !== pass2) {
            errorCoincidencia.classList.remove("d-none");
            return;
        }

        errorCoincidencia.classList.add("d-none");

        // Cierra el modal de cambiar contraseña
        modalCambiar.hide();

        // Espera que se cierre antes de abrir el de éxito
        setTimeout(() => {
            modalExito.show();
        }, 400); // tiempo suficiente para el fade
    });
});

// Modal asignar tarea
const formAsignar = document.getElementById('formAsignarTarea');
formAsignar.addEventListener('submit', function (e) {
    e.preventDefault();

    const idEmpleado = parseInt(document.getElementById('idEmpleadoAsignar').value);
    const fechaEntrega = document.getElementById('fechaEntregaAsignar').value;

    const filas = document.querySelectorAll('#tablaEmpleados tr');
    let encontrado = false;

    filas.forEach(fila => {
        const celdas = fila.querySelectorAll('td');
        const idFila = parseInt(celdas[0].textContent);

        if (idFila === idEmpleado) {
            let hechas = parseInt(celdas[2].textContent);
            let pendientes = parseInt(celdas[3].textContent);

            pendientes++; // Solo aumentamos pendientes

            // Actualizar valores en la tabla
            celdas[4].textContent = pendientes;
            celdas[5].textContent = hechas + pendientes; // Total recalculado
            celdas[6].textContent = fechaEntrega;

            encontrado = true;
        }
    });

    // Cierra el modal principal
    bootstrap.Modal.getInstance(document.getElementById('modalAsignarTarea')).hide();

    // Si no se encontró el ID, muestra el modal de error
    if (!encontrado) {
        setTimeout(() => {
            const modalError = new bootstrap.Modal(document.getElementById('modalErrorAsignar'));
            modalError.show();
        }, 300);
    } else {
        actualizarTopEmpleados(); // opcional
    }
});

// Función para generar el PDF del reporte de clientes
async function generarReportePDF() {
  const doc = new jspdf.jsPDF();

  doc.setFontSize(18);
  doc.text("Reporte de Clientes", 105, 20, { align: 'center' });

  const fecha = new Date();
  const fechaStr = fecha.toLocaleDateString('es-CO', {
    day: '2-digit', month: 'long', year: 'numeric'
  });

  doc.setFontSize(12);
  doc.text(`Fecha: ${fechaStr}`, 14, 30);

  const filas = document.querySelectorAll("#tablaInventario tr");
  const data = [];

  filas.forEach(fila => {
    const celdas = fila.querySelectorAll("td");
    if (celdas.length === 0) return;

    const filaData = [
      celdas[0].textContent, // ID
      celdas[1].textContent, // Nombre
      celdas[2].textContent, // Correo
      celdas[3].textContent, // Teléfono
      celdas[4].textContent, // Dirección
      celdas[5].textContent, // Departamento
      celdas[6].textContent  // Productos Adquiridos
    ];
    data.push(filaData);
  });

  doc.autoTable({
    head: [['ID', 'Nombre', 'Correo', 'Teléfono', 'Dirección', 'Departamento', 'Productos']],
    body: data,
    startY: 40,
    styles: { fontSize: 9 },
    headStyles: { fillColor: [41, 128, 185] }
  });

  const h = doc.internal.pageSize.height;
  doc.setFontSize(11);
  doc.text("Firma Responsable ______________________", 105, h - 40, { align: 'center' });
  doc.text("Este documento fue generado automáticamente desde el sistema.", 105, h - 25, { align: 'center' });

  doc.save("reporte_clientes.pdf");
}

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('btnDescargarPDF').addEventListener('click', () => {
    const docAdmin = document.getElementById('docAdmin').value.trim();
    const clave = document.getElementById('claveAdmin').value.trim();
    const error = document.getElementById('mensajeError');

    if (docAdmin === '' || clave === '') {
      error.classList.remove('d-none');
      return;
    }

    error.classList.add('d-none');

    const modal = bootstrap.Modal.getInstance(document.getElementById('modalReporteCliente'));
    if (modal) modal.hide();

    generarReportePDF();
  });
});
