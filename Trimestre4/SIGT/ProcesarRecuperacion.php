<?php
require_once 'conexion/conexion.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $doc = $_POST['NumeroDocumento'];
    $correo = $_POST['Correo'];

    try {
        $conn = Conexion::conectar();
        $sql = "SELECT * FROM persona WHERE NumeroDocumento = ? AND Correo = ?";
        $stmt = $conn->prepare($sql);
        $stmt->execute([$doc, $correo]);

        if ($stmt->rowCount() === 1) {
            // Redirige a formulario para cambiar contraseña
            header("Location: CambiarContraseña.php?doc=" . urlencode($doc));
            exit();
        } else {
            echo "<script>
              alert('Datos incorrectos. Verifica tu documento y correo.');
              window.location.href = 'OlvidoContrasena.php';
            </script>";
        }
    } catch (PDOException $e) {
        echo "Error: " . $e->getMessage();
    }
}
