import React, { useState, useEffect } from "react";
import ActualizarDatosModal from "../modalesCompartidos/ModalActualizarDatos";
import CambiarPasswordModal from "../modalesCompartidos/ModalCambiarPassword";

const EmpleadoPage = () => {
  const [usuario, setUsuario] = useState(null);
  const [tareas, setTareas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const nombre = localStorage.getItem("Primer_Nombre");
    const apellido = localStorage.getItem("Primer_Apellido");

    if (nombre && apellido) {
      setUsuario({ nombre, apellido });
    }
  }, []);

  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const idPersona = localStorage.getItem("idPersona");

      const API_URL = "http://localhost:3001/api";

      const resTareas = await fetch(`${API_URL}/tarea/empleado/${idPersona}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      const dataTareas = await resTareas.json();
      setTareas(dataTareas.body || []);

      setLoading(false);
    } catch (error) {
      console.error("Error al cargar datos:", error);
      setTareas([]);
      setLoading(false);
    }
  };

  const getPrioridadColor = (prioridad) => {
    switch (prioridad) {
      case "Alta":
        return "#ee5666ff";
      case "Media":
        return "#ffd965ff";
      case "Baja":
        return "#54e075ff";
      default:
        return "#6c757d";
    }
  };

  const getEstadoColor = (estado) => {
    switch (estado) {
      case "Completada":
        return "#54e075ff";
      case "En Progreso":
        return "#ffd965ff";
      case "Pendiente":
        return "#ee5666ff";
      default:
        return "#6c757d";
    }
  };

  const actualizarEstadoTarea = async (idTarea, nuevoEstado) => {
    try {
      const token = localStorage.getItem("token");
      const API_URL = "http://localhost:3001/api";

      const response = await fetch(`${API_URL}/tarea/${idTarea}/estado`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ EstadoTarea: nuevoEstado }),
      });

      if (response.ok) {
        setTareas((prevTareas) =>
          prevTareas.map((tarea) =>
            tarea.idTarea === idTarea
              ? { ...tarea, EstadoTarea: nuevoEstado }
              : tarea
          )
        );
        cargarDatos();
      } else {
        alert("Error al actualizar el estado de la tarea");
      }
    } catch (error) {
      console.error("Error al actualizar estado:", error);
      alert("Error de conexión");
    }
  };

  return (
    <div>
      {/* BOTÓN HAMBURGUESA SOLO EN MÓVIL */}
      <nav className="navbar navbar-light d-md-none">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#sidebarMenu"
          >
            <span className="navbar-toggler-icon" />
          </button>
        </div>
      </nav>

      {/* CONTENEDOR PRINCIPAL */}
      <div className="d-flex flex-column text-white flex-md-row">
        {/* SIDEBAR */}
        <div
          className="sidebar collapse d-md-block p-3 text-white"
          id="sidebarMenu"
        >
          <div className="text-center text-white mb-4">
            <i className="bi bi-person-circle" style={{ fontSize: "3rem" }} />
            <h5 className="fw-bold mt-2">
              {usuario ? `${usuario.nombre} ${usuario.apellido}` : "Empleado"}
            </h5>
          </div>
          <ul className="nav flex-column text-center text-white">
            <li className="nav-item">
              <a
                href="#"
                className="nav-link custom-link"
                data-bs-toggle="modal"
                data-bs-target="#modalActualizarDatos"
              >
                Actualizar Datos
              </a>
            </li>
            <li className="nav-item">
              <a
                href="#"
                className="nav-link custom-link"
                data-bs-toggle="modal"
                data-bs-target="#modalCambiarPassword"
              >
                Cambiar Contraseña
              </a>
            </li>
          </ul>
        </div>

        {/* MAIN */}
        <main className="flex-grow-1 p-4 bg-light">
          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Cargando...</span>
              </div>
              <p className="mt-2">Cargando datos...</p>
            </div>
          ) : (
            <div className="row g-4 mb-4">
              <div className="col-12">
                <div className="card shadow-sm">
                  <div className="card-header d-flex justify-content-between align-items-center">
                    <span className="fw-bold">
                      <i className="bi bi-list-task me-2"></i>
                      Menú de Tareas
                    </span>
                    <button
                      className="btn btn-sm"
                      onClick={cargarDatos}
                      style={{
                        backgroundColor: "#7cbbe4ff",
                        color: "black",
                      }}
                    >
                      <i className="bi bi-arrow-clockwise me-1"></i>Actualizar
                    </button>
                  </div>
                  <div className="card-body table-responsive">
                    {tareas.length === 0 ? (
                      <div className="alert alert-info text-center">
                        <i className="bi bi-info-circle me-2"></i>No tienes
                        tareas asignadas
                      </div>
                    ) : (
                      <table className="table table-hover table-bordered align-middle text-center">
                        <thead className="table-light">
                          <tr>
                            <th>ID</th>
                            <th>Descripción</th>
                            <th>Fecha Asignación</th>
                            <th>Fecha Límite</th>
                            <th>Prioridad</th>
                            <th>Estado</th>
                          </tr>
                        </thead>
                        <tbody>
                          {tareas.map((tarea, index) => (
                            <tr key={tarea.idTarea || index}>
                              <td>{String(index + 1).padStart(3, "0")}</td>
                              <td className="text-start">
                                {tarea.Descripcion || "N/A"}
                              </td>
                              <td>
                                {tarea.FechaAsignacion
                                  ? new Date(
                                      tarea.FechaAsignacion
                                    ).toLocaleDateString("es-CO")
                                  : "N/A"}
                              </td>
                              <td>
                                {tarea.FechaLimite
                                  ? new Date(
                                      tarea.FechaLimite
                                    ).toLocaleDateString("es-CO")
                                  : "N/A"}
                              </td>
                              <td>
                                <span
                                  className="badge"
                                  style={{
                                    backgroundColor: getPrioridadColor(
                                      tarea.Prioridad
                                    ),
                                    color: "white",
                                  }}
                                >
                                  {tarea.Prioridad || "N/A"}
                                </span>
                              </td>
                              <td>
                                <select
                                  className="form-select form-select-sm"
                                  value={tarea.EstadoTarea || "Pendiente"}
                                  style={{
                                    backgroundColor: getEstadoColor(
                                      tarea.EstadoTarea
                                    ),
                                    color: "white",
                                    fontWeight: "bold",
                                    border: "none",
                                  }}
                                  onChange={(e) =>
                                    actualizarEstadoTarea(
                                      tarea.idTarea,
                                      e.target.value
                                    )
                                  }
                                >
                                  <option value="Pendiente">Pendiente</option>
                                  <option value="En Progreso">
                                    En proceso
                                  </option>
                                  <option value="Completada">Completada</option>
                                </select>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* MODALES */}
      <ActualizarDatosModal />
      <CambiarPasswordModal />
    </div>
  );
};

export default EmpleadoPage;
