<?php
require_once 'conexion/conexion.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $doc = $_POST['NumeroDocumento'];
    $nueva = $_POST['nueva'];
    $confirmar = $_POST['confirmar'];

    if ($nueva !== $confirmar) {
        echo "<script>alert('Las contraseñas no coinciden.'); history.back();</script>";
        exit();
    }

    try {
        $conn = Conexion::conectar();
        $sql = "UPDATE persona SET Contrasena = SHA2(?, 256) WHERE NumeroDocumento = ?";
        $stmt = $conn->prepare($sql);
        $stmt->execute([$nueva, $doc]);

        echo "<script>
          alert('¡Contraseña actualizada con éxito!');
          window.location.href = 'index.php';
        </script>";
    } catch (PDOException $e) {
        echo "Error: " . $e->getMessage();
    }
}
