<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css">
  <link rel="stylesheet" href="css/2. styleRegistro.css">
  <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
  <link href="https://fonts.googleapis.com/css2?family=Merriweather:ital,opsz,wght@0,18..144,300..900;1,18..144,300..900&family=Poiret+One&family=Prata&family=Savate:ital,wght@0,200..900;1,200..900&display=swap" rel="stylesheet">
  <title>Inicio de Sesión</title>
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
            <span>Volver</span>
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
  <section class="container my-5">
    <div class="card shadow-lg border-0 overflow-hidden">
      <div class="container">
        <div class="row text-center align-items-stretch">
          <div class="col-md-8 d-flex flex-column align-items-center justify-content-center my-4">

            <?php
            if (isset($_GET['error'])):
            ?>
              <p style="color:red;"><?php echo htmlspecialchars($_GET['error']); ?></p>
            <?php
            endif;
            ?>
            <form id="formularioLogin" action="LoginProceso.php" method="POST">
              <p class="parrafo fs-5 text-black merriweather-font">
                ¡Bienvenido a Vibra Positiva Pijamas!<br>
                Inicia Sesión para tener acceso a nuestro contenido.
              </p>

              <!-- Rol -->
              <div class="mb-3">
                <label class="form-label text-start d-block">Rol</label>
                <select class="form-select" id="rol" name="rolPersona" required>
                  <option value="" selected disabled>Seleccione su rol</option>
                  <option value="Administrador">Administrador</option>
                  <option value="Empleado">Empleado</option>
                  <option value="Cliente">Cliente</option>
                </select>
                <div class="invalid-feedback"></div>
              </div>

              <!-- Tipo de Documento -->
              <div class="mb-3">
                <label class="form-label text-start d-block">Tipo Documento</label>
                <select class="form-select" id="documento" name="TipoDocumento" required>
                  <option value="" selected disabled>Seleccione su tipo de documento</option>
                  <option value="CC">CC</option>
                  <option value="TI">TI</option>
                  <option value="CE">CE</option>
                  <option value="Pasaporte">Pasaporte</option>
                </select>
                <div class="invalid-feedback"></div>
              </div>

              <!-- Número Documento -->
              <div class="mb-3">
                <label class="form-label text-start d-block">Número Documento</label>
                <input type="number" class="form-control" id="numDocumento" name="NumeroDocumento" placeholder="Escriba su número de documento" required>
                <div class="invalid-feedback"></div>
              </div>

              <!-- Contraseña -->
              <div class="mb-3">
                <label class="form-label text-start d-block">Contraseña</label>
                <div class="input-group">
                  <input type="password" id="Contrasena" name="Contrasena" class="form-control" required>
                  <button class="btn btn-outline-secondary toggle-password" type="button" data-target="Contrasena">
                    <i class="bi bi-eye"></i>
                  </button>
                  <div class="invalid-feedback"></div>
                </div>
              </div>

              <br>

              <!-- Botón Login -->
              <div class="d-grid">
                <button type="submit" name="login" class="boton btn text-black">Iniciar sesión</button>
              </div>
            </form>
            <div class="mt-3 text-center">
              <a href="OlvidoContraseña.php" class="text-primary">¿Olvidó su contraseña?</a>
            </div>
            <div class="mt-3 text-center">
              <p>No te has registrado
                <a href="Registro.php" class="text-primary">Registrate</a>
                aqui
              </p>
            </div>
          </div>

          <div class="col-md-4 p-0">
            <img src="img/Logo Vibra Positiva.jpg" class="img-fluid img h-100" alt="Diseño" />
          </div>
        </div>
      </div>
    </div>
  </section>
  <br>
  <br>
  <!-- Modal: Recuperar Contraseña -->
  <div class="modal fade" id="modalRecuperar" tabindex="-1" aria-labelledby="modalRecuperarLabel"
    aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content shadow-lg">
        <div class="modal-header encabezado-modal">
          <h5 class="modal-title" id="modalRecuperarLabel">Recuperar Contraseña</h5>
          <button type="button" class="btn-close e" data-bs-dismiss="modal" aria-label="Cerrar"></button>
        </div>
        <div class="modal-body text-center px-4 py-4">
          <form id="formRecuperar" class="text-start">
            <div class="mb-3">
              <label for="emailRecuperar" class="form-label">Correo electrónico registrado</label>
              <input type="email" id="emailRecuperar" class="form-control" required placeholder="ejemplo@correo.com">
            </div>
            <div class="d-grid">
              <button type="submit" class="btn btn-custom text-black">Enviar clave temporal</button>
            </div>
          </form>
          <div id="mensajeError" class="mt-3 text-danger d-none text-start">Correo inválido o no registrado.
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
        <div class="modal-header encabezado-modal">
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
          <div class="mt-4">
            <a href="1. index.php" class="btn btn-custom text-black">Volver al inicio de sesión</a>
          </div>
        </div>
      </div>
    </div>
  </div>
  <footer class="text-black pt-5 pb-3">
    <div class="container text-center">
      <div class="row justify-content-center">
        <div class="col-md-6 mb-4">
          <h5 class="footertitulos fw-bold">Contacto</h5>
          <p>📍 <strong>Dirección: </strong>Calle 2 Sur #10 - 39, Bogota, Colombia</p>
          <p>📞 <strong>Teléfono: </strong>+57 305 930 9024</p>
          <p>📧 <strong>Email: </strong>vibrapositiva1720@gmail.com</p>
        </div>
        <div class="col-md-6 mb-4 text-center">
          <h5 class="footertitulos fw-bold">Síguenos</h5>
          <div class="d-flex justify-content-center gap-4 fs-4">
            <a href="https://wa.me/573059309024?text=Hola%20quiero%20más%20información" class="text-black"><i class="bi bi-whatsapp"></i></a>
            <a href="https://www.facebook.com/share/19rxvzvkqo/" class="text-black"><i class="bi bi-facebook"></i></a>
            <a href="https://www.instagram.com/vibrapositivapijamas?igsh=Ym9zaTVnMmxrc29i" class="text-black"><i class="bi bi-instagram"></i></a>
          </div>
        </div>
      </div>
      <div class="text-center mt-4 poiret-one-font fw-bold">
        <small>© 2025 Tienda de Pijamas Vibra Positiva - Todos los derechos reservados</small>
      </div>
    </div>
  </footer>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>
  <script src="js/applogin.js"></script>
  <?php
  if (isset($_GET['error']) && $_GET['error'] == 1) {
    echo  "<script>
        Swal.fire({
          title: 'Inicio no valido',
          text: 'Usuario o contraseña incorrecta',
          icon: 'error'
          });
          </script>";
  }
  ?>
</body>

</html>