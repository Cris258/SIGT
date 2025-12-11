<?php
class UsuarioDto {
    private $NumeroDocumento;
    private $TipoDocumento;
    private $Primer_Nombre;
    private $Segundo_Nombre;
    private $Primer_Apellido;
    private $Segundo_Apellido;
    private $rolPersona;
    private $Correo;
    private $Telefono;
    private $Contrasena;

    // Getters
    public function getNumeroDocumento() {
        return $this->NumeroDocumento;
    }

    public function getTipoDocumento() {
        return $this->TipoDocumento;
    }

    public function getPrimerNombre() {
        return $this->Primer_Nombre;
    }

    public function getSegundoNombre() {
        return $this->Segundo_Nombre;
    }

    public function getPrimerApellido() {
        return $this->Primer_Apellido;
    }

    public function getSegundoApellido() {
        return $this->Segundo_Apellido;
    }

    public function getRolPersona() {
        return $this->rolPersona;
    }

    public function getCorreo() {
        return $this->Correo;
    }

    public function getTelefono() {
        return $this->Telefono;
    }

    public function getContrasena() {
        return $this->Contrasena;
    }

    // Setters
    public function setNumeroDocumento($NumeroDocumento) {
        $this->NumeroDocumento = $NumeroDocumento;
    }

    public function setTipoDocumento($TipoDocumento) {
        $this->TipoDocumento = $TipoDocumento;
    }

    public function setPrimerNombre($Primer_Nombre) {
        $this->Primer_Nombre = $Primer_Nombre;
    }

    public function setSegundoNombre($Segundo_Nombre) {
        $this->Segundo_Nombre = $Segundo_Nombre;
    }

    public function setPrimerApellido($Primer_Apellido) {
        $this->Primer_Apellido = $Primer_Apellido;
    }

    public function setSegundoApellido($Segundo_Apellido) {
        $this->Segundo_Apellido = $Segundo_Apellido;
    }

    public function setRolPersona($rolPersona) {
        $this->rolPersona = $rolPersona;
    }

    public function setCorreo($Correo) {
        $this->Correo = $Correo;
    }

    public function setTelefono($Telefono) {
        $this->Telefono = $Telefono;
    }

    public function setContrasena($Contrasena) {
        $this->Contrasena = $Contrasena;
    }
}
?>