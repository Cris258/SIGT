document.addEventListener('DOMContentLoaded', () => {
    const tabla = document.getElementById('tablaInventario');
    const modal = new bootstrap.Modal(document.getElementById('productoModal'));
    const form = document.getElementById('formProducto');

    const nombre = document.getElementById('nombreProducto');
    const categoria = document.getElementById('categoriaProducto');
    const talla = document.getElementById('tallaProducto');
    const stock = document.getElementById('stockProducto');
    const precio = document.getElementById('precioProducto');
    const fecha = document.getElementById('fechaProducto');
    const ubicacion = document.getElementById('ubicacionProducto');
    const estado = document.getElementById('estadoProducto');
    const modo = document.getElementById('modo');
    const filaEditar = document.getElementById('filaEditar');

    const modalEliminar = new bootstrap.Modal(document.getElementById('modalEliminar'));
    const modalEliminado = new bootstrap.Modal(document.getElementById('modalEliminado'));
    let idAEliminar = null;

    // Llenar fecha actual al abrir el modal
    function ponerFechaActual() {
        const hoy = new Date().toISOString().split('T')[0];
        fecha.value = hoy;
    }

    // Abrir modal para agregar producto
    document.getElementById('btnAgregarProducto').addEventListener('click', () => {
        form.reset();
        modo.value = 'crear';
        filaEditar.value = '';
        document.getElementById('productoModalLabel').textContent = 'Agregar Producto';
        ponerFechaActual();
        modal.show();
    });

    // Manejar envío del formulario
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const precioFormateado = formatearPrecio(precio.value);

        if (modo.value === 'crear') {
            const fila = crearFila(nombre.value, categoria.value, talla.value, stock.value, precioFormateado, fecha.value, ubicacion.value, estado.value);
            tabla.appendChild(fila);
            contadorId++;
        } else {
            const fila = document.getElementById(filaEditar.value);
            const celdas = fila.querySelectorAll('td');
            celdas[1].textContent = nombre.value;
            celdas[2].textContent = categoria.value;
            celdas[3].textContent = talla.value;
            celdas[4].textContent = stock.value;
            celdas[5].textContent = formatearPrecio(precio.value);
            celdas[6].textContent = fecha.value;
            celdas[7].textContent = ubicacion.value;
            celdas[8].textContent = estado.value;
        }

        modal.hide();
    });

    let contadorId = tabla.querySelectorAll('tr').length + 1;

    function formatearPrecio(valor) {
        const numero = parseFloat(valor.toString().replace(/\D/g, ''));
        if (isNaN(numero)) return "$ 0 COP";
        return `$ ${numero.toLocaleString('es-CO')} COP`;
    }

    function crearFila(nombreVal, categoriaVal, tallaVal, stockVal, precioVal, fechaVal, ubicacionVal, estadoVal) {
        const id = `producto-${contadorId}`;
        const fila = document.createElement('tr');
        fila.id = id;

        fila.innerHTML = `
            <td>${contadorId}</td>
            <td>${nombreVal}</td>
            <td>${categoriaVal}</td>
            <td>${tallaVal}</td>
            <td>${stockVal}</td>
            <td>${precioVal}</td>
            <td>${fechaVal}</td>
            <td>${ubicacionVal}</td>
            <td>${estadoVal}</td>
            <td>
                <button class="btn btn-warning btn-sm me-1 btn-editar" data-id="${id}" title="Editar">
                    <i class="bi bi-pencil"></i>
                </button>
                <button class="btn btn-danger btn-sm btn-eliminar" data-id="${id}" title="Eliminar">
                    <i class="bi bi-trash"></i>
                </button>
            </td>
        `;
        return fila;
    }

    // Evento click para editar o eliminar
    tabla.addEventListener('click', (e) => {
        const editarBtn = e.target.closest('.btn-editar');
        const eliminarBtn = e.target.closest('.btn-eliminar');

        if (editarBtn) {
            const id = editarBtn.dataset.id;
            const fila = document.getElementById(id);
            const celdas = fila.querySelectorAll('td');

            nombre.value = celdas[1].textContent;
            categoria.value = celdas[2].textContent;
            talla.value = celdas[3].textContent;
            stock.value = celdas[4].textContent;
            precio.value = celdas[5].textContent.replace(/\D/g, '');
            fecha.value = celdas[6].textContent;
            ubicacion.value = celdas[7].textContent;
            estado.value = celdas[8].textContent;

            modo.value = 'editar';
            filaEditar.value = id;
            document.getElementById('productoModalLabel').textContent = 'Editar Producto';
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
            if (fila) {
                fila.remove();
                modalEliminar.hide();
                modalEliminado.show();
            }
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