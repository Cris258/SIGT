import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function ModalEliminar({ 
  usuario, 
  onClose, 
  onConfirmar,
  tipoUsuario = "usuario"
}) {
  const [loading, setLoading] = useState(false);

  const handleEliminar = async () => {
    if (!usuario) return;

    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      console.log(`🗑️ Eliminando ${tipoUsuario}:`, usuario.idPersona);

      const response = await fetch(
        `http://localhost:3001/api/persona/${usuario.idPersona}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const result = await response.json();
      console.log("📥 Respuesta del servidor:", result);

      if (response.ok) {
        alert(`${tipoUsuario.charAt(0).toUpperCase() + tipoUsuario.slice(1)} eliminado correctamente`);
        onConfirmar(usuario);
        onClose();
      } else {
        alert(result.message || `Error al eliminar el ${tipoUsuario}`);
      }
    } catch (error) {
      console.error("💥 Error:", error);
      alert("Error de conexión. Por favor, intente nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  if (!usuario) return null;

  return (
    <div
      className="modal fade show"
      style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
      tabIndex="-1"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header bg-danger text-white">
            <h5 className="modal-title">
              <i className="bi bi-exclamation-triangle-fill me-2"></i>
              Confirmar Eliminación
            </h5>
            <button
              type="button"
              className="btn-close btn-close-white"
              onClick={onClose}
              aria-label="Cerrar"
              disabled={loading}
            ></button>
          </div>

          <div className="modal-body">
            <div className="alert alert-warning" role="alert">
              <strong>⚠️ Advertencia:</strong> Esta acción no se puede deshacer.
            </div>

            <p className="mb-3">
              ¿Está seguro que desea eliminar al {tipoUsuario}{" "}
              <strong>
                {usuario.Primer_Nombre} {usuario.Primer_Apellido}
              </strong>{" "}
              con documento{" "}
              <strong>{usuario.NumeroDocumento}</strong>?
            </p>

            <div className="card bg-light">
              <div className="card-body">
                <h6 className="card-subtitle mb-2 text-muted">
                  Información del {tipoUsuario}:
                </h6>
                <ul className="list-unstyled mb-0">
                  <li>
                    <strong>Nombre:</strong> {usuario.Primer_Nombre}{" "}
                    {usuario.Segundo_Nombre} {usuario.Primer_Apellido}{" "}
                    {usuario.Segundo_Apellido}
                  </li>
                  <li>
                    <strong>Documento:</strong> {usuario.TipoDocumento} -{" "}
                    {usuario.NumeroDocumento}
                  </li>
                  <li>
                    <strong>Correo:</strong> {usuario.Correo}
                  </li>
                  <li>
                    <strong>Teléfono:</strong> {usuario.Telefono}
                  </li>
                  {usuario.Rol?.NombreRol && (
                    <li>
                      <strong>Rol:</strong> {usuario.Rol.NombreRol}
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </div>

          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
              disabled={loading}
            >
              <i className="bi bi-x-circle me-1"></i>
              Cancelar
            </button>
            <button
              type="button"
              className="btn btn-danger"
              onClick={handleEliminar}
              disabled={loading}
            >
              {loading ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    role="status"
                  ></span>
                  Eliminando...
                </>
              ) : (
                <>
                  <i className="bi bi-trash-fill me-1"></i>
                  Eliminar
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}