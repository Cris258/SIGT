<?php
session_start();
require_once 'conexion/conexion.php';
require_once 'modeloDao/UsuarioDao.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $numeroDoc = $_POST['NumeroDocumento'] ?? '';
    $contrasena = $_POST['Contrasena'] ?? '';
    $rol = $_POST['rolPersona'] ?? '';

    $usuarioDao = new UsuarioDao();
    $usuario = $usuarioDao->validarLogin($numeroDoc, $contrasena, $rol);

    if ($usuario) {
        $_SESSION['nombre'] = $usuario['Primer_Nombre'];
        $_SESSION['rol'] = $usuario['rolPersona'];

        // Redirección según el rol
        $rolLower = strtolower($usuario['rolPersona']);
        switch ($rolLower) {
            case 'administrador':
                header("Location: Admin.php");
                break;
            case 'empleado':
                header("Location: Empleado.php");
                break;
            case 'cliente':
                header("Location: Usuario.php");
                break;
            default:
                header("Location: index.php");
        }
        exit();
    } else {
        // Redirección con error
        header("Location: Login.php?error=1");
        exit();
    }
}
?>