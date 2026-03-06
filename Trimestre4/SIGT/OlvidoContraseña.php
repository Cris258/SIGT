<!DOCTYPE html>
<html lang="es">

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
  <title>¿Olvido su Contraseña?</title>
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
            <h2>Recuperar contraseña</h2>
            <form action="procesarRecuperacion.php" method="POST">
              <!-- Número Documento -->
              <div class="mb-3">
                <label class="form-label text-start d-block">Número Documento</label>
                <input type="number" class="form-control" id="numDocumento" name="NumeroDocumento" placeholder="Escriba su número de documento" required>
                <div class="invalid-feedback"></div>
              </div>

              <!-- Correo -->
              <div class="mb-3">
                <label for="Correo" class="form-label text-start d-block">Correo electrónico</label>
                <input type="email" class="form-control" id="correo" name="Correo" placeholder="sucorreo@ejemplo.com" required>
                <div class="invalid-feedback"></div>
              </div>
              <div class="d-grid">
                <button type="submit" class="boton btn text-black">Enviar solicitud</button>
              </div>
            </form>
          </div>
          <div class="col-md-4 p-0">
            <img src="img/Logo Vibra Positiva.jpg" class="img-fluid img h-100" alt="Diseño" />
          </div>
        </div>
      </div>
    </div>
  </section>
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
<script src="js/2. appregistrarse.js"></script>
</body>

</html>