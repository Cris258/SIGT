import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ActualizarDatosModal from "../modalesCompartidos/ModalActualizarDatos";
import CambiarPasswordModal from "../modalesCompartidos/ModalCambiarPassword";
import axios from "axios";
import { Chart } from "chart.js/auto";

const AdminPage = () => {
  const [usuario, setUsuario] = useState(null);
  const [empleados, setEmpleados] = useState([]);
  const [topEmpleados, setTopEmpleados] = useState([]);
  const [estadisticas, setEstadisticas] = useState(null);
  const [loading, setLoading] = useState(true);
  const [chartInstance, setChartInstance] = useState(null);

  useEffect(() => {
    const nombre = localStorage.getItem("Primer_Nombre");
    const apellido = localStorage.getItem("Primer_Apellido");

    if (nombre && apellido) {
      setUsuario({ nombre, apellido });
    }
  }, []);

  // Cargar datos al montar el componente
  useEffect(() => {
    cargarDatos();

    // Cleanup al desmontar
    return () => {
      if (chartInstance) {
        chartInstance.destroy();
      }
    };
  }, []);

  // Función para cargar todos los datos
  const cargarDatos = async () => {
    try {
      setLoading(true);

      // Obtener el token del localStorage
      const token = localStorage.getItem("token");

      // Configuración de headers con el token
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      // Backend corriendo en puerto 3001
      const API_URL = "http://localhost:3001/api";

      // Cargar empleados y tareas
      const resEmpleados = await axios.get(
        `${API_URL}/empleados-tareas`,
        config
      );
      setEmpleados(resEmpleados.data.data || []);

      // Cargar top empleados
      const resTop = await axios.get(`${API_URL}/top-empleados`, config);
      setTopEmpleados(resTop.data.data || []);

      // Cargar estadísticas
      const resStats = await axios.get(`${API_URL}/estadisticas`, config);
      setEstadisticas(resStats.data.data || null);

      setLoading(false);
    } catch (error) {
      console.error("Error al cargar datos:", error);
      if (error.response?.status === 401) {
        // Token inválido o expirado
        alert("Sesión expirada. Por favor, inicia sesión nuevamente.");
        // Redirigir al login si lo tienes configurado
        // window.location.href = '/login';
      }
      setLoading(false);
    }
  };

  // Crear gráfico de estadísticas
  useEffect(() => {
    if (
      estadisticas &&
      estadisticas.general &&
      estadisticas.general.length > 0
    ) {
      const ctx = document.getElementById("graficoTareas");
      if (ctx) {
        // Destruir gráfico anterior si existe
        if (chartInstance) {
          chartInstance.destroy();
        }

        // Preparar datos
        const labels = estadisticas.general.map((item) => item.EstadoTarea);
        const data = estadisticas.general.map((item) => item.Cantidad);
        const colors = {
          Completada: "#54e075ff",
          "En Progreso": "#ffd965ff",
          Pendiente: "#ee5666ff",
          Cancelada: "#6c757d",
        };
        const backgroundColors = labels.map(
          (label) => colors[label] || "#007bff"
        );

        // Crear nuevo gráfico
        const newChart = new Chart(ctx, {
          type: "doughnut",
          data: {
            labels: labels,
            datasets: [
              {
                data: data,
                backgroundColor: backgroundColors,
                borderWidth: 2,
                borderColor: "#fff",
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
              legend: {
                position: "bottom",
                labels: {
                  padding: 15,
                  font: {
                    size: 12,
                  },
                },
              },
              tooltip: {
                callbacks: {
                  label: function (context) {
                    const label = context.label || "";
                    const value = context.parsed || 0;
                    const total = context.dataset.data.reduce(
                      (a, b) => a + b,
                      0
                    );
                    const percentage = ((value / total) * 100).toFixed(1);
                    return `${label}: ${value} (${percentage}%)`;
                  },
                },
              },
            },
          },
        });

        setChartInstance(newChart);
      }
    }
  }, [estadisticas]);

  // Función para calcular porcentaje de progreso
  const calcularProgreso = (hechas, total) => {
    if (total === 0) return 0;
    return Math.round((hechas / total) * 100);
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
              {usuario
                ? `${usuario.nombre} ${usuario.apellido}`
                : "Administrador"}
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
            <li className="nav-item">
              <Link to="/RegistroUsuarios" className="nav-link custom-link">
                Registro de Usuarios
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/ListaUsuarios" className="nav-link custom-link">
                Listar Usuarios
              </Link>
            </li>
            <hr className="bg-light" />
            <li className="nav-item">
              <a href="admin" className="nav-link custom-link active">
                Empleados
              </a>
            </li>
            <li className="nav-item">
              <a href="adminInventario" className="nav-link custom-link">
                Inventario
              </a>
            </li>
            <li className="nav-item">
              <a href="AdminCliente" className="nav-link custom-link">
                Clientes
              </a>
            </li>
            <hr className="bg-light" />
            <li className="nav-item">
              <a href="ListarEmpleados" className="nav-link custom-link">
                Administrar Empleados
              </a>
            </li>
            <li className="nav-item">
              <a href="AsignarTareaAdmin" className="nav-link custom-link">
                Asignar Tarea
              </a>
            </li>
            <li className="nav-item">
              <a href="ListarTareas" className="nav-link custom-link">
                Administrar Tareas
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
            <>
              {/* TABLA PRINCIPAL */}
              <div className="row g-4 mb-4">
                <div className="col-12">
                  <div className="card shadow-sm">
                    <div className="card-header d-flex justify-content-between align-items-center">
                      <span className="fw-bold">
                        <i className="bi bi-people-fill me-2"></i>
                        Empleados y Tareas
                      </span>
                      <button
                        className="btn btn-sm"
                        onClick={cargarDatos}
                        style={{
                          backgroundColor: "#7cbbe4ff",
                          color: "black"
                        }}
                      >
                        <i className="bi bi-arrow-clockwise me-1"></i>Actualizar
                      </button>
                    </div>
                    <div className="card-body table-responsive">
                      {empleados.length === 0 ? (
                        <div className="alert alert-info text-center">
                          <i className="bi bi-info-circle me-2"></i>No hay
                          empleados registrados
                        </div>
                      ) : (
                        <table className="table table-hover table-bordered align-middle text-center">
                          <thead className="table-light">
                            <tr>
                              <th>ID</th>
                              <th>Empleado</th>
                              <th>Rol</th>
                              <th>Tareas Hechas</th>
                              <th>Pendientes</th>
                              <th>Total</th>
                              <th>Progreso</th>
                            </tr>
                          </thead>
                          <tbody>
                            {empleados.map((emp) => {
                              const progreso = calcularProgreso(
                                emp.TareasHechas,
                                emp.TotalTareas
                              );
                              return (
                                <tr key={emp.ID}>
                                  <td>{emp.ID}</td>
                                  <td className="text-start">
                                    <i className="bi bi-person-badge me-2"></i>
                                    {emp.Empleado}
                                  </td>
                                  <td>{emp.Rol}</td>
                                  <td>
                                    <span
                                      style={{
                                        backgroundColor: "#A8E6CF",
                                        padding: "4px 8px",
                                        borderRadius: "5px",
                                      }}
                                    >
                                      {emp.TareasHechas}
                                    </span>
                                  </td>
                                  <td>
                                    <span
                                      style={{
                                        backgroundColor: "#FFB6B9",
                                        padding: "4px 8px",
                                        borderRadius: "5px",
                                      }}
                                    >
                                      {emp.Pendientes}
                                    </span>
                                  </td>
                                  <td>
                                    <strong>{emp.TotalTareas}</strong>
                                  </td>
                                  <td>
                                    <div
                                      className="progress mx-auto"
                                      style={{ width: "100px", height: "20px" }}
                                    >
                                      <div
                                        className={`progress-bar ${
                                          progreso >= 75
                                            ? "bg-success"
                                            : progreso >= 50
                                            ? "bg-info"
                                            : progreso >= 25
                                            ? "bg-warning"
                                            : "bg-danger"
                                        }`}
                                        role="progressbar"
                                        style={{ width: `${progreso}%` }}
                                      >
                                        {progreso}%
                                      </div>
                                    </div>
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* FILA 2: ESTADÍSTICAS, TOP Y CALENDARIO */}
              <div className="row g-3 align-items-stretch text-center">
                {/* ESTADÍSTICAS */}
                <div className="col-12 col-lg-4 d-flex flex-column mb-3">
                  <div className="card shadow-sm h-100">
                    <div className="card-header fw-bold">
                      <i className="bi bi-bar-chart-fill me-2"></i>
                      Estadísticas de Tareas
                    </div>
                    <div className="card-body d-flex flex-column justify-content-center p-3">
                      {estadisticas &&
                      estadisticas.general &&
                      estadisticas.general.length > 0 ? (
                        <>
                          <div
                            className="mb-3"
                            style={{ maxWidth: "280px", margin: "0 auto" }}
                          >
                            <canvas id="graficoTareas"></canvas>
                          </div>
                          <div className="mt-2">
                            <div className="row text-start g-2">
                              {estadisticas.general.map((item, index) => (
                                <div key={index} className="col-12">
                                  <div
                                    className="d-flex justify-content-between align-items-center p-2 rounded"
                                    style={{ backgroundColor: "#e2e7e7ff" }}
                                  >
                                    <span className="d-flex align-items-center">
                                      <i
                                        className="bi bi-circle-fill me-2"
                                        style={{
                                          color:
                                            item.EstadoTarea === "Completada"
                                              ? "#54e075ff"
                                              : item.EstadoTarea ===
                                                "En Progreso"
                                              ? "#ffd965ff"
                                              : item.EstadoTarea === "Pendiente"
                                              ? "#ee5666ff"
                                              : "#6c757d",
                                          fontSize: "10px",
                                        }}
                                      ></i>
                                      <span className="small">
                                        {item.EstadoTarea}
                                      </span>
                                    </span>
                                    <span className="badge bg-secondary">
                                      {item.Cantidad}
                                    </span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </>
                      ) : (
                        <div className="alert alert-secondary mb-0">
                          <i className="bi bi-exclamation-circle me-2"></i>
                          No hay tareas registradas
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* TOP 5 EMPLEADOS */}
                <div className="col-12 col-lg-4 d-flex flex-column mb-3">
                  <div className="card shadow-sm h-100">
                    <div className="card-header fw-bold">
                      <i className="bi bi-trophy-fill me-2"></i>
                      Top 5 Empleados
                    </div>
                    <div
                      className="card-body p-2"
                      style={{ overflowY: "auto", maxHeight: "400px" }}
                    >
                      {topEmpleados.length === 0 ? (
                        <div className="alert alert-secondary mb-0">
                          <i className="bi bi-info-circle me-2"></i>
                          No hay datos suficientes
                        </div>
                      ) : (
                        <ol className="list-group list-group-numbered">
                          {topEmpleados.map((emp, index) => (
                            <li
                              key={emp.idPersona}
                              className="list-group-item d-flex justify-content-between align-items-start p-2 mb-2"
                            >
                              <div className="ms-2 me-auto text-start w-100">
                                <div className="fw-bold d-flex align-items-center mb-1">
                                  {index === 0 && (
                                    <i
                                      className="bi bi-trophy-fill text-warning me-1"
                                      style={{ fontSize: "1.1rem" }}
                                    ></i>
                                  )}
                                  {index === 1 && (
                                    <i className="bi bi-award-fill text-secondary me-1"></i>
                                  )}
                                  {index === 2 && (
                                    <i
                                      className="bi bi-award-fill text-danger me-1"
                                      style={{ opacity: 0.7 }}
                                    ></i>
                                  )}
                                  <span className="small">
                                    {emp.NombreEmpleado}
                                  </span>
                                </div>
                                <small className="text-muted d-block mb-2">
                                  {emp.NombreRol}
                                </small>
                                <div className="d-flex flex-wrap gap-1">
                                  <span
                                    className="badge bg-success"
                                    style={{ fontSize: "0.7rem" }}
                                    title="Completadas"
                                  >
                                    <i className="bi bi-check-circle"></i>{" "}
                                    {emp.TareasCompletadas}
                                  </span>
                                  <span
                                    className="badge bg-warning text-dark"
                                    style={{ fontSize: "0.7rem" }}
                                    title="En Progreso"
                                  >
                                    <i className="bi bi-hourglass-split"></i>{" "}
                                    {emp.TareasEnProgreso}
                                  </span>
                                  <span
                                    className="badge bg-danger"
                                    style={{ fontSize: "0.7rem" }}
                                    title="Pendientes"
                                  >
                                    <i className="bi bi-exclamation-circle"></i>{" "}
                                    {emp.TareasPendientes}
                                  </span>
                                </div>
                              </div>
                              <span
                                className="badge bg-primary rounded-pill align-self-center"
                                title="Score de Rendimiento"
                                style={{ fontSize: "0.85rem" }}
                              >
                                {emp.ScoreRendimiento}
                              </span>
                            </li>
                          ))}
                        </ol>
                      )}
                    </div>
                  </div>
                </div>

                {/* CALENDARIO */}
                <div className="col-12 col-lg-4 d-flex flex-column mb-3">
                  <div className="card shadow-sm h-100">
                    <div className="card-header fw-bold">
                      <span className="fw-bold">
                        <i className="bi bi-calendar-event me-2"></i>
                        Calendario
                      </span>
                    </div>
                    <div className="card-body p-0">
                      <iframe
                        src="https://calendar.google.com/calendar/embed?src=es.co%23holiday%40group.v.calendar.google.com&ctz=America%2FBogota&mode=MONTH&showTitle=0&showNav=1&showDate=1&showPrint=0&showTabs=0&showCalendars=0&showTz=0"
                        style={{ border: "0", borderRadius: "8px" }}
                        width="100%"
                        height="400"
                        frameBorder="0"
                        scrolling="no"
                        title="Calendario de Festivos Colombia"
                      ></iframe>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </main>
      </div>

      {/* MODALES */}
      <ActualizarDatosModal />
      <CambiarPasswordModal />
    </div>
  );
};

export default AdminPage;
