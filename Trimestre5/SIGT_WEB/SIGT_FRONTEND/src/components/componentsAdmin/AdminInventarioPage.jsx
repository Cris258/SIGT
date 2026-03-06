import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ActualizarDatosModal from "../modalesCompartidos/ModalActualizarDatos";
import CambiarPasswordModal from "../modalesCompartidos/ModalCambiarPassword";
import axios from "axios";
import { Chart } from "chart.js/auto";

export default function AdminInventarioPage() {
  const [usuario, setUsuario] = useState(null);
  const [productos, setProductos] = useState([]);
  const [topProductos, setTopProductos] = useState([]);
  const [estadisticas, setEstadisticas] = useState(null);
  const [loading, setLoading] = useState(true);
  const [chartInstance, setChartInstance] = useState(null);

  // Mapa de colores en español a códigos hexadecimales
  const colorMap = {
    rojo: "#ff0000",
    azul: "#0000ff",
    verde: "#00ff00",
    amarillo: "#ffff00",
    negro: "#000000",
    blanco: "#ffffff",
    gris: "#808080",
    rosa: "#ffc0cb",
    morado: "#800080",
    naranja: "#ffa500",
    cafe: "#8b4513",
    café: "#8b4513",
    beige: "#f5f5dc",
    celeste: "#87ceeb",
    turquesa: "#40e0d0",
    violeta: "#ee82ee",
    fucsia: "#ff00ff",
    marino: "#000080",
    vino: "#722f37",
    crema: "#fffdd0",
  };

  // Función para obtener el código de color
  const getColorCode = (colorName) => {
    if (!colorName) return "#cccccc";
    const color = colorName.toLowerCase().trim();
    return colorMap[color] || colorName; // Si no está en el mapa, intenta usar el valor directo
  };

  // Usuario logueado desde localStorage
  useEffect(() => {
    const nombre = localStorage.getItem("Primer_Nombre");
    const apellido = localStorage.getItem("Primer_Apellido");
    if (nombre && apellido) setUsuario({ nombre, apellido });
  }, []);

  // Cargar datos
  useEffect(() => {
    cargarDatos();
    return () => {
      if (chartInstance) chartInstance.destroy();
    };
  }, []);

  const cargarDatos = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const API_URL = "http://localhost:3001/api";

      const resProd = await axios.get(`${API_URL}/productos`, config);
      setProductos(resProd.data.data || []);

      const resTop = await axios.get(`${API_URL}/top-productos`, config);
      setTopProductos(resTop.data.data || []);

      const resStats = await axios.get(
        `${API_URL}/estadisticas-inventario`,
        config
      );
      setEstadisticas(resStats.data.data || null);

      setLoading(false);
    } catch (error) {
      console.error("Error al cargar inventario:", error);
      setLoading(false);
    }
  };

  // Gráfico por tallas
  useEffect(() => {
    if (estadisticas && estadisticas.porTalla) {
      const ctx = document.getElementById("graficoInventario");
      if (ctx) {
        if (chartInstance) chartInstance.destroy();

        const labels = estadisticas.porTalla.map((t) => t.Talla);
        const data = estadisticas.porTalla.map((t) => t.Cantidad);

        const newChart = new Chart(ctx, {
          type: "doughnut",
          data: {
            labels,
            datasets: [
              {
                data,
                backgroundColor: ["#36a2eb", "#ff6384", "#ffcd56", "#4bc0c0"],
                borderWidth: 2,
                borderColor: "#fff",
              },
            ],
          },
          options: {
            responsive: true,
            plugins: {
              legend: { position: "bottom" },
              tooltip: {
                callbacks: {
                  label: (context) => {
                    const total = context.dataset.data.reduce(
                      (a, b) => a + b,
                      0
                    );
                    const value = context.parsed || 0;
                    const perc = ((value / total) * 100).toFixed(1);
                    return `${context.label}: ${value} (${perc}%)`;
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
            <span className="navbar-toggler-icon"></span>
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
              <a href="admin" className="nav-link custom-link">
                Empleados
              </a>
            </li>
            <li className="nav-item">
              <a href="adminInventario" className="nav-link custom-link active">
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
              <a href="RegistroProductos" className="nav-link custom-link">
                Registro Productos
              </a>
            </li>
            <li className="nav-item">
              <a href="ListarProductos" className="nav-link custom-link">
                Administrar Productos
              </a>
            </li>
          </ul>
        </div>

        {/* MAIN */}
        <main className="flex-grow-1 p-4 bg-light">
          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary"></div>
              <p>Cargando inventario...</p>
            </div>
          ) : (
            <>
              {/* TABLA INVENTARIO */}
              <div className="card shadow-sm mb-4">
                <div className="card-header d-flex justify-content-between">
                  <span className="fw-bold">
                    <i className="bi bi-box me-2"></i>Inventario de Pijamas
                  </span>
                  <button
                    className="btn btn-sm"
                    onClick={cargarDatos}
                    style={{ backgroundColor: "#7cbbe4", color: "black" }}
                  >
                    <i className="bi bi-arrow-clockwise me-1"></i>Actualizar
                  </button>
                </div>
                <div className="card-body table-responsive">
                  {productos.length === 0 ? (
                    <div className="alert alert-info">
                      No hay productos registrados
                    </div>
                  ) : (
                    <table className="table table-hover table-bordered text-center">
                      <thead className="table-light">
                        <tr>
                          <th>ID</th>
                          <th>Producto</th>
                          <th>Color</th>
                          <th>Talla</th>
                          <th>Stock</th>
                          <th>Precio</th>
                        </tr>
                      </thead>
                      <tbody>
                        {productos.map((prod) => (
                          <tr key={prod.ID}>
                            <td>{prod.ID}</td>
                            <td>{prod.Nombre}</td>
                            <td>
                              <div className="d-flex align-items-center justify-content-center gap-2">
                                <div
                                  style={{
                                    width: "24px",
                                    height: "24px",
                                    borderRadius: "50%",
                                    backgroundColor: getColorCode(prod.Color),
                                    border: "2px solid #ddd",
                                    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                                  }}
                                  title={prod.Color}
                                ></div>
                                <span className="small text-muted">
                                  {prod.Color}
                                </span>
                              </div>
                            </td>
                            <td>{prod.Talla}</td>
                            <td>
                              <span
                                className={`badge ${
                                  prod.Stock > 10
                                    ? "bg-success"
                                    : prod.Stock > 5
                                    ? "bg-warning"
                                    : "bg-danger"
                                }`}
                              >
                                {prod.Stock}
                              </span>
                            </td>
                            <td>${prod.Precio?.toLocaleString()}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              </div>

              {/* ESTADÍSTICAS Y TOP */}
              <div className="row g-3">
                <div className="col-12 col-lg-4">
                  <div className="card shadow-sm h-100">
                    <div className="card-header fw-bold">
                      <i className="bi bi-bar-chart-fill me-2"></i>Estadísticas
                      por Talla
                    </div>
                    <div className="card-body d-flex justify-content-center">
                      {estadisticas && estadisticas.porTalla ? (
                        <canvas
                          id="graficoInventario"
                          style={{ maxWidth: "280px" }}
                        ></canvas>
                      ) : (
                        <div className="alert alert-secondary">
                          No hay estadísticas
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="col-12 col-lg-4">
                  <div className="card shadow-sm h-100">
                    <div className="card-header fw-bold">
                      <i className="bi bi-trophy-fill me-2"></i>Top 5 Productos
                      más Vendidos
                    </div>
                    <div className="card-body p-2">
                      {topProductos.length === 0 ? (
                        <div className="alert alert-secondary">
                          No hay datos suficientes
                        </div>
                      ) : (
                        <ol className="list-group list-group-numbered">
                          {topProductos.map((prod, i) => (
                            <li
                              key={prod.ID}
                              className="list-group-item d-flex justify-content-between"
                            >
                              <div>
                                <strong>{prod.Nombre}</strong>
                                <div className="small text-muted d-flex align-items-center gap-1">
                                  <div
                                    style={{
                                      width: "16px",
                                      height: "16px",
                                      borderRadius: "50%",
                                      backgroundColor: getColorCode(prod.Color),
                                      border: "1px solid #ddd",
                                      display: "inline-block",
                                    }}
                                  ></div>
                                  {prod.Color} - {prod.Talla}
                                </div>
                              </div>
                              <span className="badge bg-info">
                                {prod.UnidadesVendidas}
                              </span>
                            </li>
                          ))}
                        </ol>
                      )}
                    </div>
                  </div>
                </div>

                <div className="col-12 col-lg-4">
                  <div className="card shadow-sm h-100">
                    <div className="card-header fw-bold">
                      <i className="bi bi-calendar-event me-2"></i>Calendario
                    </div>
                    <div className="card-body p-0">
                      <iframe
                        src="https://calendar.google.com/calendar/embed?src=es.co%23holiday%40group.v.calendar.google.com&ctz=America%2FBogota"
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
}