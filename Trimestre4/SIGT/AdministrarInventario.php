<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css">
    <link rel="stylesheet" href="css/5. styleAdminEmpleados.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link
        href="https://fonts.googleapis.com/css2?family=Merriweather:ital,opsz,wght@0,18..144,300..900;1,18..144,300..900&family=Poiret+One&family=Prata&family=Savate:ital,wght@0,200..900;1,200..900&display=swap"
        rel="stylesheet">
    <title>Administrar Emplleados</title>
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
    <main class="flex-grow-1 p-4 bg-light">
        <h1 class="py-3 text-center merriweather-font">Administrar Empleados</h1>
        <div class="row g-4 mb-4">
            <div class="col-12">
                <div class="card shadow-sm">
                    <div class="card-header d-flex justify-content-between align-items-center">
                        <span class="fw-bold fs-5">Empleados</span>
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
                                    <th>Categoría</th>
                                    <th>Talla</th>
                                    <th>Stock</th>
                                    <th>Precio</th>
                                    <th>Fecha de Ingreso</th>
                                    <th>Ubicación en Almacén</th>
                                    <th>Estado</th>
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
                                    <td>2025-07-01</td>
                                    <td>Estante A1</td>
                                    <td>Disponible</td>
                                    <td>
                                        <button class="btn btn-sm btn-warning btn-editar" data-id="producto-1">
                                            <i class="bi bi-pencil"></i>
                                        </button>
                                        <button class="btn btn-sm btn-danger btn-eliminar" data-id="producto-1">
                                            <i class="bi bi-trash"></i>
                                        </button>
                                    </td>
                                </tr>
                                <tr id="producto-2">
                                    <td>2</td>
                                    <td>Pijama Gamer</td>
                                    <td>Hombre</td>
                                    <td>L</td>
                                    <td>8</td>
                                    <td>$ 48.500 COP</td>
                                    <td>2025-06-28</td>
                                    <td>Estante B2</td>
                                    <td>Baja Existencia</td>
                                    <td>
                                        <button class="btn btn-sm btn-warning btn-editar" data-id="producto-2">
                                            <i class="bi bi-pencil"></i>
                                        </button>
                                        <button class="btn btn-sm btn-danger btn-eliminar" data-id="producto-2">
                                            <i class="bi bi-trash"></i>
                                        </button>
                                    </td>
                                </tr>
                                <tr id="producto-3">
                                    <td>3</td>
                                    <td>Pijama Unicornios</td>
                                    <td>Niña</td>
                                    <td>6</td>
                                    <td>15</td>
                                    <td>$ 39.900 COP</td>
                                    <td>2025-07-05</td>
                                    <td>Estante C1</td>
                                    <td>Disponible</td>
                                    <td>
                                        <button class="btn btn-sm btn-warning btn-editar" data-id="producto-3">
                                            <i class="bi bi-pencil"></i>
                                        </button>
                                        <button class="btn btn-sm btn-danger btn-eliminar" data-id="producto-3">
                                            <i class="bi bi-trash"></i>
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <div class="text-center mt-3">
                            <a href="AdminInventario.php" class="btn btn-secondary login-btn">Volver</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main> 
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
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
                                <option value="8">8</option>
                                <option value="10">10</option>
                                <option value="12">12</option>
                                <option value="14">14</option>
                                <option value="16">16</option>
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
                        <div class="mb-3">
                            <label for="fechaProducto" class="form-label">Fecha de Ingreso</label>
                            <input type="date" class="form-control" id="fechaProducto" required>
                        </div>
                        <div class="mb-3">
                            <label for="ubicacionProducto" class="form-label">Ubicación en Almacén</label>
                            <select class="form-select" id="ubicacionProducto" required>
                                <option value="" disabled selected>Seleccione la ubicación del producto</option>
                                <option value="Estante A1">Estante A1</option>
                                <option value="Estante A2">Estante A2</option>
                                <option value="Estante A3">Estante A3</option>
                                <option value="Estante B1">Estante B1</option>
                                <option value="Estante B2">Estante B2</option>
                                <option value="Estante B3">Estante B3</option>
                                <option value="Estante C1">Estante C1</option>
                                <option value="Estante C2">Estante C2</option>
                                <option value="Bodega Principal">Bodega Principal</option>
                                <option value="Almacén Secundario">Almacén Secundario</option>
                                <option value="En Tránsito">En Tránsito</option>
                            </select>
                        </div>
                        <div class="mb-3">
                            <label for="estadoProducto" class="form-label">Estado</label>
                            <select class="form-select" id="estadoProducto" required>
                                <option value="" disabled selected>Seleccione el estado del prodcto</option>
                                <option value="Disponible">Disponible</option>
                                <option value="Baja Existencia">Baja Existencia</option>
                                <option value="Agotado">Agotado</option>
                                <option value="Dañado">Dañado</option>
                                <option value="Reservado">Reservado</option>
                                <option value="En Reposición">En Reposición</option>
                            </select>
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
                    El producto ha sido eliminado exitosamente.
                </div>
                <div class="modal-footer justify-content-center">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Aceptar</button>
                </div>
            </div>
        </div>
    </div>
</body>
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
<script src="js/7. administrarInventario..js"></script>
</body>

</html>