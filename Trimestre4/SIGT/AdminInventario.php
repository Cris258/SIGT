<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css">
    <link rel="stylesheet" href="css/3. styleAdmin.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link
        href="https://fonts.googleapis.com/css2?family=Merriweather:ital,opsz,wght@0,18..144,300..900;1,18..144,300..900&family=Poiret+One&family=Prata&family=Savate:ital,wght@0,200..900;1,200..900&display=swap"
        rel="stylesheet">
    <title>Administrador</title>
</head>
<header class="py-3 shadow-sm merriweather-font">
    <div class="container">
        <div class="row g-0 justify-content-between align-items-center">
            <!-- Logo + Título -->
            <div class="col-auto d-flex align-items-center ps-2">
                <img src="img/Logo Vibra Positiva.jpg" alt="Logo" class="minilogo me-2">
                <h1 class="titulo fw-bold text-uppercase mb-0 fs-7 ms-2">Vibra Positiva Pijamas</h1>
            </div>
            <nav class="menu col-auto d-flex flex-column flex-md-row align-items-center gap-1 gap-md-2">
                <a href="index.php"
                    class="co1 d-flex align-items-center text-center text-black text-decoration-none">
                    <div class="login d-flex align-items-center gap-1">
                        <span>Cerrar Sesión</span>
                        <div class="icono">
                            <i class="bi bi-box-arrow-left"></i>
                        </div>
                    </div>
                </a>
            </nav>
        </div>
    </div>
</header>

