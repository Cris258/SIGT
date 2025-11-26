import React, { useState, useEffect } from "react";

import Swal from "sweetalert2";

function AsignarTareas() {
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
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "No se pudieron obtener los empleados",
          confirmButtonColor: "#d33",
        });
      }
    };
    fetchEmpleados();

    const hoy = new Date().toISOString().split("T")[0];
    setFormData((prev) => ({ ...prev, FechaAsignacion: hoy }));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.FechaLimite < formData.FechaAsignacion) {
      Swal.fire({
        icon: "warning",
        title: "Fecha inválida",
        text: "La fecha límite no puede ser anterior a la fecha de asignación",
        confirmButtonColor: "#f39c12",
      });
      return;
    }

    const envio = { ...formData };

    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:3001/api/tarea", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(envio),
      });

      const data = await response.json();
      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: "Tarea asignada",
          text: "La tarea se asignó exitosamente ✅",
          confirmButtonColor: "#3085d6",
        });

        const fechaAsignacion = formData.FechaAsignacion;
        setFormData({
          Descripcion: "",
          FechaAsignacion: fechaAsignacion,
          FechaLimite: "",
          EstadoTarea: "Pendiente", 
          Prioridad: "",
          Persona_FK: "",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: data.Message || "No se pudo asignar la tarea",
          confirmButtonColor: "#d33",
        });
      }
    } catch (error) {
      console.error("Error al asignar tarea:", error);
      Swal.fire({
        icon: "error",
        title: "Error de conexión",
        text: "No se pudo conectar con el servidor ❌",
        confirmButtonColor: "#d33",
      });
    }  
  };



  return (
    <>
      <section className="container">
        <div className="card shadow-lg border-0 overflow-hidden">
          <div className="row text-center align-items-stretch">
            {/* Formulario */}
            <div className="col-md-8 d-flex flex-column align-items-center justify-content-center my-5">
              <form onSubmit={handleSubmit}>
                <p className="parrafo fs-5 text-black merriweather-font text-center">
                  ¡Vibra Positiva Pijamas!
                  <br />
                  Asigna una nueva tarea a un empleado.
                </p>

                {/* Descripción */}
                <div className="mb-3 text-start w-100">
                  <label htmlFor="descripcion" className="form-label">
                    Descripción de la Tarea
                  </label>
                  <textarea
                    className="form-control"
                    id="descripcion"
                    name="Descripcion"
                    rows="4"
                    placeholder="Describe la tarea a realizar..."
                    required
                    value={formData.Descripcion}
                    onChange={handleChange}
                  />
                </div>

                {/* Fecha Asignación */}
                <div className="mb-3 text-start w-100">
                  <label htmlFor="fechaAsignacion" className="form-label">
                    Fecha de Asignación
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="fechaAsignacion"
                    name="FechaAsignacion"
                    required
                    value={formData.FechaAsignacion}
                    onChange={handleChange}
                  />
                </div>

                {/* Fecha Límite */}
                <div className="mb-3 text-start w-100">
                  <label htmlFor="fechaLimite" className="form-label">
                    Fecha Límite
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="fechaLimite"
                    name="FechaLimite"
                    required
                    min={formData.FechaAsignacion}
                    value={formData.FechaLimite}
                    onChange={handleChange}
                  />
                </div>

                {/* Prioridad */}
                <div className="mb-3 text-start w-100">
                  <label htmlFor="prioridad" className="form-label">
                    Prioridad
                  </label>
                  <select
                    className="form-select"
                    id="prioridad"
                    name="Prioridad"
                    required
                    value={formData.Prioridad}
                    onChange={handleChange}
                  >
                    <option value="" disabled>
                      Seleccione una prioridad
                    </option>
                    <option value="Alta">
                      🔴 Alta
                    </option>
                    <option value="Media">
                      🟡 Media
                    </option>
                    <option value="Baja">
                      🟢 Baja
                    </option>
                  </select>
                </div>

                {/* Empleado */}
                <div className="mb-3 text-start w-100">
                  <label htmlFor="empleado" className="form-label">
                    Asignar a Empleado
                  </label>
                  <select
                    className="form-select"
                    id="empleado"
                    name="Persona_FK"
                    required
                    value={formData.Persona_FK}
                    onChange={handleChange}
                  >
                    <option value="" disabled>
                      Seleccione un empleado
                    </option>
                    {empleados.length > 0 ? (
                      empleados.map((empleado) => (
                        <option key={empleado.idPersona} value={empleado.idPersona}>
                          {empleado.Primer_Nombre} {empleado.Segundo_Nombre || ""} {empleado.Primer_Apellido} {empleado.Segundo_Apellido || ""}
                        </option>
                      ))
                    ) : (
                      <option disabled>No hay empleados disponibles</option>
                    )}
                  </select>
                  {empleados.length === 0 && (
                    <small className="text-muted">
                      No se encontraron empleados registrados
                    </small>
                  )}
                </div>

                {/* Botón */}
                <div className="d-grid mt-5">
                  <button type="submit" className="boton">
                    Asignar Tarea
                  </button>
                </div>
              </form>
            </div>

            {/* Imagen lateral */}
            <div className="col-md-4 img-col">
              <img src="img/Logo Vibra Positiva.jpg" alt="Registro" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default AsignarTareas;