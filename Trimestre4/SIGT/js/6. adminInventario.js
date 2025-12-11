document.addEventListener('DOMContentLoaded', () => {
    const tabla = document.getElementById('tablaInventario');
    const modal = new bootstrap.Modal(document.getElementById('productoModal'));
    const form = document.getElementById('formProducto');

    const nombre = document.getElementById('nombreProducto');
    const categoria = document.getElementById('categoriaProducto');
    const talla = document.getElementById('tallaProducto');
    const stock = document.getElementById('stockProducto');
    const precio = document.getElementById('precioProducto');
    const modo = document.getElementById('modo');
    const filaEditar = document.getElementById('filaEditar');
    const modalEliminar = new bootstrap.Modal(document.getElementById('modalEliminar'));
    const modalEliminado = new bootstrap.Modal(document.getElementById('modalEliminado'));
    let idAEliminar = null;

    document.getElementById('btnAgregarProducto').addEventListener('click', () => {
        form.reset();
        modo.value = 'crear';
        filaEditar.value = '';
        document.getElementById('productoModalLabel').textContent = 'Agregar Producto';
        modal.show();
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        if (modo.value === 'crear') {
            const fila = crearFila(nombre.value, categoria.value, talla.value, stock.value, precio.value);
            tabla.appendChild(fila);
            actualizarTopProductos();
        } else {
            const fila = document.getElementById(filaEditar.value);
            const celdas = fila.querySelectorAll('td');
            celdas[1].textContent = nombre.value;
            celdas[2].textContent = categoria.value;
            celdas[3].textContent = talla.value;
            celdas[4].textContent = stock.value;
            celdas[5].textContent = formatearPrecio(precio.value);
            actualizarTopProductos();
        }

        modal.hide();
    });

    let contadorId = tabla.querySelectorAll('tr').length + 1;

    function formatearPrecio(valor) {
        const numero = parseFloat(valor);
        if (isNaN(numero)) return "$ 0 COP";
        return `$ ${numero.toLocaleString('es-CO')} COP`;
    }

    function crearFila(nombreVal, categoriaVal, tallaVal, stockVal, precioVal) {
        const id = `producto-${contadorId}`;
        const fila = document.createElement('tr');
        fila.id = id;

        fila.innerHTML = `
            <td>${contadorId}</td>
            <td>${nombreVal}</td>
            <td>${categoriaVal}</td>
            <td>${tallaVal}</td>
            <td>${stockVal}</td>
            <td>${formatearPrecio(precioVal)}</td>
            <td>
                <button class="btn btn-warning btn-sm me-1 btn-editar" data-id="${id}" title="Editar">
                    <i class="bi bi-pencil"></i>
                </button>
                <button class="btn btn-danger btn-sm btn-eliminar" data-id="${id}" title="Eliminar">
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
            categoria.value = celdas[2].textContent;
            talla.value = celdas[3].textContent;
            stock.value = celdas[4].textContent;
            precio.value = celdas[5].textContent.replace(/[^\d]/g, '');

            modo.value = 'editar';
            filaEditar.value = id;
            document.getElementById('productoModalLabel').textContent = 'Editar Producto';
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
                modalEliminar.hide();
                modalEliminado.show();
                actualizarTopProductos();
            }
            idAEliminar = null;
        }
    });

    actualizarTopProductos();
});

let graficaTorta = null;

function actualizarTopProductos() {
    const lista = document.getElementById('listaTopProductos');
    const filas = document.querySelectorAll('#tablaInventario tr');
    const productos = [];

    filas.forEach(fila => {
        const celdas = fila.querySelectorAll('td');
        if (celdas.length < 6) return;

        const nombre = celdas[1].textContent;
        const stock = parseInt(celdas[4].textContent);

        productos.push({ nombre, stock });
    });

    const top = productos.sort((a, b) => b.stock - a.stock).slice(0, 5);

    lista.innerHTML = '';
    top.forEach(prod => {
        const badgeClass = prod.stock >= 50 ? 'bg-primary' :
            prod.stock >= 20 ? 'bg-success' :
                prod.stock >= 10 ? 'bg-warning' : 'bg-danger';

        lista.innerHTML += `
            <li class="list-group-item d-flex justify-content-between align-items-center">
                ${prod.nombre}
                <span class="badge ${badgeClass} badge-stock">${prod.stock}</span>
            </li>
        `;
    });

    const labels = top.map(p => p.nombre);
    const data = top.map(p => p.stock);
    const colores = ['#D8B4E2', '#7AE7C7', '#D7F75B', '#B80C09', '#8AA29E'];
    const ctx = document.getElementById('graficoInventario').getContext('2d');

    if (graficaTorta) {
        graficaTorta.destroy();
    }

    graficaTorta = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: labels,
            datasets: [{
                label: 'Stock',
                data: data,
                backgroundColor: colores.slice(0, data.length),
                borderColor: '#fff',
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'bottom'
                },
                tooltip: {
                    callbacks: {
                        label: function (context) {
                            return `${context.label}: ${context.parsed} unidades`;
                        }
                    }
                }
            }
        }
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

async function generarReportePDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Título
    doc.setFontSize(18);
    doc.text("Reporte de Inventario", 105, 20, { align: 'center' });

    // Fecha
    const fecha = new Date();
    const fechaStr = fecha.toLocaleDateString('es-CO', {
        day: '2-digit', month: 'long', year: 'numeric'
    });
    doc.setFontSize(12);
    doc.text(`Fecha: ${fechaStr}`, 14, 30);

    // Obtener datos de la tabla
    const filas = document.querySelectorAll("#tablaInventario tr");
    const data = [];

    filas.forEach(fila => {
        const celdas = fila.querySelectorAll("td");
        if (celdas.length === 0) return;

        const filaData = [
            celdas[0].textContent, // #
            celdas[1].textContent, // Nombre
            celdas[2].textContent, // Categoría
            celdas[3].textContent, // Talla
            celdas[4].textContent, // Stock
            celdas[5].textContent  // Precio
        ];
        data.push(filaData);
    });

    // Tabla con autoTable
    doc.autoTable({
        head: [['#', 'Producto', 'Categoría', 'Talla', 'Stock', 'Precio']],
        body: data,
        startY: 40,
        styles: { fontSize: 10 },
        headStyles: { fillColor: [41, 128, 185] }
    });

    // Pie de página o firma
    doc.setFontSize(11);

    const paginaAlto = doc.internal.pageSize.height;
    const firmaY = paginaAlto - 40; // posición cerca del pie de página
    const textoY = paginaAlto - 25;

    doc.text("Firma Responsable ______________________", 105, firmaY, { align: 'center' });
    doc.text("Este documento fue generado automáticamente desde el sistema.", 105, textoY, { align: 'center' });


    // Descargar PDF
    doc.save("reporte_inventario.pdf");
}

document.getElementById('btnDescargarPDF').addEventListener('click', () => {
    const doc = document.getElementById('docAdmin').value.trim();
    const clave = document.getElementById('claveAdmin').value.trim();
    const error = document.getElementById('mensajeError');

    if (doc === '' || clave === '') {
        error.classList.remove('d-none');
        return;
    }

    error.classList.add('d-none');

    // Cierra el modal
    const modal = bootstrap.Modal.getInstance(document.getElementById('modalReporteStock'));
    modal.hide();

    // Genera el PDF
    generarReportePDF();
});
