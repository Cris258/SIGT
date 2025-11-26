import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import ModalEditarUsuario from "../componentesListas/ModalEditarUsuario";
import ModalEliminar from "../componentesListas/ModalEliminarUsuario";

export default function ListaUsuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);
  const [search, setSearch] = useState("");
  const [mostrarModalEditar, setMostrarModalEditar] = useState(false);
  const [mostrarModalEliminar, setMostrarModalEliminar] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch("http://localhost:3001/api/persona", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Error al obtener usuarios");
        return res.json();
      })
      .then((data) => {
        setUsuarios(data.body);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const abrirModalEditar = (usuario) => {
    setUsuarioSeleccionado(usuario);
    setMostrarModalEditar(true);
  };

  const cerrarModalEditar = () => {
    setMostrarModalEditar(false);
    setUsuarioSeleccionado(null);
  };

  const handleGuardarEdicion = (usuarioActualizado) => {
    setUsuarios((prev) =>
      prev.map((u) =>
        u.idPersona === usuarioActualizado.idPersona ? usuarioActualizado : u
      )
    );
  };

  const abrirModalEliminar = (usuario) => {
    setUsuarioSeleccionado(usuario);
    setMostrarModalEliminar(true);
  };

  const cerrarModalEliminar = () => {
    setMostrarModalEliminar(false);
    setUsuarioSeleccionado(null);
  };

  const handleConfirmarEliminacion = (usuarioEliminado) => {
    setUsuarios((prev) =>
      prev.filter((u) => u.idPersona !== usuarioEliminado.idPersona)
    );
  };

  const usuariosFiltrados = usuarios.filter(
    (u) =>
      (u.NumeroDocumento?.toString() || "")
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      (u.TipoDocumento || "").toLowerCase().includes(search.toLowerCase()) ||
      (u.Primer_Nombre || "").toLowerCase().includes(search.toLowerCase()) ||
      (u.Segundo_Nombre || "").toLowerCase().includes(search.toLowerCase()) ||
      (u.Primer_Apellido || "").toLowerCase().includes(search.toLowerCase()) ||
      (u.Segundo_Apellido || "").toLowerCase().includes(search.toLowerCase()) ||
      (u.Rol?.NombreRol || "").toLowerCase().includes(search.toLowerCase()) ||
      (u.Telefono || "").toLowerCase().includes(search.toLowerCase()) ||
      (u.Correo || "").toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return <p className="text-center mt-5">Cargando usuarios...</p>;
  }

  return (
    <div className="container mt-5 d-flex flex-column align-items-center">
      <h2 className="text-center mb-4 merriweather-font">
        Lista de Usuarios Registrados
      </h2>

      {/* Buscador */}
      <div className="row mb-3 w-100">
        <div className="col-12 col-md-6 mx-auto">
          <input
            type="text"
            className="form-control"
            placeholder="Buscar por nombre, correo, documento..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <table className="table table-striped table-hover table-bordered table-responsive mt-3 w-auto text-center">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Numero Documento</th>
            <th>Tipo Documento</th>
            <th>Primer Nombre</th>
            <th>Segundo Nombre</th>
            <th>Primer Apellido</th>
            <th>Segundo Apellido</th>
            <th>Rol</th>
            <th>Teléfono</th>
            <th>Correo</th>
            <th>Estado</th>
            <th>Modificar</th>
            <th>Eliminar</th>
          </tr>
        </thead>
        <tbody>
          {usuariosFiltrados.length > 0 ? (
            usuariosFiltrados.map((u) => (
              <tr key={u.idPersona}>
                <td>{u.idPersona}</td>
                <td>{u.NumeroDocumento}</td>
                <td>{u.TipoDocumento}</td>
                <td>{u.Primer_Nombre}</td>
                <td>{u.Segundo_Nombre}</td>
                <td>{u.Primer_Apellido}</td>
                <td>{u.Segundo_Apellido}</td>
                <td>{u.Rol?.NombreRol || "Sin rol"}</td>
                <td>{u.Telefono}</td>
                <td>{u.Correo}</td>
                <td>
                  <span
                    className={`badge ${
                      u.EstadoPersona_FK === 1 ? "bg-success" : "bg-danger"
                    }`}
                  >
                    {u.EstadoPersona_FK === 1 ? "Activo" : "Inactivo"}
                  </span>
                </td>
                <td>
                  <button
                    className="btn btn-outline-primary"
                    onClick={() => abrirModalEditar(u)}
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
                    onClick={() => abrirModalEliminar(u)}
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
              <td colSpan="13" className="text-center">
                {search
                  ? "No se encontraron resultados"
                  : "No hay usuarios registrados"}
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Modal de Editar */}
      {mostrarModalEditar && (
        <ModalEditarUsuario
          usuario={usuarioSeleccionado}
          onClose={cerrarModalEditar}
          onGuardar={handleGuardarEdicion}
        />
      )}

      {/* Modal de Eliminar */}
      {mostrarModalEliminar && (
        <ModalEliminar
          usuario={usuarioSeleccionado}
          onClose={cerrarModalEliminar}
          onConfirmar={handleConfirmarEliminacion}
          tipoUsuario="usuario"
        />
      )}
    </div>
  );
}
