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
  <link rel="stylesheet" href="css/4. styleEmpleado.css">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link
    href="https://fonts.googleapis.com/css2?family=Merriweather:ital,opsz,wght@0,18..144,300..900;1,18..144,300..900&family=Poiret+One&family=Prata&family=Savate:ital,wght@0,200..900;1,200..900&display=swap"
    rel="stylesheet">
  <title>Empleado</title>
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
        <h5 class="fw-bold mt-2">Nombre Empleado</h5>
      </div>
      <hr class="bg-light">
      <ul class="nav flex-column text-center">
        <li class="nav-item">
          <a href="#" class="nav-link custom-link" data-bs-toggle="modal"
            data-bs-target="#modalActualizarDatos">Actualizar Datos</a>
        </li>

        <a href="#" class="nav-link custom-link" data-bs-toggle="modal" data-bs-target="#modalCambiarContraseña">
          Cambiar Contraseña
        </a>
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

    <!-- MAIN -->
    <main class="flex-grow-1 p-4 bg-light">
      <!-- FILA 1: TABLA DE EMPLEADOS -->
      <div class="row g-4 mb-4">
        <div class="col-12">
          <div class="card shadow-sm">
            <div class="card-header d-flex justify-content-center align-items-center">
              <span class="fw-bold">Menu de Tareas</span>
            </div>
            <div class="card-body table-responsive">
              <table class="table table-bordered align-middle text-center">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Tipo Pijama</th>
                    <th>Cantidad</th>
                    <th>Tipo de Tela</th>
                    <th>Color</th>
                    <th>Fecha Maxima de Entrega</th>
                    <th>Prioridad</th>
                    <th>Estado</th>
                  </tr>
                </thead>
                <tbody id="tablaEmpleados">
                  <tr>
                    <td>001</td>
                    <td>Pijama Enteriza</td>
                    <td>10</td>
                    <td>Algodón</td>
                    <td>Rosa</td>
                    <td>2025-07-10</td>
                    <td>Alta</td>
                    <td>
                      <div class="d-flex justify-content-center">
                        <div class="dropdown">
                          <button class="btn btn-warning btn-sm dropdown-toggle d-flex align-items-center" type="button"
                            data-bs-toggle="dropdown" aria-expanded="false">
                            <img src="https://img.icons8.com/fluency/16/000000/in-progress--v1.png" class="me-1" /> En
                            proceso
                          </button>
                          <ul class="dropdown-menu">
                            <li>
                              <a class="dropdown-item d-flex align-items-center text-success" href="#"
                                onclick="cambiarEstado(this, 'Completada', 'btn-success', 'https://img.icons8.com/color/16/checked--v1.png')">
                                <img src="https://img.icons8.com/color/16/checked--v1.png" class="me-2" /> Completada
                              </a>
                            </li>
                            <li>
                              <a class="dropdown-item d-flex align-items-center text-warning" href="#"
                                onclick="cambiarEstado(this, 'En proceso', 'btn-warning', 'https://img.icons8.com/fluency/16/in-progress--v1.png')">
                                <img src="https://img.icons8.com/fluency/16/in-progress--v1.png" class="me-2" /> En
                                proceso
                              </a>
                            </li>
                            <li>
                              <a class="dropdown-item d-flex align-items-center text-danger" href="#"
                                onclick="cambiarEstado(this, 'Pendiente', 'btn-danger', 'https://img.icons8.com/color/16/high-priority.png')">
                                <img src="https://img.icons8.com/color/16/high-priority.png" class="me-2" /> Pendiente
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>002</td>
                    <td>Pijama Dos Piezas</td>
                    <td>15</td>
                    <td>Seda</td>
                    <td>Azul</td>
                    <td>2025-07-15</td>
                    <td>Media</td>
                    <td>
                      <div class="d-flex justify-content-center">
                        <div class="dropdown">
                          <button
                            class="btn btn-warning btn-sm dropdown-toggle d-flex align-items-center justify-content-center"
                            type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <img src="https://img.icons8.com/fluency/16/000000/in-progress--v1.png" class="me-1" /> En
                            proceso
                          </button>
                          <ul class="dropdown-menu">
                            <li>
                              <a class="dropdown-item d-flex align-items-center text-success" href="#"
                                onclick="cambiarEstado(this, 'Completada', 'btn-success', 'https://img.icons8.com/color/16/checked--v1.png')">
                                <img src="https://img.icons8.com/color/16/checked--v1.png" class="me-2" /> Completada
                              </a>
                            </li>
                            <li>
                              <a class="dropdown-item d-flex align-items-center text-warning" href="#"
                                onclick="cambiarEstado(this, 'En proceso', 'btn-warning', 'https://img.icons8.com/fluency/16/in-progress--v1.png')">
                                <img src="https://img.icons8.com/fluency/16/in-progress--v1.png" class="me-2" /> En
                                proceso
                              </a>
                            </li>
                            <li>
                              <a class="dropdown-item d-flex align-items-center text-danger" href="#"
                                onclick="cambiarEstado(this, 'Pendiente', 'btn-danger', 'https://img.icons8.com/color/16/high-priority.png')">
                                <img src="https://img.icons8.com/color/16/high-priority.png" class="me-2" /> Pendiente
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
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
        <!-- Gráficas Asistencia y Desempeño -->
        <div class="col-12 col-md-8 h-100">
          <div class="card shadow-sm h-100">
            <div class="card-header fw-bold text-center">Asistencia y Desempeño</div>
            <div class="card-body">
              <div class="row">
                <!-- Gráfico tipo pastel -->
                <div class="col-md-6 d-flex justify-content-center align-items-center">
                  <canvas id="chartAsistencia" style="max-height: 250px; max-width: 100%;"></canvas>
                </div>

                <!-- Gráfico de barras -->
                <div class="col-md-6 d-flex align-items-center">
                  <div class="chart-container">
                    <canvas id="chartDesempeno" class="canvas-full"></canvas>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- Calendario -->
        <div class="col-12 col-md-4 h-100">
          <div class="card shadow-sm h-100">
            <div class="card-header fw-bold">Calendario</div>
            <div class="card-body p-0">
              <iframe
                src="https://calendar.google.com/calendar/embed?src=es.co%23holiday%40group.v.calendar.google.com&ctz=America%2FBogota"
                style="border: 0;" width="100%" height="276.5" frameborder="0" scrolling="no"></iframe>
            </div>
          </div>
        </div>
      </div>
    </main>
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
  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
  <script src="js/4. appempleado.js"></script>
</body>

</html>