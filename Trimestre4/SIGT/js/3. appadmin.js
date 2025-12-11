document.addEventListener('DOMContentLoaded', () => {
  const tabla = document.getElementById('tablaEmpleados');
  const modal = new bootstrap.Modal(document.getElementById('empleadoModal'));
  const form = document.getElementById('formEmpleado');
  const modalEliminar = new bootstrap.Modal(document.getElementById('modalEliminar'));
  const modalEliminado = new bootstrap.Modal(document.getElementById('modalEliminado'));

  const nombre = document.getElementById('nombreEmpleado');
  const rol = document.getElementById('rolEmpleado');
  const hechas = document.getElementById('hechasEmpleado');
  const pendientes = document.getElementById('pendientesEmpleado');
  const total = document.getElementById('totalEmpleado');
  const entrega = document.getElementById('entregaEmpleado');
  const modo = document.getElementById('modo');
  const filaEditar = document.getElementById('filaEditar');

  let idAEliminar = null;
  let contadorId = tabla.querySelectorAll('tr').length + 1;

  document.getElementById('btnAgregarEmpleado').addEventListener('click', () => {
    form.reset();
    modo.value = 'crear';
    filaEditar.value = '';
    document.getElementById('empleadoModalLabel').textContent = 'Agregar Empleado';
    modal.show();
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const totalTareas = parseInt(hechas.value) + parseInt(pendientes.value);

    if (modo.value === 'crear') {
      const fila = crearFila(nombre.value, rol.value, hechas.value, pendientes.value, totalTareas, entrega.value);
      tabla.appendChild(fila);
    } else {
      const fila = document.getElementById(filaEditar.value);
      const celdas = fila.querySelectorAll('td');
      celdas[1].textContent = nombre.value;
      celdas[2].textContent = rol.value;
      celdas[3].textContent = hechas.value;
      celdas[4].textContent = pendientes.value;
      celdas[5].textContent = totalTareas;
      celdas[6].textContent = entrega.value;
    }

    actualizarTopEmpleados();
    actualizarGraficoTareas();
    modal.hide();
  });

  function crearFila(nombreVal, rolVal, hechasVal, pendientesVal, totalVal, entregaVal) {
    const id = `empleado-${contadorId}`;
    const fila = document.createElement('tr');
    fila.id = id;

    fila.innerHTML = `
      <td>${contadorId}</td>
      <td>${nombreVal}</td>
      <td>${rolVal}</td>
      <td>${hechasVal}</td>
      <td>${pendientesVal}</td>
      <td>${totalVal}</td>
      <td>${entregaVal}</td>
      <td>
        <button class="btn btn-sm btn-warning btn-editar" data-id="${id}">
          <i class="bi bi-pencil"></i>
        </button>
        <button class="btn btn-sm btn-danger btn-eliminar" data-id="${id}">
          <i class="bi bi-trash"></i>
        </button>
      </td>
    `;
    contadorId++;
    return fila;
  }

  tabla.addEventListener('click', (e) => {
    if (e.target.closest('.btn-editar')) {
      const id = e.target.closest('.btn-editar').dataset.id;
      const fila = document.getElementById(id);
      const celdas = fila.querySelectorAll('td');

      nombre.value = celdas[1].textContent;
      rol.value = celdas[2].textContent;
      hechas.value = celdas[3].textContent;
      pendientes.value = celdas[4].textContent;
      entrega.value = celdas[6].textContent;

      modo.value = 'editar';
      filaEditar.value = id;
      document.getElementById('empleadoModalLabel').textContent = 'Editar Empleado';
      modal.show();
    }

    if (e.target.closest('.btn-eliminar')) {
      idAEliminar = e.target.closest('.btn-eliminar').dataset.id;
      modalEliminar.show();
    }
  });

  document.getElementById('confirmarEliminar').addEventListener('click', () => {
    if (idAEliminar) {
      const fila = document.getElementById(idAEliminar);
      if (fila) {
        fila.remove();
        actualizarTopEmpleados();
        actualizarGraficoTareas();
        modalEliminar.hide();
        modalEliminado.show();
      }
      idAEliminar = null;
    }
  });

  actualizarTopEmpleados();
  actualizarGraficoTareas();
});

