import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import ModalEditarTarea from "../componentesListas/ModalEditarTarea";
import ModalEliminarTarea from "../componentesListas/ModalEliminarTarea";

export default function ListaTareas() {
  const [tareas, setTareas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tareaSeleccionada, setTareaSeleccionada] = useState(null);
  const [search, setSearch] = useState("");
  const [mostrarModalEditar, setMostrarModalEditar] = useState(false);
  const [mostrarModalEliminar, setMostrarModalEliminar] = useState(false);

  useEffect(() => {
    cargarTareas();
  }, []);

  const cargarTareas = () => {
    const token = localStorage.getItem("token");

    fetch("http://localhost:3001/api/tarea", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Error al obtener tareas");
        return res.json();
      })
      .then((data) => {
        setTareas(data.body || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  const abrirModalEditar = (tarea) => {
    setTareaSeleccionada(tarea);
    setMostrarModalEditar(true);
  };

  const cerrarModalEditar = () => {
    setMostrarModalEditar(false);
    setTareaSeleccionada(null);
  };

  const handleGuardarEdicion = (tareaActualizada) => {
    setTareas((prev) =>
      prev.map((t) =>
        t.idTarea === tareaActualizada.idTarea ? tareaActualizada : t
      )
    );
    cargarTareas();
  };

  const abrirModalEliminar = (tarea) => {
    setTareaSeleccionada(tarea);
    setMostrarModalEliminar(true);
  };

  const cerrarModalEliminar = () => {
    setMostrarModalEliminar(false);
    setTareaSeleccionada(null);
  };

  const handleConfirmarEliminacion = (tareaEliminada) => {
    setTareas((prev) =>
      prev.filter((t) => t.idTarea !== tareaEliminada.idTarea)
    );
    cargarTareas();
  };

  const getPrioridadColor = (prioridad) => {
    switch (prioridad) {
      case "Alta":
        return "bg-danger";
      case "Media":
        return "bg-warning";
      case "Baja":
        return "bg-success";
      default:
        return "bg-secondary";
    }
  };

  const getEstadoColor = (estado) => {
    switch (estado) {
      case "Completada":
        return "bg-success";
      case "En Progreso":
        return "bg-warning";
      case "Pendiente":
        return "bg-danger";
      default:
        return "bg-secondary";
    }
  };

  const tareasFiltradas = tareas.filter(
    (t) =>
      (t.Descripcion || "").toLowerCase().includes(search.toLowerCase()) ||
      (t.Prioridad || "").toLowerCase().includes(search.toLowerCase()) ||
      (t.EstadoTarea || "").toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return <p className="text-center mt-5">Cargando tareas...</p>;
  }

  return (
    <div className="container mt-5 d-flex flex-column align-items-center">
      <h2 className="text-center mb-4 merriweather-font">
        Lista de Tareas Asignadas
      </h2>

      {/* Buscador */}
      <div className="row mb-3 w-100">
        <div className="col-12 col-md-6 mx-auto">
          <input
            type="text"
            className="form-control"
            placeholder="Buscar por descripción, prioridad, estado..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="table-responsive w-100">
        <table className="table table-striped table-hover table-bordered text-center">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Descripción</th>
              <th>Fecha Asignación</th>
              <th>Fecha Límite</th>
              <th>Prioridad</th>
              <th>Estado</th>
              <th>Empleado</th>
              <th>Modificar</th>
              <th>Eliminar</th>
            </tr>
          </thead>
          <tbody>
            {tareasFiltradas.length > 0 ? (
              tareasFiltradas.map((t, index) => (
                <tr key={t.idTarea}>
                  <td>{String(index + 1).padStart(3, "0")}</td>
                  <td className="text-start">{t.Descripcion}</td>
                  <td>
                    {t.FechaAsignacion
                      ? new Date(t.FechaAsignacion).toLocaleDateString("es-CO")
                      : "N/A"}
                  </td>
                  <td>
                    {t.FechaLimite
                      ? new Date(t.FechaLimite).toLocaleDateString("es-CO")
                      : "N/A"}
                  </td>
                  <td>
                    <span className={`badge ${getPrioridadColor(t.Prioridad)}`}>
                      {t.Prioridad || "N/A"}
                    </span>
                  </td>
                  <td>
                    <span className={`badge ${getEstadoColor(t.EstadoTarea)}`}>
                      {t.EstadoTarea || "N/A"}
                    </span>
                  </td>
                  <td>{t.Persona_FK || "N/A"}</td>
                  <td>
                    <button
                      className="btn btn-outline-primary"
                      onClick={() => abrirModalEditar(t)}
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
                      onClick={() => abrirModalEliminar(t)}
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
                <td colSpan="9" className="text-center">
                  {search
                    ? "No se encontraron resultados"
                    : "No hay tareas registradas"}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal de Editar */}
      {mostrarModalEditar && (
        <ModalEditarTarea
          tarea={tareaSeleccionada}
          onClose={cerrarModalEditar}
          onGuardar={handleGuardarEdicion}
        />
      )}

      {/* Modal de Eliminar */}
      {mostrarModalEliminar && (
        <ModalEliminarTarea
          tarea={tareaSeleccionada}
          onClose={cerrarModalEliminar}
          onConfirmar={handleConfirmarEliminacion}
        />
      )}
    </div>
  );
}