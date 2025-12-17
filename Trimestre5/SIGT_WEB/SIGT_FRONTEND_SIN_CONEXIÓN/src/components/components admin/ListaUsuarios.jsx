import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

export default function ListaUsuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);
  const [accion, setAccion] = useState(""); // "editar" o "eliminar"

  // Llamada al backend en Node con GET
  useEffect(() => {
    fetch("http://localhost:3000/api/usuarios") // Cambia la URL a la de tu backend
      .then((res) => {
        if (!res.ok) throw new Error("Error al obtener usuarios");
        return res.json();
      })
      .then((data) => {
        setUsuarios(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  // Abrir modal
  const abrirModal = (usuario, tipoAccion) => {
    setUsuarioSeleccionado(usuario);
    setAccion(tipoAccion);
    const modal = new window.bootstrap.Modal(
      document.getElementById("modalAccion")
    );
    modal.show();
  };

  // Confirmar acción
  const confirmarAccion = () => {
    if (accion === "eliminar") {
      setUsuarios((prev) =>
        prev.filter((u) => u.NumeroDocumento !== usuarioSeleccionado.NumeroDocumento)
      );
    } else if (accion === "editar") {
      alert("Aquí podrías implementar el formulario de edición.");
    }
    setUsuarioSeleccionado(null);
  };

  if (loading) {
    return <p className="text-center mt-5">Cargando usuarios...</p>;
  }

  return (
    <div className="container mt-5 d-flex flex-column align-items-center">
      <h2 className="text-center mb-4 merriweather-font">
        Lista de Usuarios Registrados
      </h2>

      <table className="table table-striped table-hover table-bordered table-responsive mt-6 w-auto text-center">
        <thead className="table-dark">
          <tr>
            <th>Numero Documento</th>
            <th>Tipo Documento</th>
            <th>Primer Nombre</th>
            <th>Segundo Nombre</th>
            <th>Primer Apellido</th>
            <th>Segundo Apellido</th>
            <th>Correo</th>
            <th>Teléfono</th>
            <th>Rol</th>
            <th>Modificar</th>
            <th>Eliminar</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.length > 0 ? (
            usuarios.map((u) => (
              <tr key={u.NumeroDocumento}>
                <td>{u.NumeroDocumento}</td>
                <td>{u.TipoDocumento}</td>
                <td>{u.Primer_Nombre}</td>
                <td>{u.Segundo_Nombre}</td>
                <td>{u.Primer_Apellido}</td>
                <td>{u.Segundo_Apellido}</td>
                <td>{u.Correo}</td>
                <td>{u.Telefono}</td>
                <td>{u.rolPersona}</td>
                <td>
                  <button
                    className="btn btn-outline-primary"
                    onClick={() => abrirModal(u, "editar")}
                  >
                    <img
                      src="img/editar3.png"
                      width="30"
                      height="30"
                      alt="Editar"
                    />
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-outline-danger"
                    onClick={() => abrirModal(u, "eliminar")}
                  >
                    <img
                      src="img/eliminar2.png"
                      width="30"
                      height="30"
                      alt="Eliminar"
                    />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="11" className="text-center">
                No hay usuarios registrados
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Modal */}
      <div
        className="modal fade"
        id="modalAccion"
        tabIndex="-1"
        aria-labelledby="modalAccionLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="modalAccionLabel">
                {accion === "eliminar"
                  ? "Confirmar Eliminación"
                  : "Editar Usuario"}
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Cerrar"
              ></button>
            </div>
            <div className="modal-body">
              {accion === "eliminar" ? (
                <p>
                  ¿Seguro que deseas eliminar al usuario{" "}
                  <strong>{usuarioSeleccionado?.Primer_Nombre}</strong> con
                  documento <strong>{usuarioSeleccionado?.NumeroDocumento}</strong>?
                </p>
              ) : (
                <p>
                  Aquí podrías cargar un formulario para editar los datos de{" "}
                  <strong>{usuarioSeleccionado?.Primer_Nombre}</strong>.
                </p>
              )}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cancelar
              </button>
              <button
                type="button"
                className={`btn ${
                  accion === "eliminar" ? "btn-danger" : "btn-primary"
                }`}
                data-bs-dismiss="modal"
                onClick={confirmarAccion}
              >
                {accion === "eliminar" ? "Eliminar" : "Guardar"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
