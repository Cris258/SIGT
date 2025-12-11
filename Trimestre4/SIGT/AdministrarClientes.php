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
  <title>Administrar Clientes</title>
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
    <h1 class="py-3 text-center merriweather-font">Administrar Clientes</h1>
    <div class="row g-4 mb-4">
      <div class="col-12">
        <div class="card shadow-sm">
          <div class="card-header d-flex justify-content-between align-items-center">
            <span class="fw-bold fs-5">Clientes</span>
            <div class="btn-group">
              <button class="btn btn-success btn-sm fs-5" id="btnAgregarCliente" title="Crear">
                <i class="bi bi-person-plus"></i>
              </button>
            </div>
          </div>
          <div class="card-body table-responsive">
            <table class="table table-bordered align-middle text-center">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Correo</th>
                  <th>Telefono</th>
                  <th>Dirección</th>
                  <th>Departamento</th>
                  <th>Productos Adquiridos</th>
                  <th>Fecha de registro</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody id="tablaClientes">
                <tr id="cliente-1">
                  <td>1</td>
                  <td>María Gómez</td>
                  <td>maria@gmail.com</td>
                  <td>3124567890</td>
                  <td>Calle 123 #45-67</td>
                  <td>Bogota</td>
                  <td>12</td>
                  <td>2024-11-20</td>
                  <td>Activo</td>
                  <td>
                    <button class="btn btn-sm btn-warning btn-editar" data-id="cliente-1"><i class="bi bi-pencil"></i></button>
                    <button class="btn btn-sm btn-danger btn-eliminar" data-id="cliente-"><i class="bi bi-trash"></i></button>
                  </td>
                </tr>
                <tr id="cliente-2">
                  <td>2</td>
                  <td>Nicolas Pérez</td>
                  <td>nicolas.pz@hotmail.com</td>
                  <td>3109876543</td>
                  <td>Carrera 9 #78-45</td>
                  <td>Cali</td>
                  <td>4</td>
                  <td>2025-01-15</td>
                  <td>Activo</td>
                  <td>
                    <button class="btn btn-sm btn-warning btn-editar" data-id="cliente-2"><i class="bi bi-pencil"></i></button>
                    <button class="btn btn-sm btn-danger btn-eliminar" data-id="cliente-2"><i class="bi bi-trash"></i></button>
                  </td>
                </tr>
                <tr id="cliente-3">
                  <td>3</td>
                  <td>Esteban Andrade</td>
                  <td>esteban.andra@gmail.com</td>
                  <td>3001234567</td>
                  <td>Calle 76 h #45 - 67</td>
                  <td>Bogotá</td>
                  <td>7</td>
                  <td>2024-09-05</td>
                  <td>Inactivo</td>
                  <td>
                    <button class="btn btn-sm btn-warning btn-editar" data-id="cliente-3"><i class="bi bi-pencil"></i></button>
                    <button class="btn btn-sm btn-danger btn-eliminar" data-id="cliente-3"><i class="bi bi-trash"></i></button>
                  </td>
                </tr>
              </tbody>
            </table>
            <div class="text-center mt-3">
              <a href="AdminClientes.php" class="btn btn-secondary login-btn">Volver</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>

  <!-- MODAL: AGREGAR EMPLEADO -->
  <div class="modal fade" id="modalCliente" tabindex="-1" aria-labelledby="modalClienteLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <form id="formCliente">
          <div class="modal-header">
            <h5 class="modal-title">Nuevo Cliente</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
          </div>
          <div class="modal-body">
            <div class="mb-3">
              <label for="nombre" class="form-label">Nombre</label>
              <input type="text" class="form-control" id="nombre" required />
            </div>
            <div class="mb-3">
              <label for="correo" class="form-label">Correo</label>
              <input type="email" class="form-control" id="correo" required>
            </div>
            <div class="mb-3">
              <label for=telefono" class="form-label">Telefono</label>
              <input type="number" class="form-control" id="telefono" required>
            </div>
            <div class="mb-3">
              <label for="dirección" class="form-label">Dirección</label>
              <input type="text" class="form-control" id="dirección" required>
            </div>
            <div class="mb-3">
              <label for="departamento" class="form-label">Departamento</label>
              <input type="text" class="form-control" id="departamento" required>
            </div>
            <div class="mb-3">
              <label for="productosAdquiridos" class="form-label">Productos Adquiridos</label>
              <input type="number" class="form-control" id="productosAdquiridos" required>
            </div>
            <div class="mb-3">
              <label for="registro" class="form-label">Fecha de Registro</label>
              <input type="date" class="form-control" id="registro" required>
            </div>
            <div class="mb-3">
              <label for="estado" class="form-label">Estado</label>
              <select class="form-select" id="estado" required>
                <option value="" disabled selected>Seleccione un estado</option>
                <option value="Activo">Activo </option>
                <option value="Inactivo">Inactivo</option>
                <option value="Bloqueado">Bloqueado </option>
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
          <h5 class="modal-title" id="modalExitoLabel">¡Cliente agregado!</h5>
          <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
        </div>
        <div class="modal-body text-center">
          El Cliente se ha registrado correctamente.
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
          <h5 class="modal-title" id="modalEliminarLabel">¿Eliminar cliente?</h5>
          <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
        </div>
        <div class="modal-body text-center">
          ¿Estás seguro que deseas eliminar este cliente? Esta acción no se puede deshacer.
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
<script src="js/10. administrarCientes.js"></script>
</body>

</html>