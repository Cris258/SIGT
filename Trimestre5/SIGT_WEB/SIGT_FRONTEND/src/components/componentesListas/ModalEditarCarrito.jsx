import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function ModalEditarCarrito({ carrito, onClose, onGuardar }) {
  const [estado, setEstado] = useState(carrito.Estado);
  const [loading, setLoading] = useState(false);

  const handleGuardar = async () => {
    if (!estado) {
      alert("⚠️ Debes seleccionar un estado válido.");
      return;
    }

    setLoading(true);

    try {
      const token = localStorage.getItem("token"); // por si usas auth

      const response = await fetch(
        `http://localhost:3001/api/carrito/${carrito.idCarrito}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ Estado: estado }),
        }
      );

      const result = await response.json();
      console.log("📥 Respuesta del servidor:", result);

      if (response.ok) {
        alert("✅ Carrito actualizado correctamente");

        const carritoActualizado = { ...carrito, Estado: estado };
        onGuardar(carritoActualizado);
        onClose();
      } else {
        alert(result.message || "❌ Error al actualizar el carrito");
      }
    } catch (error) {
      console.error("💥 Error:", error);
      alert("Error de conexión con el servidor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="modal fade show"
      style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
      tabIndex="-1"
      role="dialog"
    >
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content shadow rounded-3">
          <div className="modal-header">
            <h5 className="modal-title">
              Editar Carrito #{carrito.idCarrito}
            </h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
              aria-label="Cerrar"
            ></button>
          </div>

          <div className="modal-body">
            {loading && (
              <div className="text-center mb-3">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Cargando...</span>
                </div>
              </div>
            )}

            <div className="mb-3">
              <label className="form-label">Estado</label>
              <select
                className="form-select"
                value={estado}
                onChange={(e) => setEstado(e.target.value)}
                disabled={loading}
              >
                <option value="">Seleccione un estado</option>
                <option value="Pendiente">Pendiente</option>
                <option value="Pagado">Pagado</option>
                <option value="Cancelado">Cancelado</option>
              </select>
            </div>
          </div>

          <div className="modal-footer">
            <button
              className="btn btn-secondary"
              onClick={onClose}
              disabled={loading}
            >
              Cancelar
            </button>
            <button
              className="btn btn-primary"
              onClick={handleGuardar}
              disabled={loading}
            >
              {loading ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    role="status"
                  ></span>
                  Guardando...
                </>
              ) : (
                "Guardar Cambios"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
