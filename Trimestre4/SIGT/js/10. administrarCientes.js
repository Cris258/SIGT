document.addEventListener('DOMContentLoaded', () => {
  const tabla = document.getElementById('tablaClientes');
  const modal = new bootstrap.Modal(document.getElementById('modalCliente'));
  const modalExito = new bootstrap.Modal(document.getElementById('modalExito'));
  const modalEliminar = new bootstrap.Modal(document.getElementById('modalEliminar'));

  const form = document.getElementById('formCliente');
  const nombre = document.getElementById('nombre');
  const correo = document.getElementById('correo');
  const telefono = document.getElementById('telefono');
  const direccion = document.getElementById('dirección');
  const departamento = document.getElementById('departamento');
  const productosAdquiridos = document.getElementById('productosAdquiridos');
  const registro = document.getElementById('registro');
  const estado = document.getElementById('estado');
  const btnGuardar = document.getElementById('btnGuardar');

  let idAEliminar = null;
  let modo = 'crear';
  let filaEditar = null;
  let contadorId = tabla.querySelectorAll('tr').length + 1;

  function ponerFechaActual() {
    const hoy = new Date().toISOString().split('T')[0];
    registro.value = hoy;
  }

  document.getElementById('btnAgregarCliente').addEventListener('click', () => {
    form.reset();
    modo = 'crear';
    filaEditar = null;
    document.querySelector('#modalCliente .modal-title').textContent = 'Nuevo Cliente';
    ponerFechaActual();
    btnGuardar.disabled = false;
    modal.show();
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const ultimaCompra = new Date().toISOString().split('T')[0];

    if (modo === 'crear') {
      const fila = crearFila(contadorId, nombre.value, correo.value, telefono.value, direccion.value, departamento.value, productosAdquiridos.value, registro.value, estado.value);
      tabla.appendChild(fila);
      contadorId++;
    } else {
      const celdas = filaEditar.querySelectorAll('td');
      celdas[1].textContent = nombre.value;
      celdas[2].textContent = correo.value;
      celdas[3].textContent = telefono.value;
      celdas[4].textContent = direccion.value;
      celdas[5].textContent = departamento.value;
      celdas[6].textContent = productosAdquiridos.value;
      celdas[7].textContent = registro.value;
      celdas[8].textContent = estado.value;
    }

    modal.hide();
    modalExito.show();
  });

  function crearFila(id, nombre, correo, telefono, direccion, departamento, productos, registro, estado) {
    const fila = document.createElement('tr');
    fila.id = `cliente-${id}`;
    fila.innerHTML = `
      <td>${id}</td>
      <td>${nombre}</td>
      <td>${correo}</td>
      <td>${telefono}</td>
      <td>${direccion}</td>
      <td>${departamento}</td>
      <td>${productos}</td>
      <td>${registro}</td>
      <td>${estado}</td>
      <td>
        <button class="btn btn-warning btn-sm btn-editar" data-id="cliente-${id}" title="Editar">
          <i class="bi bi-pencil"></i>
        </button>
        <button class="btn btn-danger btn-sm btn-eliminar" data-id="cliente-${id}" title="Eliminar">
          <i class="bi bi-trash"></i>
        </button>
      </td>
    `;
    return fila;
  }

  tabla.addEventListener('click', (e) => {
    const editarBtn = e.target.closest('.btn-editar');
    const eliminarBtn = e.target.closest('.btn-eliminar');

    if (editarBtn) {
      const id = editarBtn.dataset.id;
      filaEditar = document.getElementById(id);
      const celdas = filaEditar.querySelectorAll('td');

      nombre.value = celdas[1].textContent;
      correo.value = celdas[2].textContent;
      telefono.value = celdas[3].textContent;
      direccion.value = celdas[4].textContent;
      departamento.value = celdas[5].textContent;
      productosAdquiridos.value = celdas[6].textContent;
      registro.value = celdas[7].textContent;
      estado.value = celdas[8].textContent;

      modo = 'editar';
      document.querySelector('#modalCliente .modal-title').textContent = 'Editar Cliente';
      btnGuardar.disabled = false;
      modal.show();
    }

    if (eliminarBtn) {
      idAEliminar = eliminarBtn.dataset.id;
      modalEliminar.show();
    }
  });

  document.getElementById('confirmarEliminar').addEventListener('click', () => {
    if (idAEliminar) {
      const fila = document.getElementById(idAEliminar);
      if (fila) fila.remove();
      modalEliminar.hide();
      idAEliminar = null;
    }
  });
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