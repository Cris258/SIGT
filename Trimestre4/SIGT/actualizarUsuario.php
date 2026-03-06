<?php
require_once 'conexion/conexion.php';
require_once 'modeloDao/UsuarioDao.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $dao = new UsuarioDao();

    $datos = [
        'NumeroDocumento' => $_POST['NumeroDocumento'],
        'Primer_Nombre' => $_POST['Primer_Nombre'],
        'Segundo_Nombre' => $_POST['Segundo_Nombre'],
        'Primer_Apellido' => $_POST['Primer_Apellido'],
        'Segundo_Apellido' => $_POST['Segundo_Apellido'],
        'Correo' => $_POST['Correo'],
        'Telefono' => $_POST['Telefono'],
        'rolPersona' => $_POST['rolPersona']
    ];

    $resultado = $dao->actualizarUsuario($datos);

    if ($resultado) {
        header("Location: ListadoUsuarios.php?mensaje=actualizado");
    } else {
        echo "Error al actualizar usuario.";
    }
}
?>