<body>
    <!-- BOTÓN HAMBURGUESA SOLO EN MÓVIL -->
    <nav class="navbar navbar-light d-md-none">
        <div class="container-fluid">
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#sidebarMenu">
                <span class="navbar-toggler-icon"></span>
            </button>
        </div>
    </nav>
    <!-- CONTENEDOR PRINCIPAL -->
    <div class="d-flex flex-column flex-md-row">
        <!-- SIDEBAR -->
        <div class="sidebar collapse d-md-block p-3" id="sidebarMenu">
            <div class="text-center text-white mb-4">
                <i class="bi bi-person-circle" style="font-size: 3rem;"></i>
                <h5 class="fw-bold mt-2">Nombre Administrador</h5>
            </div>

            <ul class="nav flex-column text-center">
                <li class="nav-item">

                    <a href="#" class="nav-link custom-link" data-bs-toggle="modal"
                        data-bs-target="#modalActualizarDatos">Actualizar Datos</a>
                </li>

                <a href="#" class="nav-link custom-link" data-bs-toggle="modal"
                    data-bs-target="#modalCambiarContraseña">
                    Cambiar Contraseña
                </a>

                <hr class="bg-light">

                <li class="nav-item">
                    <a href="Admin.php" class="nav-link custom-link">Empleados</a>
                </li>
                <li class="nav-item">
                    <a href="AdminInventario.php" class="nav-link custom-link active">Inventario</a>
                </li>
                <li class="nav-item">
                    <a href="AdminClientes.php" class="nav-link custom-link">Clientes</a>
                </li>

                <hr class="bg-light">

                <li class="nav-item">
                    <a href="AdministrarInventario.php" class="nav-link custom-link">Administrar Inventario</a>
                </li>
                <li class="nav-item">
                    <a href="#" class="nav-link custom-link" data-bs-toggle="modal" data-bs-target="#modalReporteStock">
                        Generar Reporte del Stock
                    </a>
                </li>
            </ul>
        </div>
        <!-- MODAL: ACTUALIZAR DATOS -->
        <div class="modal fade" id="modalActualizarDatos" tabindex="-1" aria-labelledby="modalActualizarDatosLabel"
            aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content rounded-3 shadow">
                    <div class="modal-header text-black">
                        <h5 class="modal-title" id="modalActualizarDatosLabel">Actualizar Datos</h5>
                        <button type="button" class="btn-close btn-close-black" data-bs-dismiss="modal"
                            aria-label="Cerrar"></button>
                    </div>

                    <form id="formActualizarDatos">
                        <div class="modal-body bg-light">
                            <div class="container">
                                <div class="row g-3">
                                    <div class="col-md-6">
                                        <label class="form-label">Primer Nombre</label>
                                        <input type="text" class="form-control" name="primerNombre">
                                    </div>
                                    <div class="col-md-6">
                                        <label class="form-label">Edad</label>
                                        <input type="number" class="form-control" name="edad">
                                    </div>
                                    <div class="col-md-6">
                                        <label class="form-label">Segundo Nombre</label>
                                        <input type="text" class="form-control" name="segundoNombre">
                                    </div>
                                    <div class="col-md-6">
                                        <label class="form-label">Correo Electrónico</label>
                                        <input type="email" class="form-control" name="correo">
                                    </div>
                                    <div class="col-md-6">
                                        <label class="form-label">Primer Apellido</label>
                                        <input type="text" class="form-control" name="primerApellido">
                                    </div>
                                    <div class="col-md-6">
                                        <label class="form-label">Número de Teléfono</label>
                                        <input type="tel" class="form-control" name="telefono">
                                    </div>
                                    <div class="col-md-6">
                                        <label class="form-label">Segundo Apellido</label>
                                        <input type="text" class="form-control" name="segundoApellido">
                                    </div>
                                    <div class="col-md-6">
                                        <label class="form-label">Dirección</label>
                                        <input type="text" class="form-control" name="direccion">
                                    </div>
                                </div>

                                <div class="text-center mt-4">
                                    <button type="submit" class="btn custom-btn px-4">Finalizar</button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        <!-- Modal: Cambiar Contraseña -->
        <div class="modal fade" id="modalCambiarContraseña" tabindex="-1" aria-labelledby="modalCambiarContraseñaLabel"
            aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content shadow-lg">
                    <div class="modal-header">
                        <h5 class="modal-title" id="modalCambiarContraseñaLabel">Cambiar Contraseña</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
                    </div>
                    <div class="modal-body text-center px-4 py-4">
                        <form id="formCambiarContraseña">
                            <div class="mb-3 text-start">
                                <label class="form-label">Contraseña Antigua</label>
                                <div class="input-group">
                                    <input type="password" class="form-control" id="passwordAntigua" required>
                                    <button type="button" class="btn btn-outline-secondary toggle-password"
                                        data-input="passwordAntigua">
                                        <i class="bi bi-eye"></i>
                                    </button>
                                </div>
                            </div>
                            <div class="mb-3 text-start">
                                <label class="form-label">Contraseña Nueva</label>
                                <div class="input-group">
                                    <input type="password" class="form-control" id="passwordNueva" required>
                                    <button type="button" class="btn btn-outline-secondary toggle-password"
                                        data-input="passwordNueva">
                                        <i class="bi bi-eye"></i>
                                    </button>
                                </div>
                            </div>
                            <div class="mb-3 text-start">
                                <label class="form-label">Repetir Contraseña</label>
                                <div class="input-group">
                                    <input type="password" class="form-control" id="passwordRepetir" required>
                                    <button type="button" class="btn btn-outline-secondary toggle-password"
                                        data-input="passwordRepetir">
                                        <i class="bi bi-eye"></i>
                                    </button>
                                </div>
                                <small id="errorCoincidencia" class="text-danger d-none">Las contraseñas no
                                    coinciden.</small>
                            </div>
                            <button type="submit" class="btn custom-btn text-black">Finalizar</button>
                        </form>
                        <a href="#" id="enlaceRecuperar" class="text-decoration-underline text-primary d-block mt-3">
                            ¿Olvidó su contraseña?
                        </a>
                    </div>
                </div>
            </div>
        </div>
        <!-- Modal: Contraseña cambiada con éxito -->
        <div class="modal fade" id="modalExito" tabindex="-1" aria-labelledby="modalExitoLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header text-black">
                        <h5 class="modal-title w-100 text-center" id="modalExitoLabel">¡Éxito!</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body text-center">
                        Tu contraseña ha sido cambiada correctamente. <br> Por su seguridad inicie sesión nuevamente.
                    </div>
                    <div class="modal-footer d-flex justify-content-center">
                        <a href="1. index.html" class="btn custom-btn">Aceptar</a>
                    </div>
                </div>
            </div>
        </div>
        <!-- Modal: Recuperar Contraseña -->
        <div class="modal fade" id="modalRecuperarCorreo" tabindex="-1" aria-labelledby="modalRecuperarCorreoLabel"
            aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content shadow-lg">
                    <div class="modal-header">
                        <h5 class="modal-title" id="modalRecuperarCorreoLabel">Recuperar Contraseña</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
                    </div>
                    <div class="modal-body text-center px-4 py-4">
                        <form id="formRecuperarCorreo" class="text-start">
                            <div class="mb-3">
                                <label for="emailRecuperar" class="form-label">Correo electrónico registrado</label>
                                <input type="email" id="emailRecuperar" class="form-control" required
                                    placeholder="ejemplo@correo.com">
                            </div>
                            <div class="d-grid">
                                <button type="submit" class="btn custom-btn text-black">Enviar clave temporal</button>
                            </div>
                        </form>
                        <div id="mensajeErrorCorreo" class="mt-3 text-danger d-none text-start">Correo inválido o no
                            registrado.
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- Modal: Clave Temporal Generada -->
        <div class="modal fade" id="modalClaveTemporal" tabindex="-1" aria-labelledby="modalClaveTemporalLabel"
            aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content shadow-lg">
                    <div class="modal-header">
                        <h5 class="modal-title" id="modalClaveTemporalLabel">Clave Temporal</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
                    </div>
                    <div class="modal-body text-center px-4 py-4">
                        <p>Su nueva clave temporal es:</p>
                        <div class="d-flex justify-content-center align-items-center gap-3 mb-3">
                            <span id="claveTemporalOculta" class="fs-4">********</span>
                            <span id="claveTemporalReal" class="fs-4 d-none"></span>
                            <button type="button" id="btnToggleClave" class="btn btn-sm btn-outline-dark">
                                <i id="iconoToggleClave" class="bi bi-eye"></i>
                            </button>
                        </div>
                        <p class="text-muted">Por favor cámbiala cuanto antes.</p>
                    </div>
                </div>
            </div>
        </div>
        <!-- MAIN -->
        <main class="flex-grow-1 p-4 bg-light">
            <!-- FILA 1: TABLA DE INVENTARIO -->
            <div class="row g-4 mb-4">
                <div class="col-12">
                    <div class="card shadow-sm">
                        <div class="card-header d-flex justify-content-between align-items-center">
                            <span class="fw-bold">Inventario de Pijamas</span>
                            <div class="btn-group">
                                <button class="btn btn-success btn-sm" id="btnAgregarProducto" title="Crear">
                                    <i class="bi bi-plus-circle"></i>
                                </button>
                            </div>
                        </div>
                        <div class="card-body table-responsive">
                            <table class="table table-bordered align-middle text-center">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Nombre Producto</th>
                                        <th>Categoria</th>
                                        <th>Talla</th>
                                        <th>Stock</th>
                                        <th>Precio</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody id="tablaInventario">
                                    <tr id="producto-1">
                                        <td>1</td>
                                        <td>Pijama de Estrellas</td>
                                        <td>Mujer</td>
                                        <td>S</td>
                                        <td>12</td>
                                        <td>$ 45.000 COP</td>
                                        <td>
                                            <button class="btn btn-sm btn-warning btn-editar" data-id="producto-1"><i
                                                    class="bi bi-pencil"></i></button>
                                            <button class="btn btn-sm btn-danger btn-eliminar" data-id="producto-1"><i
                                                    class="bi bi-trash"></i></button>
                                        </td>
                                    </tr>
                                    <tr id="producto-2">
                                        <td>2</td>
                                        <td>Pijama Gamer</td>
                                        <td>Hombre</td>
                                        <td>L</td>
                                        <td>8</td>
                                        <td>$ 48.500 COP</td>
                                        <td>
                                            <button class="btn btn-sm btn-warning btn-editar" data-id="producto-2"><i
                                                    class="bi bi-pencil"></i></button>
                                            <button class="btn btn-sm btn-danger btn-eliminar" data-id="producto-2"><i
                                                    class="bi bi-trash"></i></button>
                                        </td>
                                    </tr>
                                    <tr id="producto-3">
                                        <td>3</td>
                                        <td>Pijama Unicornios</td>
                                        <td>Niña</td>
                                        <td>6</td>
                                        <td>15</td>
                                        <td>$ 39.900 COP</td>
                                        <td>
                                            <button class="btn btn-sm btn-warning btn-editar" data-id="producto-3"><i
                                                    class="bi bi-pencil"></i></button>
                                            <button class="btn btn-sm btn-danger btn-eliminar" data-id="producto-3"><i
                                                    class="bi bi-trash"></i></button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <!-- FILA 2: ESTADÍSTICAS, TOP Y CALENDARIO -->
            <div class="row g-4 align-items-stretch text-center">
                <!-- Estadísticas -->
                <div class="col-12 col-md-4 d-flex">
                    <div class="card shadow-sm w-100 d-flex flex-column">
                        <div class="card-header fw-bold bg-info text-white">Estadísticas</div>
                        <div class="card-body d-flex justify-content-center align-items-center">
                            <canvas id="graficoInventario" style="max-height: 250px; max-width: 250px;"></canvas>
                        </div>
                    </div>
                </div>

                <!-- Top 5 Productos que más hay -->
                <div class="col-12 col-md-4 d-flex">
                    <div class="card shadow-sm w-100 d-flex flex-column">
                        <div class="card-header fw-bold bg-info text-white">Top 5 Productos en Stock</div>
                        <div class="card-body">
                            <ol class="list-group list-group-numbered" id="listaTopProductos">
                                <!-- Se llena con JS -->
                            </ol>
                        </div>
                    </div>
                </div>

                <!-- Calendario -->
                <div class="col-12 col-md-4 d-flex">
                    <div class="card shadow-sm w-100 d-flex flex-column">
                        <div class="card-header fw-bold bg-info text-white">Calendario</div>
                        <div class="card-body p-0 flex-grow-1">
                            <iframe
                                src="https://calendar.google.com/calendar/embed?src=es.co%23holiday%40group.v.calendar.google.com&ctz=America%2FBogota"
                                style="border: 0; width: 100%; height: 100%;" frameborder="0" scrolling="no"></iframe>
                        </div>
                    </div>
                </div>
            </div>

        </main>
    </div>
    <!-- MODAL PARA CREAR/EDITAR INVENTARIO -->
    <div class="modal fade" id="productoModal" tabindex="-1" aria-labelledby="productoModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <form id="formProducto">
                    <div class="modal-header text-black">
                        <h5 class="modal-title" id="productoModalLabel">Agregar Prodctos</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
                    </div>
                    <div class="modal-body">
                        <input type="hidden" id="modo" value="crear">
                        <input type="hidden" id="filaEditar" value="">
                        <div class="mb-3">
                            <label for="nombreProducto" class="form-label">Nombre Producto</label>
                            <input type="text" class="form-control" id="nombreProducto" required>
                        </div>
                        <div class="mb-3">
                            <label for="categoriaProducto" class="form-label">Categoria</label>
                            <select class="form-select" id="categoriaProducto" required>
                                <option value="" disabled selected>Seleccione una categoria</option>
                                <option value="Hombre">Hombre </option>
                                <option value="Mujer">Mujer</option>
                                <option value="Niño">Niño </option>
                                <option value="Bebé">Bebé</option>
                            </select>
                        </div>
                        <div class="mb-3">
                            <label for="tallaProducto" class="form-label">Talla</label>
                            <select class="form-select" id="tallaProducto" required>
                                <option value="" disabled selected>Seleccione una talla</option>
                                <option value="Talla 2">2</option>
                                <option value="Talla 3">3</option>
                                <option value="Talla 4">4</option>
                                <option value="Talla 5">5</option>
                                <option value="Talla 6">6</option>
                                <option value="Talla 7">7</option>
                                <option value="Talla 8">8</option>
                                <option value="Talla 10">10</option>
                                <option value="Talla 12">12</option>
                                <option value="Talla 14">14</option>
                                <option value="Talla 16">16</option>
                                <option value="XS">XS</option>
                                <option value="S">S</option>
                                <option value="M">M</option>
                                <option value="L">L</option>
                                <option value="XL">XL</option>
                                <option value="XXL">XXL</option>
                                <option value="Unica">Unica</option>
                            </select>
                        </div>
                        <div class="mb-3">
                            <label for="stockProducto" class="form-label">Stock</label>
                            <input type="number" class="form-control" id="stockProducto" required>
                        </div>
                        <div class="mb-3">
                            <label for="precioProducto" class="form-label">Precio</label>
                            <input type="text" class="form-control" id="precioProducto" required>
                        </div>
                    </div>
                    <div class="modal-footer d-flex justify-content-center">
                        <button type="button" class="btn btn-danger text-white"
                            data-bs-dismiss="modal">Cancelar</button>
                        <button type="submit" class="btn custom-btn text-black">Guardar</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    <!--Modal Eiimminar Confirmada-->
    <div class="modal fade" id="modalEliminar" tabindex="-1" aria-labelledby="modalEliminarLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header bg-danger text-white">
                    <h5 class="modal-title w-100 text-center" id="modalEliminarLabel">¿Estás seguro?</h5>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"
                        aria-label="Cerrar"></button>
                </div>
                <div class="modal-body text-center">
                    Esta acción no se puede deshacer<br>¿Deseas eliminar este producto?
                </div>
                <div class="modal-footer justify-content-center">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                    <button type="button" class="btn btn-danger" id="confirmarEliminar">Eliminar</button>
                </div>
            </div>
        </div>
    </div>
    <!-- Modal Eliminación Exitosa -->
    <div class="modal fade" id="modalEliminado" tabindex="-1" aria-labelledby="modalEliminadoLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content border-success">
                <div class="modal-header text-blac">
                    <h5 class="modal-title" id="modalEliminadoLabel">¡Eliminado!</h5>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"
                        aria-label="Cerrar"></button>
                </div>
                <div class="modal-body text-center">
                    El produucto ha sido eliminado exitosamente.
                </div>
                <div class="modal-footer justify-content-center">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Aceptar</button>
                </div>
            </div>
        </div>
    </div>
    <!-- MODAL GENERAR REPORTE -->
    <div class="modal fade" id="modalReporteStock" tabindex="-1" aria-labelledby="modalReporteStockLabel"
        aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content shadow">
                <div class="modal-header text-black">
                    <h5 class="modal-title" id="modalReporteStockLabel">Generar Reporte de Stock</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
                </div>
                <div class="modal-body">
                    <form id="formVerificarAdministrador">
                        <div class="mb-3">
                            <label for="docAdmin" class="form-label">Número de documento</label>
                            <input type="number" class="form-control" id="docAdmin" required>
                        </div>
                        <div class="mb-3">
                            <label for="claveAdmin" class="form-label">Clave de administrador</label>
                            <input type="password" class="form-control" id="claveAdmin" required>
                        </div>
                    </form>
                    <div id="mensajeError" class="text-danger d-none">⚠️ Ambos campos son obligatorios.</div>
                </div>
                <div class="modal-footer d-flex justify-content-center">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                    <button type="button" class="btn custom-btn text-black" id="btnDescargarPDF">Descargar PDF</button>
                </div>
            </div>
        </div>
    </div>
    <!-- FOOTER -->
    <footer class="text-black pt-2 pb-3">
        <div class="container text-center">
            <div class="text-center mt-4 poiret-one-font fw-bold">
                <small>© 2025 Tienda de Pijamas Vibra Positiva - Todos los derechos reservados</small>
            </div>
        </div>
    </footer>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p"
        crossorigin="anonymous"></script>
    <script src="js/6. adminInventario.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.5.28/jspdf.plugin.autotable.min.js"></script>

</body>

</html>