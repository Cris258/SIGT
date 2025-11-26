import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import ModalEditarUsuario from "../componentesListas/ModalEditarUsuario";
import ModalEliminar from "../componentesListas/ModalEliminarUsuario";

export default function ListarClientes() {
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [clienteSeleccionado, setClienteSeleccionado] = useState(null);
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
        if (!res.ok) throw new Error("Error al obtener Clientes");
        return res.json();
      })
      .then((data) => {
        // Filtrar solo clientes
        const soloClientes = data.body.filter(
          (persona) => persona.Rol?.NombreRol?.toLowerCase() === "cliente"
        );
        setClientes(soloClientes);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const abrirModalEditar = (cliente) => {
    setClienteSeleccionado(cliente);
    setMostrarModalEditar(true);
  };

  const cerrarModalEditar = () => {
    setMostrarModalEditar(false);
    setClienteSeleccionado(null);
  };

  const handleGuardarEdicion = (clienteActualizado) => {
    setClientes((prev) =>
      prev.map((c) =>
        c.idPersona === clienteActualizado.idPersona ? clienteActualizado : c
      )
    );
  };

  const abrirModalEliminar = (cliente) => {
    setClienteSeleccionado(cliente);
    setMostrarModalEliminar(true);
  };

  const cerrarModalEliminar = () => {
    setMostrarModalEliminar(false);
    setClienteSeleccionado(null);
  };

  const handleConfirmarEliminacion = (clienteEliminado) => {
    setClientes((prev) =>
      prev.filter((c) => c.idPersona !== clienteEliminado.idPersona)
    );
  };

  const clientesFiltrados = clientes.filter(
    (c) =>
      (c.NumeroDocumento?.toString() || "")
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      (c.TipoDocumento || "").toLowerCase().includes(search.toLowerCase()) ||
      (c.Primer_Nombre || "").toLowerCase().includes(search.toLowerCase()) ||
      (c.Segundo_Nombre || "").toLowerCase().includes(search.toLowerCase()) ||
      (c.Primer_Apellido || "").toLowerCase().includes(search.toLowerCase()) ||
      (c.Segundo_Apellido || "").toLowerCase().includes(search.toLowerCase()) ||
      (c.Telefono || "").toLowerCase().includes(search.toLowerCase()) ||
      (c.Correo || "").toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return <p className="text-center mt-5">Cargando clientes...</p>;
  }

  return (
    <div className="container mt-5 d-flex flex-column align-items-center">
      <h2 className="text-center mb-4 merriweather-font">
        Lista de Clientes Registrados
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
          {clientesFiltrados.length > 0 ? (
            clientesFiltrados.map((c) => (
              <tr key={c.idPersona}>
                <td>{c.idPersona}</td>
                <td>{c.NumeroDocumento}</td>
                <td>{c.TipoDocumento}</td>
                <td>{c.Primer_Nombre}</td>
                <td>{c.Segundo_Nombre}</td>
                <td>{c.Primer_Apellido}</td>
                <td>{c.Segundo_Apellido}</td>
                <td>{c.Rol?.NombreRol || "Sin rol"}</td>
                <td>{c.Telefono}</td>
                <td>{c.Correo}</td>
                <td>
                  <span
                    className={`badge ${
                      c.EstadoPersona_FK === 1 ? "bg-success" : "bg-danger"
                    }`}
                  >
                    {c.EstadoPersona_FK === 1 ? "Activo" : "Inactivo"}
                  </span>
                </td>
                <td>
                  <button
                    className="btn btn-outline-primary"
                    onClick={() => abrirModalEditar(c)}
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
                    onClick={() => abrirModalEliminar(c)}
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
                  : "No hay clientes registrados"}
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Modal de Editar */}
      {mostrarModalEditar && (
        <ModalEditarUsuario
          usuario={clienteSeleccionado}
          onClose={cerrarModalEditar}
          onGuardar={handleGuardarEdicion}
        />
      )}

      {/* Modal de Eliminar */}
      {mostrarModalEliminar && (
        <ModalEliminar
          usuario={clienteSeleccionado}
          onClose={cerrarModalEliminar}
          onConfirmar={handleConfirmarEliminacion}
          tipoUsuario="cliente"
        />
      )}
    </div>
  );
}
