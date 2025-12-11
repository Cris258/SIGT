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
        <a href="index.php" class="co1 d-flex align-items-center text-center text-black text-decoration-none">
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
              <button class="btn btn-success btn-sm fs-5" id="btnAgregarEmpleado" title="Crear">
                <i class="bi bi-person-plus"></i>
              </button>
            </div>
          </div>
          <div class="card-body table-responsive">
            <table class="table table-bordered align-middle text-center">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Empleado</th>
                  <th>Tipo Documento</th>
                  <th>Número Documento</th>
                  <th>EPS</th>
                  <th>Teléfono</th>
                  <th>Correo</th>
                  <th>Rol</th>
                  <th>Tareas Hechas</th>
                  <th>Pendientes</th>
                  <th>Total de Tareas</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody id="tablaEmpleados">
                <tr>
                  <td>1</td>
                  <td>Cristian Valencia</td>
                  <td>CC</td>
                  <td>1023456789</td>
                  <td>Compensar</td>
                  <td>3208478371</td>
                  <td>crismatius46@gmail.com</td>
                  <td>Corte</td>
                  <td>5</td>
                  <td>2</td>
                  <td>7</td>
                  <td>
                    <button class="btn btn-sm btn-warning btn-editar"><i class="bi bi-pencil"></i></button>
                    <button class="btn btn-sm btn-danger btn-eliminar"><i class="bi bi-trash"></i></button>
                  </td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>Juan Cruz</td>
                  <td>CC</td>
                  <td>1145678910</td>
                  <td>Capital Salud</td>
                  <td>3129876543</td>
                  <td>juan.crz@gmail.com</td>
                  <td>Domiciliario</td>
                  <td>8</td>
                  <td>1</td>
                  <td>9</td>
                  <td>
                    <button class="btn btn-sm btn-warning btn-editar"><i class="bi bi-pencil"></i></button>
                    <button class="btn btn-sm btn-danger btn-eliminar"><i class="bi bi-trash"></i></button>
                  </td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>Valeria Meza</td>
                  <td>CC</td>
                  <td>1151544897</td>
                  <td>Compensar</td>
                  <td>3046005887 </td>
                  <td>linaphernandez21@gmail.com</td>
                  <td>Ventas</td>
                  <td>8</td>
                  <td>1</td>
                  <td>9</td>
                  <td>
                    <button class="btn btn-sm btn-warning btn-editar"><i class="bi bi-pencil"></i></button>
                    <button class="btn btn-sm btn-danger btn-eliminar"><i class="bi bi-trash"></i></button>
                  </td>
                </tr>
              </tbody>
            </table>
            <div class="text-center mt-3">
              <a href="Admin.php" class="btn btn-secondary login-btn">Volver</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>

  <!-- MODAL: AGREGAR EMPLEADO -->
  <div class="modal fade" id="modalEmpleado" tabindex="-1" aria-labelledby="modalEmpleadoLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <form id="formEmpleado">
          <div class="modal-header">
            <h5 class="modal-title">Nuevo Empleado</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
          </div>
          <div class="modal-body">
            <div class="mb-3">
              <label for="nombre" class="form-label">Empleado</label>
              <input type="text" class="form-control" id="nombre" required />
            </div>
            <div class="mb-3">
              <label for="tipoDoc" class="form-label">Tipo Documento</label>
              <select class="form-select" id="tipoDoc" required>
                <option value="" disabled selected>Seleccione</option>
                <option value="CC">Cédula</option>
                <option value="TI">Tarjeta Identidad</option>
                <option value="CE">Cédula Extranjería</option>
                <option value="Pasaporte">Pasaporte</option>
              </select>
            </div>
            <div class="mb-3">
              <label for="numDoc" class="form-label">Número Documento</label>
              <input type="number" class="form-control" id="numDoc" required />
            </div>
            <div class="mb-3">
              <label for="eps" class="form-label">EPS</label>
              <input type="text" class="form-control" id="eps" required />
            </div>
            <div class="mb-3">
              <label for="telefono" class="form-label">Teléfono</label>
              <input type="text" class="form-control" id="telefono" required />
            </div>
            <div class="mb-3">
              <label for="correo" class="form-label">Correo</label>
              <input type="email" class="form-control" id="correo" required />
            </div>
            <div class="mb-3">
              <label for="rolEmpleado" class="form-label">Rol</label>
              <select class="form-select" id="rolEmpleado" required>
                <option value="" disabled selected>Seleccione un rol</option>
                <option value="Corte">Corte</option>
                <option value="Confección">Confección</option>
                <option value="Ventas">Ventas</option>
                <option value="Recepción de Pedidos">Recepción de Pedidos</option>
                <option value="Operaria de Fileteadora">Operaria de Fileteadora</option>
                <option value="Operaria de Máquina Collarín">Operaria de Máquina Collarín</option>
                <option value="Domiciliario">Domiciliario</option>
              </select>
            </div>
          </div>
          <div class="modal-footer justify-content-center">
            <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Cancelar</button>
            <button type="submit" class="btn btn-success" id="btnGuardar" disabled>Guardar</button>
          </div>
        </form>
      </div>
    </div>
  </div>

  <!-- MODAL: CONFIRMACIÓN -->
  <div class="modal fade" id="modalExito" tabindex="-1" aria-labelledby="modalExitoLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content border-success">
        <div class="modal-header bg-success text-white">
          <h5 class="modal-title" id="modalExitoLabel">¡Empleado agregado!</h5>
          <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
        </div>
        <div class="modal-body text-center">
          El empleado se ha registrado correctamente.
        </div>
        <div class="modal-footer justify-content-center">
          <button type="button" class="btn btn-success" data-bs-dismiss="modal">Aceptar</button>
        </div>
      </div>
    </div>
  </div>
  <!-- MODAL DE CONFIRMACIÓN PARA ELIMINAR -->
  <div class="modal fade" id="modalEliminar" tabindex="-1" aria-labelledby="modalEliminarLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content border-danger">
        <div class="modal-header bg-danger text-white">
          <h5 class="modal-title" id="modalEliminarLabel">¿Eliminar empleado?</h5>
          <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
        </div>
        <div class="modal-body text-center">
          ¿Estás seguro que deseas eliminar este empleado? Esta acción no se puede deshacer.
        </div>
        <div class="modal-footer justify-content-center">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
          <button type="button" class="btn btn-danger" id="confirmarEliminar">Sí, eliminar</button>
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
  integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>
<script src="js/5. appadministrarEmleados.js"></script>
</body>

</html>