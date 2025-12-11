<?php
require_once 'conexion/conexion.php';
require_once 'modeloDao/UsuarioDao.php';
$dao = new UsuarioDao();
$usuarios = $dao->listarUsuarios();
?>

<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <script src="https://code.jquery.com/jquery-3.5.1.js"></script>
  <link rel="stylesheet" href="css/5. styleAdminEmpleados.css">
  <link rel="stylesheet" href="https://cdn.datatables.net/1.13.4/css/jquery.dataTables.min.css">
  <script src="https://cdn.datatables.net/1.13.4/js/jquery.dataTables.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet"
    integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css">
  <link rel="stylesheet" href="css/5. styleAdminEmpleados.css">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link
    href="https://fonts.googleapis.com/css2?family=Merriweather:ital,opsz,wght@0,18..144,300..900;1,18..144,300..900&family=Poiret+One&family=Prata&family=Savate:ital,wght@0,200..900;1,200..900&display=swap"
    rel="stylesheet">
  <title>Listado de Usuario</title>
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
        <a href="Admin.php" class="co1 d-flex align-items-center text-center text-black text-decoration-none">
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

<body class="bg-light">

  <div class="container mt-5 d-flex flex-column align-items-center">
    <h2 class="text-center mb-4 merriweather-font">Lista de Usuarios Registrados</h2>

    <table class="table table-striped table-hover table-bordered table responsive mt-6 w-auto text-center" id="table">
      <thead class="table-dark">
        <tr>
          <th>Numero Documento</th>
          <th>Tipo Documento</th>
          <th>Primer Nombre</th>
          <th>Segundo Nombre</th>
          <th>Primer Apellido</th>
          <th>Segundo Apellido</th>
          <th>Correo</th>
          <th>Teléfono</th>
          <th>Rol</th>
          <th>Modificar</th>
          <th>Eliminar</th>
        </tr>
      </thead>
      <tbody>
        <?php foreach ($usuarios as $u): ?>
          <tr>
            <td><?= htmlspecialchars($u['NumeroDocumento']) ?></td>
            <td><?= htmlspecialchars($u['TipoDocumento']) ?></td>
            <td><?= htmlspecialchars($u['Primer_Nombre']) ?></td>
            <td><?= htmlspecialchars($u['Segundo_Nombre']) ?></td>
            <td><?= htmlspecialchars($u['Primer_Apellido']) ?></td>
            <td><?= htmlspecialchars($u['Segundo_Apellido']) ?></td>
            <td><?= htmlspecialchars($u['Correo']) ?></td>
            <td><?= htmlspecialchars($u['Telefono']) ?></td>
            <td><?= htmlspecialchars($u['rolPersona']) ?></td>
            <td>
              <a href="editarUsuario.php?doc=<?= $u['NumeroDocumento'] ?>">
                <img src="img/editar3.png" width="40" height="40" class="img-thumbnail" alt="">
              </a>
            </td>
            <td>
              <a href="eliminarUsuario.php?doc=<?php echo $u['NumeroDocumento']; ?>">
                <img src="img/eliminar2.png" width="40" height="40"
                  class="img-thumbnail" alt="">
                </a>
            </td>
          </tr>
        <?php endforeach; ?>
      </tbody>
    </table>
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

</html>