// TOP 5 EMPLEADOS POR RENDIMIENTO
function actualizarTopEmpleados() {
  const lista = document.getElementById('listaTopEmpleados');
  const filas = document.querySelectorAll('#tablaEmpleados tr');
  const empleados = [];

  filas.forEach(fila => {
    const celdas = fila.querySelectorAll('td');
    if (celdas.length < 7) return;

    const nombre = celdas[1].textContent;
    const hechas = parseInt(celdas[3].textContent);
    const pendientes = parseInt(celdas[4].textContent);
    const total = hechas + pendientes;
    const rendimiento = total > 0 ? (hechas / total) * 100 : 0;

    empleados.push({ nombre, rendimiento });
  });

  const top = empleados.sort((a, b) => b.rendimiento - a.rendimiento).slice(0, 5);

  lista.innerHTML = '';
  top.forEach(emp => {
    let badgeClass = 'bg-success';

    if (emp.rendimiento >= 100) {
      badgeClass = 'bg-info';
    } else if (emp.rendimiento >= 80) {
      badgeClass = 'bg-success';
    } else if (emp.rendimiento < 50) {
      badgeClass = 'bg-danger';
    }

    lista.innerHTML += `
      <li class="list-group-item d-flex justify-content-between align-items-center">
        ${emp.nombre}
        <span class="badge ${badgeClass}">${emp.rendimiento.toFixed(1)}%</span>
      </li>
    `;
  });
}

// GRÁFICO TORTA
let graficoTareas;

function actualizarGraficoTareas() {
  const filas = document.querySelectorAll('#tablaEmpleados tr');
  let hechas = 0;
  let pendientes = 0;

  filas.forEach(fila => {
    const celdas = fila.querySelectorAll('td');
    if (celdas.length < 7) return;

    hechas += parseInt(celdas[3].textContent);
    pendientes += parseInt(celdas[4].textContent);
  });

  const data = {
    labels: ['Tareas Hechas', 'Tareas Pendientes'],
    datasets: [{
      data: [hechas, pendientes],
      backgroundColor: ['#9EEECAFF', '#E2727DFF'],
      borderWidth: 1
    }]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'bottom' },
      title: {
        display: true,
        text: 'Distribución de Tareas',
        font: { size: 15 }
      }
    }
  };

  if (graficoTareas) graficoTareas.destroy();

  const ctx = document.getElementById('graficoTareas').getContext('2d');
  graficoTareas = new Chart(ctx, {
    type: 'pie',
    data,
    options
  });
}


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

// Función para generar el PDF del reporte de empleados y tareas
async function generarReportePDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  // Título
  doc.setFontSize(18);
  doc.text("Reporte de Empleados y Tareas", 105, 20, { align: 'center' });

  // Fecha
  const fecha = new Date();
  const fechaStr = fecha.toLocaleDateString('es-CO', {
    day: '2-digit', month: 'long', year: 'numeric'
  });
  doc.setFontSize(12);
  doc.text(`Fecha: ${fechaStr}`, 14, 30);

  // Obtener datos de la tabla de empleados
  const filas = document.querySelectorAll("#tablaEmpleados tr");
  const data = [];

  filas.forEach(fila => {
    const celdas = fila.querySelectorAll("td");
    if (celdas.length === 0) return;

    const filaData = [
      celdas[0].textContent, // ID
      celdas[1].textContent, // Nombre
      celdas[2].textContent, // Rol
      celdas[3].textContent, // Tareas Hechas
      celdas[4].textContent, // Pendientes
      celdas[5].textContent, // Total
      celdas[6].textContent  // Próxima Entrega
    ];
    data.push(filaData);
  });

  // Tabla con autoTable
  doc.autoTable({
    head: [['ID', 'Empleado', 'Rol', 'Hechas', 'Pendientes', 'Total', 'Próxima Entrega']],
    body: data,
    startY: 40,
    styles: { fontSize: 10 },
    headStyles: { fillColor: [41, 128, 185] }
  });

  // Firma y pie de página centrados
  doc.setFontSize(11);
  const paginaAlto = doc.internal.pageSize.height;
  const firmaY = paginaAlto - 40;
  const textoY = paginaAlto - 25;

  doc.text("Firma Responsable ______________________", 105, firmaY, { align: 'center' });
  doc.text("Este documento fue generado automáticamente desde el sistema.", 105, textoY, { align: 'center' });

  // Descargar PDF
  doc.save("reporte_empleados_tareas.pdf");
}

// Validar administrador y generar PDF
document.getElementById('btnDescargarPDF').addEventListener('click', () => {
  const docAdmin = document.getElementById('docAdmin').value.trim();
  const clave = document.getElementById('claveAdmin').value.trim();
  const error = document.getElementById('mensajeError');

  if (docAdmin === '' || clave === '') {
    error.classList.remove('d-none');
    return;
  }

  error.classList.add('d-none');

  // Cerrar el modal
  const modal = bootstrap.Modal.getInstance(document.getElementById('modalReporteEmpleado'));
  modal.hide();

  // Generar PDF
  generarReportePDF();
});