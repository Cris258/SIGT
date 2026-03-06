import React, { useState } from 'react';

const CerrarSesion = ({ className = "nav-link custom-link" }) => {
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    // Confirmación antes de cerrar sesión
    const confirmar = window.confirm('¿Está seguro de que desea cerrar sesión?');
    
    if (!confirmar) {
      return;
    }

    setLoading(true);

    try {
      // Llamada a tu endpoint de logout
      const response = await fetch('http://localhost:3001/api/persona/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      if (response.ok) {
        console.log('Sesión cerrada correctamente en el servidor');
      } else {
        console.warn('Error al cerrar sesión en el servidor, pero se limpiará el localStorage');
      }

    } catch (error) {
      console.error('Error de conexión al cerrar sesión:', error);

    } finally {
      limpiarSesionLocal();
    }
  };

  const limpiarSesionLocal = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('idPersona');
    localStorage.removeItem('rol');
    window.location.href = '/';
  };

  return (
    <button
      type="button"
      className={`btn btn-link p-0 ${className}`}
      onClick={handleLogout}
      disabled={loading}
      style={{
        textAlign: 'left',
        textDecoration: 'none',
        border: 'none',
        background: 'none',
        width: '100%'
      }}
    >
      {loading ? (
        <>
          <span className="spinner-border spinner-border-sm me-2" role="status"></span>
          Cerrando sesión...
        </>
      ) : (
        <>
          Cerrar Sesión
          <i className="bi bi-box-arrow-right ms-2"></i>
        </>
      )}
    </button>
  );
};

export default CerrarSesion;