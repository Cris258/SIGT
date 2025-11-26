import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

export default function HistorialCompras() {
  const [ventas, setVentas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [ventaExpandida, setVentaExpandida] = useState(null);

  // CAMBIA ESTE COLOR AL QUE QUIERAS
  const colorPrincipal = "#your-color-here";

  // Mapa de colores
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

  const getColorCode = (colorName) => {
    if (!colorName) return "#cccccc";
    const color = colorName.toLowerCase().trim();
    return colorMap[color] || colorName;
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const idPersona = localStorage.getItem("idPersona"); // ID de la persona logueada

    if (!idPersona) {
      console.error("No se encontró idPersona en localStorage");
      setLoading(false);
      return;
    }

    console.log("Obteniendo historial para idPersona:", idPersona);

    fetch(`http://localhost:3001/api/venta/historial/${idPersona}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        console.log("Respuesta del servidor:", res.status);
        if (!res.ok) throw new Error("Error al obtener historial");
        return res.json();
      })
      .then((data) => {
        console.log("Datos recibidos:", data);
        setVentas(data.body || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error completo:", err);
        setLoading(false);
      });
  }, []);

  const toggleDetalles = (idVenta) => {
    setVentaExpandida(ventaExpandida === idVenta ? null : idVenta);
  };

  const formatearFecha = (fecha) => {
    return new Date(fecha).toLocaleDateString("es-CO", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatearPrecio = (precio) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    }).format(precio);
  };

  const ventasFiltradas = ventas.filter(
    (v) =>
      (v.idVenta?.toString() || "")
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      (v.FechaVenta || "").toLowerCase().includes(search.toLowerCase()) ||
      (v.Total?.toString() || "").toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return <p className="text-center mt-5">Cargando historial de compras...</p>;
  }

  return (
    <div className="container mt-5 d-flex flex-column align-items-center">
      <h2 className="text-center mb-4 merriweather-font">
        Historial de Compras
      </h2>

      {/* Buscador */}
      <div className="row mb-3 w-100">
        <div className="col-12 col-md-6 mx-auto">
          <input
            type="text"
            className="form-control"
            placeholder="Buscar por ID, fecha o total..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="w-100">
        {ventasFiltradas.length > 0 ? (
          ventasFiltradas.map((venta) => (
            <div key={venta.idVenta} className="card mb-3 shadow-sm">
              <div 
                className="card-header" 
                style={{ backgroundColor: "#your-color-here", color: "#000000" }}
              >
                <div className="row align-items-center">
                  <div className="col-md-2">
                    <strong>Pedido #{venta.idVenta}</strong>
                  </div>
                  <div className="col-md-3">
                    <small>{formatearFecha(venta.FechaVenta)}</small>
                  </div>
                  <div className="col-md-2">
                    <span className="badge bg-success">
                      {formatearPrecio(venta.Total)}
                    </span>
                  </div>
                  <div className="col-md-2">
                    <span
                      className={`badge ${
                        venta.Estado === "Completado"
                          ? "bg-success"
                          : venta.Estado === "Pendiente"
                          ? "bg-warning"
                          : "bg-danger"
                      }`}
                    >
                      {venta.Estado}
                    </span>
                  </div>
                  <div className="col-md-3 text-end">
                    <button
                      className="btn btn-sm"
                      style={{ 
                        backgroundColor: colorPrincipal, 
                        color: "#000000",
                        border: "1px solid #000000"
                      }}
                      onClick={() => toggleDetalles(venta.idVenta)}
                    >
                      {ventaExpandida === venta.idVenta
                        ? "Ocultar Detalles"
                        : "Ver Detalles"}
                    </button>
                  </div>
                </div>
              </div>

              {/* Detalles expandibles */}
              {ventaExpandida === venta.idVenta && (
                <div className="card-body">
                  <h5 className="mb-3">Productos Comprados</h5>
                  <table className="table table-hover table-bordered">
                    <thead className="table-light">
                      <tr>
                        <th>Producto</th>
                        <th>Color</th>
                        <th>Talla</th>
                        <th>Cantidad</th>
                        <th>Precio Unitario</th>
                        <th>Subtotal</th>
                      </tr>
                    </thead>
                    <tbody>
                      {venta.detalles?.map((detalle, index) => (
                        <tr key={index}>
                          <td>{detalle.NombreProducto}</td>
                          <td>
                            <div className="d-flex align-items-center gap-2">
                              <div
                                style={{
                                  width: "20px",
                                  height: "20px",
                                  borderRadius: "50%",
                                  backgroundColor: getColorCode(detalle.Color),
                                  border: "2px solid #ddd",
                                  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                                }}
                                title={detalle.Color}
                              ></div>
                              <span className="small">{detalle.Color}</span>
                            </div>
                          </td>
                          <td>
                            <span className="badge bg-secondary">
                              {detalle.Talla}
                            </span>
                          </td>
                          <td className="text-center">{detalle.Cantidad}</td>
                          <td>{formatearPrecio(detalle.PrecioUnitario)}</td>
                          <td>
                            <strong>
                              {formatearPrecio(
                                detalle.Cantidad * detalle.PrecioUnitario
                              )}
                            </strong>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr style={{ backgroundColor: colorPrincipal }}>
                        <td colSpan="5" className="text-end" style={{ color: "#000000" }}>
                          <strong>Total:</strong>
                        </td>
                        <td style={{ color: "#000000" }}>
                          <strong>{formatearPrecio(venta.Total)}</strong>
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="alert alert-info text-center" role="alert">
            {search
              ? "No se encontraron resultados"
              : "No tienes compras registradas"}
          </div>
        )}
      </div>
    </div>
  );
}