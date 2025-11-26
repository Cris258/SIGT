import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import ModalEditarUsuario from "../componentesListas/ModalEditarUsuario";
import ModalEliminar from "../componentesListas/ModalEliminarUsuario";

export default function ListaEmpleados() {
  const [empleados, setEmpleados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [empleadoSeleccionado, setEmpleadoSeleccionado] = useState(null);
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
        if (!res.ok) throw new Error("Error al obtener Empleados");
        return res.json();
      })
      .then((data) => {
        // Filtrar solo empleados
        const soloEmpleados = data.body.filter(
          (persona) => persona.Rol?.NombreRol?.toLowerCase() === "empleado"
        );
        setEmpleados(soloEmpleados);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const abrirModalEditar = (empleado) => {
    setEmpleadoSeleccionado(empleado);
    setMostrarModalEditar(true);
  };

  const cerrarModalEditar = () => {
    setMostrarModalEditar(false);
    setEmpleadoSeleccionado(null);
  };

  const handleGuardarEdicion = (empleadoActualizado) => {
    setEmpleados((prev) =>
      prev.map((e) =>
        e.idPersona === empleadoActualizado.idPersona ? empleadoActualizado : e
      )
    );
  };

  const abrirModalEliminar = (empleado) => {
    setEmpleadoSeleccionado(empleado);
    setMostrarModalEliminar(true);
  };

  const cerrarModalEliminar = () => {
    setMostrarModalEliminar(false);
    setEmpleadoSeleccionado(null);
  };

  const handleConfirmarEliminacion = (empleadoEliminado) => {
    setEmpleados((prev) =>
      prev.filter((e) => e.idPersona !== empleadoEliminado.idPersona)
    );
  };

  const empleadosFiltrados = empleados.filter(
    (e) =>
      (e.NumeroDocumento?.toString() || "")
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      (e.TipoDocumento || "").toLowerCase().includes(search.toLowerCase()) ||
      (e.Primer_Nombre || "").toLowerCase().includes(search.toLowerCase()) ||
      (e.Segundo_Nombre || "").toLowerCase().includes(search.toLowerCase()) ||
      (e.Primer_Apellido || "").toLowerCase().includes(search.toLowerCase()) ||
      (e.Segundo_Apellido || "").toLowerCase().includes(search.toLowerCase()) ||
      (e.Telefono || "").toLowerCase().includes(search.toLowerCase()) ||
      (e.Correo || "").toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return <p className="text-center mt-5">Cargando empleados...</p>;
  }

  return (
    <div className="container mt-5 d-flex flex-column align-items-center">
      <h2 className="text-center mb-4 merriweather-font">
        Lista de Empleados Registrados
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
          {empleadosFiltrados.length > 0 ? (
            empleadosFiltrados.map((e) => (
              <tr key={e.idPersona}>
                <td>{e.idPersona}</td>
                <td>{e.NumeroDocumento}</td>
                <td>{e.TipoDocumento}</td>
                <td>{e.Primer_Nombre}</td>
                <td>{e.Segundo_Nombre}</td>
                <td>{e.Primer_Apellido}</td>
                <td>{e.Segundo_Apellido}</td>
                <td>{e.Rol?.NombreRol || "Sin rol"}</td>
                <td>{e.Telefono}</td>
                <td>{e.Correo}</td>
                <td>
                  <span
                    className={`badge ${
                      e.EstadoPersona_FK === 1 ? "bg-success" : "bg-danger"
                    }`}
                  >
                    {e.EstadoPersona_FK === 1 ? "Activo" : "Inactivo"}
                  </span>
                </td>
                <td>
                  <button
                    className="btn btn-outline-primary"
                    onClick={() => abrirModalEditar(e)}
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
                    onClick={() => abrirModalEliminar(e)}
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
                  : "No hay empleados registrados"}
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Modal de Editar */}
      {mostrarModalEditar && (
        <ModalEditarUsuario
          usuario={empleadoSeleccionado}
          onClose={cerrarModalEditar}
          onGuardar={handleGuardarEdicion}
        />
      )}

      {/* Modal de Eliminar */}
      {mostrarModalEliminar && (
        <ModalEliminar
          usuario={empleadoSeleccionado}
          onClose={cerrarModalEliminar}
          onConfirmar={handleConfirmarEliminacion}
          tipoUsuario="empleado"
        />
      )}
    </div>
  );
}