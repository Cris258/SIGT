<?php
require_once 'conexion/conexion.php';
require_once 'modeloDao/UsuarioDao.php';

if (isset($_GET['doc'])) {
    $doc = $_GET['doc'];
    $dao = new UsuarioDao();

    $resultado = $dao->eliminarUsuario($doc);

    if ($resultado) {
        header("Location: ListadoUsuarios.php?mensaje=eliminado");
        exit;
    } else {
        echo "Error al eliminar el usuario.";
    }
} else {
    echo "Documento no proporcionado.";
}
?>