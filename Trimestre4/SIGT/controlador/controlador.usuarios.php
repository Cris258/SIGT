<?php
require_once '../conexion/conexion.php';
require_once '../modeloDto/UsuarioDto.php';
require_once '../modeloDao/UsuarioDao.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $usuarioDto = new UsuarioDto();

    $usuarioDto->setNumeroDocumento($_POST['NumeroDocumento'] ?? '');
    $usuarioDto->setTipoDocumento($_POST['TipoDocumento'] ?? '');
    $usuarioDto->setPrimerNombre($_POST['Primer_Nombre'] ?? '');
    $usuarioDto->setSegundoNombre($_POST['Segundo_Nombre'] ?? '');
    $usuarioDto->setPrimerApellido($_POST['Primer_Apellido'] ?? '');
    $usuarioDto->setSegundoApellido($_POST['Segundo_Apellido'] ?? '');
    $usuarioDto->setCorreo($_POST['Correo'] ?? '');
    $usuarioDto->setTelefono($_POST['Telefono'] ?? '');
    $usuarioDto->setContrasena($_POST['Contrasena'] ?? '');
    $usuarioDto->setRolPersona($_POST['rolPersona'] ?? '');

    $usuarioDao = new UsuarioDao();

    // Insertar en base de datos
    if ($usuarioDao->registrarUsuario($usuarioDto)) {
        header("Location: ../Registro.php?registro=exito");
        exit();
    } else {
        header("Location: ../Registro.php?registro=error");
        exit();
    }
} else {
    // Si acceden sin enviar POST
    header('Location: ../Registro.php');
    exit();
}