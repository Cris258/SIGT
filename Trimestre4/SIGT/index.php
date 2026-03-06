<?php
session_start();

// Si ya está logueado, redirige según el rol
if (isset($_SESSION['nombre'])) {
  $rol = strtolower(trim($_SESSION['rol']));
  switch ($rol) {
    case "administrador":
      header("Location: Admin.php");
      break;
    case "empleado":
      header("Location: Empleado.php");
      break;
    case "cliente":
      header("Location: Usuario.php");
      break;
    default:
      session_destroy();
      header("Location: index.php");
  }
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
    <link rel="stylesheet" href="css/1. styleIndex.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link
        href="https://fonts.googleapis.com/css2?family=Merriweather:ital,opsz,wght@0,18..144,300..900;1,18..144,300..900&family=Poiret+One&family=Prata&family=Savate:ital,wght@0,200..900;1,200..900&display=swap"
        rel="stylesheet">
    <title>Inicio</title>
</head>
<header class="py-3 shadow-sm merriweather-font fw-bold">
    <div class="container">
        <div class="row g-0 justify-content-between align-items-center">
            <!-- Logo + Título -->
            <div class="col-auto d-flex align-items-center ps-2">
                <img src="img/Logo Vibra Positiva.jpg" alt="Logo" class="minilogo me-2">
                <h1 class="titulo fw-bold text-uppercase mb-0 fs-7 ms-2">Vibra Positiva Pijamas</h1>
            </div>
            <!-- Botones Registrarse e Iniciar Sesión -->
            <nav class="menu col-auto d-flex flex-column flex-md-row align-items-center gap-1 gap-md-2">
                <!-- Registrarse -->
                <a href="Registro.php"
                    class="co1 d-flex align-items-center text-center text-black text-decoration-none">
                    <div class="login btn d-flex align-items-center gap-1">
                        <span>Registrarse</span>
                        <div class="icono">
                            <i class="bi bi-person-add"></i>
                        </div>
                    </div>
                </a>
                <!-- Iniciar Sesion -->
                <a href="Login.php" class="co1 d-flex align-items-center text-center text-black text-decoration-none">
                    <div class="login btn d-flex align-items-center gap-1">
                        <span>Iniciar Sesión</span>
                        <div class="icono">
                            <i class="bi bi-door-open-fill"></i>
                        </div>
                    </div>
                </a>
            </nav>
        </div>
    </div>
</header>
<nav class="navbar navbar-expand-lg navbar-light">
    <div class="container-fluid justify-content-center">
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse justify-content-center" id="navbarNav">
            <ul class="navbar-nav merriweather-font fw-bold">
                <li class="nav-item"><a class="nav-link" href="#inicio">Inicio</a></li>
                <li class="nav-item"><a class="nav-link" href="#nuestrosproductos">Nuestros Productos</a></li>
                <li class="nav-item"><a class="nav-link" href="Tienda.php">Tienda</a></li>
                <li class="nav-item"><a class="nav-link" href="#quienes-somos">Quienes Somos</a></li>
                <li class="nav-item"><a class="nav-link" href="#ubicacion">Ubicación</a></li>
            </ul>
        </div>
    </div>
</nav>

<body>
    <section id="inicio" class="container py-5">
        <div class="container">
            <div class="row align-items-center">
                <!-- TEXTO -->
                <div class="col-12 col-md-6 text-center mb-4 mb-md-0">
                    <h1 class="tex1 display-5 fw-bold merriweather-font">Descansar bien también es parte del éxito</h1>
                    <p class="lead mt-3 fs-4 lato-font">Comienza tu día con energía positiva y alcanza cada meta que te
                        propongas. La comodidad empieza contigo.</p>
                    <a href="Tienda.php" class="btn btn-dark mt-3 merriweather-font fw-bold">Ver productos</a>
                </div>
                <!-- SLIDER -->
                <div class="col-12 col-md-6 d-flex justify-content-center align-items-center">
                    <div class="carousel slide" data-bs-ride="carousel" id="slider">
                        <div class="carousel-inner">
                            <div class="carousel-item active">
                                <img class="sliderimg d-block w-100" src="img/Slider 2.jpg" alt="">
                            </div>
                            <div class="carousel-item">
                                <img class="sliderimg d-block w-100" src="img/Slider 3.png" alt="">
                            </div>
                        </div>
                        <!-- botones -->
                        <button class="carousel-control-prev" type="button" data-bs-target="#slider"
                            data-bs-slide="prev">
                            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Anterior</span>
                        </button>
                        <button class="carousel-control-next" type="button" data-bs-target="#slider"
                            data-bs-slide="next">
                            <span class="carousel-control-next-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Siguiente</span>
                        </button>
                        <!-- indicadores -->
                        <div class="carousel-indicators">
                            <button type="button" data-bs-target="#slider" data-bs-slide-to="0" class="active"
                                aria-current="true" aria-label="Slide 1"></button>
                            <button type="button" data-bs-target="#slider" data-bs-slide-to="1"
                                aria-label="Slide 2"></button>
                        </div>
                    </div>
                </div>
            </div>
            <br>
            <hr>
        </div>
    </section>
    <main id="nuestrosproductos">
        <div class="container ">
            <div class="row produccion g-0 px-0 mb-5">
                <div class="col">
                    <h2 class="titulo text-center py-3 pt-0">Nuestros Productos</h2>
                    <div class="row galeria">
                        <!-- img1 -->
                        <div class="contenedor-imagen mb-4 col-md-3 col-12">
                            <a href="#" data-bs-toggle="modal" data-bs-target="#modal-galeria"
                                data-bs-image="img/Aguacate 2.jpg">
                                <img src="img/Aguacate 2.jpg" class="gal d-block w-100" alt="">
                            </a>
                        </div>
                        <!-- img2 -->
                        <div class="contenedor-imagen mb-4 col-md-3 col-12">
                            <a href="#" data-bs-toggle="modal" data-bs-target="#modal-galeria"
                                data-bs-image="img/Mafalda.jpg">
                                <img src="img/Mafalda.jpg" class="gal d-block w-100" alt="">
                            </a>
                        </div>
                        <!-- img3 -->
                        <div class="contenedor-imagen mb-4 col-md-3 col-12">
                            <a href="#" data-bs-toggle="modal" data-bs-target="#modal-galeria"
                                data-bs-image="img/Bob Esponja 2.jpg">
                                <img src="img/Bob Esponja 2.jpg" class="gal d-block w-100" alt="">
                            </a>
                        </div>
                        <!-- img4 -->
                        <div class="contenedor-imagen mb-4 col-md-3 col-12">
                            <a href="#" data-bs-toggle="modal" data-bs-target="#modal-galeria"
                                data-bs-image="img/Coco.jpg">
                                <img src="img/Coco.jpg" class="gal d-block w-100" alt="">
                            </a>
                        </div>
                        <!-- img5 -->
                        <div class="contenedor-imagen mb-4 col-md-4 col-12">
                            <a href="#" data-bs-toggle="modal" data-bs-target="#modal-galeria"
                                data-bs-image="img/Toy Story.jpg">
                                <img src="img/Aguacate. Parejajpg.jpg" class="gal d-block w-100" alt="">
                            </a>
                        </div>
                        <!-- img 6 -->
                        <div class="contenedor-imagen mb-4 col-md-4 col-12">
                            <a href="#" data-bs-toggle="modal" data-bs-target="#modal-galeria"
                                data-bs-image="img/Escandalosos Amigos.jpg">
                                <img src="img/Escandalosos Amigos.jpg" class="gal d-block w-100" alt="">
                            </a>
                        </div>
                        <!-- img 7-->
                        <div class="contenedor-imagen mb-4 col-md-4 col-12">
                            <a href="#" data-bs-toggle="modal" data-bs-target="#modal-galeria"
                                data-bs-image="img/Barman.jpg">
                                <img src="img/Barman.jpg" class="gal d-block w-100" alt="">
                            </a>
                        </div>
                        <!-- img 8-->
                        <div class="contenedor-imagen mb-4 col-md-3 col-12">
                            <a href="#" data-bs-toggle="modal" data-bs-target="#modal-galeria"
                                data-bs-image="img/Loonet Tunes.jpg">
                                <img src="img/Cerdito.jpg" class="gal d-block w-100" alt="">
                            </a>
                        </div>
                        <!-- img 9-->
                        <div class="contenedor-imagen mb-4 col-md-3 col-12">
                            <a href="#" data-bs-toggle="modal" data-bs-target="#modal-galeria"
                                data-bs-image="img/Liga de la Justicia.jpg">
                                <img src="img/Liga de la Justicia.jpg" class="gal d-block w-100" alt="">
                            </a>
                        </div>
                        <!-- img 10-->
                        <div class="contenedor-imagen mb-4 col-md-3 col-12">
                            <a href="#" data-bs-toggle="modal" data-bs-target="#modal-galeria"
                                data-bs-image="img/Micke Mouse.jpg">
                                <img src="img/Micke Mouse.jpg" class="gal d-block w-100" alt="">
                            </a>
                        </div>
                        <!-- img 11-->
                        <div class="contenedor-imagen mb-4 col-md-3 col-12">
                            <a href="#" data-bs-toggle="modal" data-bs-target="#modal-galeria"
                                data-bs-image="img/Minni Mouse.jpg">
                                <img src="img/Minni Mouse.jpg" class="gal d-block w-100" alt="">
                            </a>
                        </div>
                        <!-- img 12-->
                        <div class="contenedor-imagen mb-4 col-md-4 col-12">
                            <a href="#" data-bs-toggle="modal" data-bs-target="#modal-galeria"
                                data-bs-image="img/Scoby Do.jpg">
                                <img src="img/Scoby Do.jpg" class="gal d-block w-100" alt="">
                            </a>
                        </div>
                        <!-- img 13-->
                        <div class="contenedor-imagen mb-4 col-md-4 col-12">
                            <a href="#" data-bs-toggle="modal" data-bs-target="#modal-galeria"
                                data-bs-image="img/Bob Esponja.jpg">
                                <img src="img/Bob Esponja.jpg" class="gal d-block w-100" alt="">
                            </a>
                        </div>
                        <!-- img 14-->
                        <div class="contenedor-imagen mb-4 col-md-4 col-12">
                            <a href="#" data-bs-toggle="modal" data-bs-target="#modal-galeria"
                                data-bs-image="img/Spider Man.jpg">
                                <img src="img/Spider Man.jpg" class="gal d-block w-100" alt="">
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <hr>
        </div>
        <br>
    </main>
    <!-- Modal para galería -->
    <div class="modal fade" id="modal-galeria" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-lg">
            <div class="modal-content">
                <div class="modal-body p-0">
                    <img src="" class="img-fluid modal-img-custom" id="imagenModal" alt="Imagen ampliada">
                </div>
            </div>
        </div>
    </div>
    <br>
    <section id="quienes-somos" class="container">
        <div class="feature-card text-center">
            <h2 class="text-center">Quiénes Somos</h2>
            <div class="container">
                <div class="row text-center">
                    <div class="col-md-6 mb-4 d-flex flex-column align-items-center my-4">
                        <p class="parrafo fs-5 text-black">
                            Vibra Positiva nació en 2020 como una iniciativa familiar que combinó creatividad, pasión
                            por el diseño y visión emprendedora. Empezamos elaborando productos de bioseguridad, y fue
                            una tela con estampado de aguacates la que nos inspiró a ir más allá.
                            A partir de ese momento, descubrimos en las pijamas una forma de expresar bienestar, color y
                            personalidad. Creamos nuestros primeros diseños digitales con dedicación y comenzamos a
                            compartirlos en redes sociales, donde muchas personas conectaron con nuestra propuesta.
                            Hoy, seguimos creciendo con el mismo propósito: ofrecer comodidad, estilo y buena energía en
                            cada prenda, acompañando los momentos de descanso con auténtica vibra positiva.
                        </p>
                    </div>
                    <div class="col-md-6 mb-4 d-flex justify-content-center align-items-center my-4">
                        <img src="img/Logo Vibra Positiva.jpg"
                            class="logo mb-3 d-flex justify-content-center align-items: center alt=" Diseño" />
                    </div>
                </div>
            </div>
        </div>
        <br>
        <br>
        <hr>
    </section>
    <section class="py-5">
        <div class="container">
            <div class="row">
                <!-- Diseño -->
                <div class="col-md-4 mb-4">
                    <div class="feature-card text-center">
                        <img src="img/pijamas.jpg" alt="Diseño" style="max-width: 120px;" class="mb-3">
                        <h5 class="fw-bold">Diseño</h5>
                        <p class="text-muted text-justify">Imaginamos juntos qué es lo que más te gustaría, todo nuestro
                            equipo de diseño está presto siempre a escucharte y a pensar lo impensable para ti. Si algún
                            día tienes una idea de Pijama o babucha y la quieres compartir, estamos aquí en cualquier
                            canal para desarrollarla.
                        </p>
                    </div>
                </div>
                <!-- Comodidad -->
                <div class="col-md-4 mb-4">
                    <div class="feature-card text-center">
                        <img src="img/corazon morado.png" alt="Comodidad" style="max-width: 120px;" class="mb-3">
                        <h5 class="fw-bold">Comodidad</h5>
                        <p class="text-muted text-justify">Investigamos los materiales más cómodos y con la mejor
                            sensación al tacto con la piel, de esta manera cuando tocas tu lugar de descanso vas a
                            experimentar una sensación indescriptible.
                        </p>
                    </div>
                </div>
                <!-- Calidad -->
                <div class="col-md-4 mb-4">
                    <div class="feature-card text-center">
                        <img src="img/Maquina de Coser.jpg" alt="Calidad" style="max-width: 120px;" class="mb-3">
                        <h5 class="fw-bold">Calidad</h5>
                        <p class="text-muted text-justify">Fabricamos tus hermosas pijamas, todo un equipo de madres
                            cabeza de hogar expertas en el proceso textil. Nosotros mismos hacemos todo el proceso desde
                            el corte, hasta la confección y empaque, comprometidos en darte un diseño único de excelente
                            calidad.
                        </p>
                    </div>
                </div>
            </div>
            <br>
            <hr>
        </div>
    </section>
    <section id="ubicacion" class="container mt-2 mb-5">
        <h2 class="text-center mb-4 poiret-one-font fw-bold">Dónde Estamos</h2>
        <div class="row justify-content-center">
            <div class="col-12 col-md-10 bg-white p-2 rounded shadow">
                <iframe class="mapa d-block mx-auto"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4093.575411821896!2d-74.08750489789102!3d4.586985249402693!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e3f99029e31d91b%3A0xec805fcdd24c029d!2zQ2wuIDIgU3VyICMgMTAtMzksIEFudG9uaW8gTmFyacOxbywgQm9nb3TDoSwgRC5DLiwgQm9nb3TDoSwgQm9nb3TDoSwgRC5DLg!5e0!3m2!1ses-419!2sco!4v1750648259328!5m2!1ses-419!2sco"
                    width="100%" height="450" style="border:0;" allowfullscreen="" loading="lazy"
                    referrerpolicy="no-referrer-when-downgrade">
                </iframe>
            </div>
        </div>
    </section>
    <footer class="text-black pt-5 pb-3">
        <div class="container text-center">
            <div class="row justify-content-center">
                <div class="col-md-3 mb-4">
                    <h5 class="footertitulos fw-bold">Contacto</h5>
                    <p>📍 <strong>Dirección: </strong>Calle 2 Sur #10 - 39, Bogota, Colombia</p>
                    <p>📞 <strong>Teléfono: </strong>+57 305 930 9024</p>
                    <p>📧 <strong>Email: </strong>vibrapositiva1720@gmail.com</p>
                </div>
                <div class="col-md-3 mb-4">
                    <h5 class="footertitulos fw-bold">Enlaces Rápidos</h5>
                    <ul class="list-unstyled">
                        <li><a href="#inicio" class="text-black text-decoration-none">Inicio</a></li>
                        <li><a href="#nuestrosproductos" class="text-black text-decoration-none">Nuestros Productos</a>
                        </li>
                        <li><a href="Tienda.php" class="text-black text-decoration-none">Tienda</a></li>
                        <li><a href="#quienes-somos" class="text-black text-decoration-none">Quienes Somos</a></li>
                        <li><a href="#ubicacion" class="text-black text-decoration-none">Ubicación</a></li>
                    </ul>
                </div>
                <div class="col-md-3 mb-4 text-center">
                    <h5 class="footertitulos fw-bold">Síguenos</h5>
                    <div class="d-flex justify-content-center gap-4 fs-4">
                        <a href="https://wa.me/573059309024?text=Hola%20quiero%20más%20información"
                            class="text-black"><i class="bi bi-whatsapp"></i></a>
                        <a href="https://www.facebook.com/share/19rxvzvkqo/" class="text-black"><i
                                class="bi bi-facebook"></i></a>
                        <a href="https://www.instagram.com/vibrapositivapijamas?igsh=Ym9zaTVnMmxrc29i"
                            class="text-black"><i class="bi bi-instagram"></i></a>
                    </div>
                </div>
            </div>
            <div class="text-center mt-4 fw-bold">
                <small>© 2025 Tienda de Pijamas Vibra Positiva - Todos los derechos reservados</small>
            </div>
        </div>
    </footer>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p"
        crossorigin="anonymous"></script>
    <script src="js/1. appindex.js"></script>
</body>

</html>