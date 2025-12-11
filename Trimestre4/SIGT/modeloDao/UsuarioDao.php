<?php
require_once __DIR__ . '/../conexion/conexion.php';


class UsuarioDao extends Conexion
{

    public function registrarUsuario($usuarioDto)
    {
        $sql = "INSERT INTO persona 
        (NumeroDocumento, TipoDocumento, Primer_Nombre, Segundo_Nombre, Primer_Apellido, Segundo_Apellido, Correo, Telefono, Contrasena, rolPersona) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, SHA2(?, 256), ?)";

        try {
            $con = $this->conectar();
            $stmt = $con->prepare($sql);
            $stmt->execute([
                $usuarioDto->getNumeroDocumento(),
                $usuarioDto->getTipoDocumento(),
                $usuarioDto->getPrimerNombre(),
                $usuarioDto->getSegundoNombre(),
                $usuarioDto->getPrimerApellido(),
                $usuarioDto->getSegundoApellido(),
                $usuarioDto->getCorreo(),
                $usuarioDto->getTelefono(),
                $usuarioDto->getContrasena(),
                $usuarioDto->getRolPersona()
            ]);
            return true;
        } catch (PDOException $e) {
            echo "Error al registrar: " . $e->getMessage();
            return false;
        }
    }

    public function verificarCredenciales($numeroDoc, $contrasena)
    {
        $sql = "SELECT * FROM persona 
                WHERE NumeroDocumento = ? 
                AND Contrasena = SHA2(?, 256) 
                LIMIT 1";
        try {
            $con = $this->conectar();
            $stmt = $con->prepare($sql);
            $stmt->execute([$numeroDoc, $contrasena]);
            return $stmt->fetch(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            echo "Error al verificar usuario: " . $e->getMessage();
            return false;
        }
    }

    public function validarLogin($numeroDoc, $contrasena, $rol)
    {
        $cnn = Conexion::conectar();
        $sql = "SELECT * FROM persona WHERE NumeroDocumento = :doc AND Contrasena = SHA2(:pass, 256) AND rolPersona = :rol";
        $stmt = $cnn->prepare($sql);
        $stmt->bindParam(':doc', $numeroDoc);
        $stmt->bindParam(':pass', $contrasena);
        $stmt->bindParam(':rol', $rol);
        $stmt->execute();
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function listarUsuarios()
    {
        $sql = "SELECT * FROM persona ORDER BY NumeroDocumento";
        try {
            $con = $this->conectar();
            $stmt = $con->query($sql);
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            echo "Error al listar usuarios: " . $e->getMessage();
            return [];
        }
    }

    public function modificarUsuario($doc)
    {
        $sql = "SELECT * FROM persona WHERE NumeroDocumento = ?";
        $conn = $this->conectar();
        $stmt = $conn->prepare($sql);
        $stmt->execute([$doc]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function actualizarUsuario($datos)
    {
        $sql = "UPDATE persona SET Primer_Nombre=?, Segundo_Nombre=?, Primer_Apellido=?, Segundo_Apellido=?, Correo=?, Telefono=?, rolPersona=? WHERE NumeroDocumento=?";
        $conn = $this->conectar();
        $stmt = $conn->prepare($sql);
        return $stmt->execute([
            $datos['Primer_Nombre'],
            $datos['Segundo_Nombre'],
            $datos['Primer_Apellido'],
            $datos['Segundo_Apellido'],
            $datos['Correo'],
            $datos['Telefono'],
            $datos['rolPersona'],
            $datos['NumeroDocumento']
        ]);
    }

    public function eliminarUsuario($doc)
    {
        $sql = "DELETE FROM persona WHERE NumeroDocumento = ?";
        $conn = $this->conectar();
        $stmt = $conn->prepare($sql);
        return $stmt->execute([$doc]);
    }
}
