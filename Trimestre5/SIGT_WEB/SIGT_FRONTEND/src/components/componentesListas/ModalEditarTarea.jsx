import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function ModalEditarTarea({ tarea, onClose, onGuardar }) {
  const [empleados, setEmpleados] = useState([]);
  const [formData, setFormData] = useState({
    Descripcion: "",
    FechaAsignacion: "",
    FechaLimite: "",
    EstadoTarea: "Pendiente",
    Prioridad: "",
    Persona_FK: "",
  });

  useEffect(() => {
    // Cargar empleados
    const fetchEmpleados = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:3001/api/persona", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        const soloEmpleados = data.body.filter(
          (persona) => persona.Rol?.NombreRol?.toLowerCase() === "empleado"
        );
        setEmpleados(soloEmpleados);
      } catch (error) {
        console.error("Error al obtener empleados:", error);
      }
    };

    fetchEmpleados();

    // Cargar datos de la tarea
    if (tarea) {
      setFormData({
        Descripcion: tarea.Descripcion || "",
        FechaAsignacion: tarea.FechaAsignacion?.split("T")[0] || "",
        FechaLimite: tarea.FechaLimite?.split("T")[0] || "",
        EstadoTarea: tarea.EstadoTarea || "Pendiente",
        Prioridad: tarea.Prioridad || "",
        Persona_FK: tarea.Persona_FK || "",
      });
    }
  }, [tarea]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.FechaLimite < formData.FechaAsignacion) {
      alert("La fecha límite no puede ser anterior a la fecha de asignación");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:3001/api/tarea/${tarea.idTarea}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        alert("Tarea actualizada exitosamente ✅");
        onGuardar({ ...tarea, ...formData });
        onClose();
      } else {
        const error = await response.json();
        alert("Error al actualizar: " + (error.Message || "Error desconocido"));
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error de conexión ❌");
    }
  };

  return (
    <div
      className="modal fade show d-block"
      tabIndex="-1"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Editar Tarea</h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
            ></button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              {/* Descripción */}
              <div className="mb-3">
                <label htmlFor="descripcion" className="form-label">
                  Descripción de la Tarea
                </label>
                <textarea
                  className="form-control"
                  id="descripcion"
                  name="Descripcion"
                  rows="4"
                  value={formData.Descripcion}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="row">
                {/* Fecha Asignación */}
                <div className="col-md-6 mb-3">
                  <label htmlFor="fechaAsignacion" className="form-label">
                    Fecha de Asignación
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="fechaAsignacion"
                    name="FechaAsignacion"
                    value={formData.FechaAsignacion}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Fecha Límite */}
                <div className="col-md-6 mb-3">
                  <label htmlFor="fechaLimite" className="form-label">
                    Fecha Límite
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="fechaLimite"
                    name="FechaLimite"
                    min={formData.FechaAsignacion}
                    value={formData.FechaLimite}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="row">
                {/* Prioridad */}
                <div className="col-md-6 mb-3">
                  <label htmlFor="prioridad" className="form-label">
                    Prioridad
                  </label>
                  <select
                    className="form-select"
                    id="prioridad"
                    name="Prioridad"
                    value={formData.Prioridad}
                    onChange={handleChange}
                    required
                  >
                    <option value="" disabled>
                      Seleccione una prioridad
                    </option>
                    <option value="Alta">🔴 Alta</option>
                    <option value="Media">🟡 Media</option>
                    <option value="Baja">🟢 Baja</option>
                  </select>
                </div>

                {/* Estado */}
                <div className="col-md-6 mb-3">
                  <label htmlFor="estadoTarea" className="form-label">
                    Estado
                  </label>
                  <select
                    className="form-select"
                    id="estadoTarea"
                    name="EstadoTarea"
                    value={formData.EstadoTarea}
                    onChange={handleChange}
                    required
                  >
                    <option value="Pendiente">Pendiente</option>
                    <option value="En Progreso">En Progreso</option>
                    <option value="Completada">Completada</option>
                  </select>
                </div>
              </div>

              {/* Empleado */}
              <div className="mb-3">
                <label htmlFor="empleado" className="form-label">
                  Asignar a Empleado
                </label>
                <select
                  className="form-select"
                  id="empleado"
                  name="Persona_FK"
                  value={formData.Persona_FK}
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled>
                    Seleccione un empleado
                  </option>
                  {empleados.map((empleado) => (
                    <option key={empleado.idPersona} value={empleado.idPersona}>
                      {empleado.Primer_Nombre} {empleado.Segundo_Nombre || ""}{" "}
                      {empleado.Primer_Apellido} {empleado.Segundo_Apellido || ""}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={onClose}
              >
                Cancelar
              </button>
              <button type="submit" className="btn btn-primary">
                Guardar Cambios
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}