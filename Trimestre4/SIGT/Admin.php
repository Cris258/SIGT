<?php
session_start();
if (!isset($_SESSION['nombre'])){
  header('Location: index.php');
  exit();
}
?>

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
        <a href="Logout.php" class="co1 d-flex align-items-center text-center text-black text-decoration-none">
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

        <a href="#" class="nav-link custom-link" data-bs-toggle="modal" data-bs-target="#modalCambiarContraseña">
          Cambiar Contraseña
        </a>

        <li class="nav-item">
          <a href="ListadoUsuarios.php" class="nav-link custom-link">Registro de Usuarios</a>
        </li>

        <hr class="bg-light">

        <li class="nav-item">
          <a href="Admin.php" class="nav-link custom-link active">Empleados</a>
        </li>
        <li class="nav-item">
          <a href="AdminInventario.php" class="nav-link custom-link">Inventario</a>
        </li>
        <li class="nav-item">
          <a href="AdminClientes.php" class="nav-link custom-link">Clientes</a>
        </li>

        <hr class="bg-light">

        <li class="nav-item">
          <a href="AdministrarEmpleados.php" class="nav-link custom-link">Administrar Empleados</a>
        </li>
        <li class="nav-item">
          <a href="#" class="nav-link custom-link" data-bs-toggle="modal" data-bs-target="#modalAsignarTarea">Asignar
            Tarea</a>
        </li>
        <li class="nav-item">
          <a href="#" class="nav-link custom-link" data-bs-toggle="modal" data-bs-target="#modalReporteEmpleado">
            Generar Reporte de Empleados y Tareas
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
                  <button type="button" class="btn btn-outline-secondary toggle-password" data-input="passwordAntigua">
                    <i class="bi bi-eye"></i>
                  </button>
                </div>
              </div>
              <div class="mb-3 text-start">
                <label class="form-label">Contraseña Nueva</label>
                <div class="input-group">
                  <input type="password" class="form-control" id="passwordNueva" required>
                  <button type="button" class="btn btn-outline-secondary toggle-password" data-input="passwordNueva">
                    <i class="bi bi-eye"></i>
                  </button>
                </div>
              </div>
              <div class="mb-3 text-start">
                <label class="form-label">Repetir Contraseña</label>
                <div class="input-group">
                  <input type="password" class="form-control" id="passwordRepetir" required>
                  <button type="button" class="btn btn-outline-secondary toggle-password" data-input="passwordRepetir">
                    <i class="bi bi-eye"></i>
                  </button>
                </div>
                <small id="errorCoincidencia" class="text-danger d-none">Las contraseñas no coinciden.</small>
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
            <a href="1. index.php" class="btn custom-btn">Aceptar</a>
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
                <input type="email" id="emailRecuperar" class="form-control" required placeholder="ejemplo@correo.com">
              </div>
              <div class="d-grid">
                <button type="submit" class="btn custom-btn text-black">Enviar clave temporal</button>
              </div>
            </form>
            <div id="mensajeErrorCorreo" class="mt-3 text-danger d-none text-start">Correo inválido o no registrado.
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
    <!-- MODAL: ASIGNAR TAREA -->
    <div class="modal fade" id="modalAsignarTarea" tabindex="-1" aria-labelledby="modalAsignarTareaLabel"
      aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content rounded-3 shadow">
          <div class="modal-header text-black">
            <h5 class="modal-title" id="modalAsignarTareaLabel">Asignar Tarea a Empleado</h5>
            <button type="button" class="btn-close btn-close-black" data-bs-dismiss="modal"
              aria-label="Cerrar"></button>
          </div>
          <form id="formAsignarTarea">
            <div class="modal-body">
              <div class="mb-3">
                <label class="form-label">ID Empleado</label>
                <input type="number" class="form-control" id="idEmpleadoAsignar" required>
              </div>
              <div class="mb-3">
                <label class="form-label">Tarea</label>
                <input type="text" class="form-control" id="tarea" required>
              </div>
              <div class="mb-3">
                <label for="tipoTarea">Tipo de Tarea</label>
                <select id="tipoTarea" class="form-select">
                  <option disabled selected>Seleccione el tipo</option>
                  <option value="Corte">Corte</option>
                  <option value="Confección">Confección</option>
                  <option value="Entrega">Entrega</option>
                  <option value="Control de calidad">Control de calidad</option>
                </select>
              </div>
              <div class="mb-3">
                <label for="prioridadTarea">Prioridad</label>
                <select id="prioridadTarea" class="form-select" required>
                  <option disabled selected>Seleccione una prioridad</option>
                  <option value="Alta">Alta</option>
                  <option value="Media">Media</option>
                  <option value="Baja">Baja</option>
                </select>
              </div>
              <div class="mb-3">
                <label class="form-label">Descripción</label>
                <input type="text" class="form-control" id="descripcionTarea" required>
              </div>
              <div class="mb-3">
                <label class="form-label">Fecha Límite de Entrega</label>
                <input type="date" class="form-control" id="fechaEntregaAsignar" required>
              </div>
            </div>
            <div class="modal-footer d-flex justify-content-center">
              <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Cancelar</button>
              <button type="submit" class="btn custom-btn text-black">Asignar</button>
            </div>
          </form>
        </div>
      </div>
    </div>
    <!-- MODAL: ERROR -->
    <div class="modal fade" id="modalErrorAsignar" tabindex="-1" aria-labelledby="modalErrorLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content rounded-3 shadow">
          <div class="modal-header bg-danger text-white">
            <h5 class="modal-title" id="modalErrorLabel">Error</h5>
            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"
              aria-label="Cerrar"></button>
          </div>
          <div class="modal-body text-center">
            <p>No se encontró un empleado con ese ID.</p>
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
          </div>
        </div>
      </div>
    </div>

    <!-- MAIN -->
    l<main class="flex-grow-1 p-4 bg-light">
      <!-- FILA 1: TABLA DE EMPLEADOS -->
      <div class="row g-4 mb-4">
        <div class="col-12">
          <div class="card shadow-sm">
            <div class="card-header d-flex justify-content-between align-items-center">
              <span class="fw-bold">Empleados y Tareas</span>
              <div class="btn-group">
                <button class="btn btn-success btn-sm" id="btnAgregarEmpleado" title="Crear">
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
                    <th>Rol</th>
                    <th>Tareas Hechas</th>
                    <th>Pendientes</th>
                    <th>Total de Tareas</th>
                    <th>Próxima Entrega</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody id="tablaEmpleados">
                  <tr id="empleado-1">
                    <td>1</td>
                    <td>Cristian Valencia</td>
                    <td>Corte</td>
                    <td>5</td>
                    <td>2</td>
                    <td>7</td>
                    <td>2025-07-10</td>
                    <td>
                      <button class="btn btn-sm btn-warning btn-editar" data-id="empleado-1"><i
                          class="bi bi-pencil"></i></button>
                      <button class="btn btn-sm btn-danger btn-eliminar" data-id="empleado-1"><i
                          class="bi bi-trash"></i></button>
                    </td>
                  </tr>
                  <tr id="empleado-2">
                    <td>2</td>
                    <td>Juan Cruz</td>
                    <td>Domiciliario</td>
                    <td>8</td>
                    <td>1</td>
                    <td>9</td>
                    <td>2025-07-12</td>
                    <td>
                      <button class="btn btn-sm btn-warning btn-editar" data-id="empleado-2"><i
                          class="bi bi-pencil"></i></button>
                      <button class="btn btn-sm btn-danger btn-eliminar" data-id="empleado-2"><i
                          class="bi bi-trash"></i></button>
                    </td>
                  </tr>
                  <tr id="empleado-3">
                    <td>3</td>
                    <td>Valeria Meza</td>
                    <td>Ventas</td>
                    <td>8</td>
                    <td>1</td>
                    <td>9</td>
                    <td>2025-07-12</td>
                    <td>
                      <button class="btn btn-sm btn-warning btn-editar" data-id="empleado-3"><i
                          class="bi bi-pencil"></i></button>
                      <button class="btn btn-sm btn-danger btn-eliminar" data-id="empleado-3"><i
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
        <div class="col-12 col-md-4 d-flex flex-column">
          <div class="card shadow-sm h-100">
            <div class="card-header fw-bold">Estadísticas</div>
            <div class="card-body">
              <canvas id="graficoTareas" width="200" height="200"></canvas>
            </div>
          </div>
        </div>

        <!-- Top 5 Empleados -->
        <div class="col-12 col-md-4 d-flex flex-column">
          <div class="card shadow-sm h-100">
            <div class="card-header fw-bold">Top 5 Empleados</div>
            <div class="card-body">
              <ol class="list-group list-group-numbered" id="listaTopEmpleados">
                <!-- Se llena con JS -->
              </ol>
            </div>
          </div>
        </div>

        <!-- Calendario -->
        <div class="col-12 col-md-4 d-flex flex-column">
          <div class="card shadow-sm h-100">
            <div class="card-header fw-bold">Calendario</div>
            <div class="card-body p-0">
              <iframe
                src="https://calendar.google.com/calendar/embed?src=es.co%23holiday%40group.v.calendar.google.com&ctz=America%2FBogota"
                style="border: 0;" width="100%" height="300" frameborder="0" scrolling="no"></iframe>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>

  <!-- MODAL PARA CREAR/EDITAR EMPLEADO -->
  <div class="modal fade" id="empleadoModal" tabindex="-1" aria-labelledby="empleadoModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <form id="formEmpleado">
          <div class="modal-header text-black">
            <h5 class="modal-title" id="empleadoModalLabel">Agregar Tarea</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
          </div>
          <div class="modal-body">
            <input type="hidden" id="modo" value="crear">
            <input type="hidden" id="filaEditar" value="">
            <div class="mb-3">
              <label for="nombreEmpleado" class="form-label">Nombre</label>
              <input type="text" class="form-control" id="nombreEmpleado" required>
            </div>
            <div class="mb-3">
              <label for="rolEmpleado" class="form-label">Rol</label>
              <select class="form-select" id="rolEmpleado" required>
                <option value="" disabled selected>Seleccione un rol</option>
                <option value="Corter">Corte</option>
                <option value="Confección">Confección</option>
                <option value="Ventas">Ventas</option>
                <option value="Recepción de Pedidos">Recepción de Pedidos</option>
                <option value="Operario de Fileteadora">Operaria de Fileteadora</option>
                <option value="Operaria de Máquina Collarín">Operaria de Máquina Collarín</option>
                <option value="Domiciliario">Domiciliario</option>
              </select>
            </div>
            <div class="mb-3">
              <label for="hechasEmpleado" class="form-label">Tareas Hechas</label>
              <input type="number" class="form-control" id="hechasEmpleado" required>
            </div>
            <div class="mb-3">
              <label for="pendientesEmpleado" class="form-label">Tareas Pendientes</label>
              <input type="number" class="form-control" id="pendientesEmpleado" required>
            </div>
            <div class="mb-3">
              <label for="entregaEmpleado" class="form-label">Fecha de Entrega</label>
              <input type="date" class="form-control" id="entregaEmpleado" required>
            </div>
            <div class="modal-footer d-flex justify-content-center">
              <button type="button" class="btn btn-danger text-white" data-bs-dismiss="modal">Cancelar</button>
              <button type="submit" class="btn custom-btn text-black">Guardar</button>  
            </div>
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
          <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Cerrar"></button>
        </div>
        <div class="modal-body text-center">
          Esta acción no se puede deshacer<br>¿Deseas eliminar este empleado?
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
          <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Cerrar"></button>
        </div>
        <div class="modal-body text-center">
          El empleado ha sido eliminado exitosamente.
        </div>
        <div class="modal-footer justify-content-center">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Aceptar</button>
        </div>
      </div>
    </div>
  </div>
  <!-- MODAL GENERAR REPORTE -->
  <div class="modal fade" id="modalReporteEmpleado" tabindex="-1" aria-labelledby="modalReporteEmpleadoLabel"
    aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content shadow">
        <div class="modal-header text-black">
          <h5 class="modal-title" id="modalReporteEmpleadoLabel">Generar Reporte de Empleados y Tareas</h5>
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
  <script src="js/3. appadmin.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.5.28/jspdf.plugin.autotable.min.js"></script>

</body>

</html>