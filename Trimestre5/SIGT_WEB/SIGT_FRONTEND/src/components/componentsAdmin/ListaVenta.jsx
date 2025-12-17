import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import ModalEditarVenta from "../componentesListas/ModalEditarVenta";
import ModalEliminarVenta from "../componentesListas/ModalEliminarVenta";

export default function ListaVentas() {
  const [ventas, setVentas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [ventaSeleccionada, setVentaSeleccionada] = useState(null);
  const [search, setSearch] = useState("");
  const [mostrarModalEditar, setMostrarModalEditar] = useState(false);
  const [mostrarModalEliminar, setMostrarModalEliminar] = useState(false);
  const [ventaExpandida, setVentaExpandida] = useState(null);
  const [detallesVenta, setDetallesVenta] = useState({});

  useEffect(() => {
    cargarVentas();
  }, []);

  const cargarVentas = async () => {
    const token = localStorage.getItem("token");

    try {
      const res = await fetch("http://localhost:3001/api/venta", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) throw new Error("Error al obtener ventas");
      const data = await res.json();

      // Mapear cada venta y traer info de cliente
      const ventasConCliente = await Promise.all(
        data.body.map(async (venta) => {
          try {
            const resPersona = await fetch(
              `http://localhost:3001/api/persona/${venta.Persona_FK}`,
              {
                headers: { Authorization: `Bearer ${token}` },
              }
            );
            if (resPersona.ok) {
              const personaData = await resPersona.json();
              venta.Persona = personaData.body;
            }
          } catch (err) {
            console.error("Error cargando cliente:", err);
          }
          return venta;
        })
      );

      setVentas(ventasConCliente);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  const cargarDetallesVenta = async (idVenta) => {
    if (detallesVenta[idVenta]) {
      setVentaExpandida(ventaExpandida === idVenta ? null : idVenta);
      return;
    }

    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        `http://localhost:3001/api/detalleventa/venta/${idVenta}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setDetallesVenta((prev) => ({
          ...prev,
          [idVenta]: data.body,
        }));
        setVentaExpandida(idVenta);
      }
    } catch (error) {
      console.error("Error al cargar detalles:", error);
    }
  };

  const abrirModalEditar = (venta) => {
    setVentaSeleccionada(venta);
    setMostrarModalEditar(true);
  };

  const cerrarModalEditar = () => {
    setMostrarModalEditar(false);
    setVentaSeleccionada(null);
  };

  const handleGuardarEdicion = (ventaActualizada) => {
    setVentas((prev) =>
      prev.map((v) =>
        v.idVenta === ventaActualizada.idVenta ? ventaActualizada : v
      )
    );
  };

  const abrirModalEliminar = (venta) => {
    setVentaSeleccionada(venta);
    setMostrarModalEliminar(true);
  };

  const cerrarModalEliminar = () => {
    setMostrarModalEliminar(false);
    setVentaSeleccionada(null);
  };

  const handleConfirmarEliminacion = (ventaEliminada) => {
    setVentas((prev) =>
      prev.filter((v) => v.idVenta !== ventaEliminada.idVenta)
    );
  };

  const formatearFecha = (fecha) => {
    return new Date(fecha).toLocaleDateString("es-CO", {
      year: "numeric",
      month: "short",
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
      (v.Total?.toString() || "")
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      (v.Persona
        ? `${v.Persona.Primer_Nombre} ${v.Persona.Primer_Apellido}`.toLowerCase()
        : ""
      ).includes(search.toLowerCase())
  );

  if (loading) {
    return <p className="text-center mt-5">Cargando ventas...</p>;
  }

  return (
    <div className="container mt-5 d-flex flex-column align-items-center">
      <h2 className="text-center mb-4 merriweather-font">
        Lista de Ventas Registradas
      </h2>

      <div className="row mb-3 w-100">
        <div className="col-12 col-md-6 mx-auto">
          <input
            type="text"
            className="form-control"
            placeholder="Buscar por ID, total, cliente..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <table className="table table-striped table-hover table-bordered table-responsive mt-3 w-auto text-center">
        <thead className="table-dark">
          <tr>
            <th>ID Venta</th>
            <th>Fecha</th>
            <th>Total</th>
            <th>Cliente</th>
            <th>Ver Detalles</th>
            <th>Modificar</th>
            <th>Eliminar</th>
          </tr>
        </thead>
        <tbody>
          {ventasFiltradas.length > 0 ? (
            ventasFiltradas.map((v) => (
              <>
                <tr key={v.idVenta}>
                  <td>{v.idVenta}</td>
                  <td>{formatearFecha(v.Fecha)}</td>
                  <td>
                    <span className="badge bg-success">
                      {formatearPrecio(v.Total)}
                    </span>
                  </td>
                  <td>
                    {v.Persona
                      ? `${v.Persona.Primer_Nombre} ${v.Persona.Primer_Apellido}`
                      : "Cliente no disponible"}
                  </td>
                  <td>
                    <button
                      className="btn btn-outline-info btn-sm"
                      onClick={() => cargarDetallesVenta(v.idVenta)}
                    >
                      {ventaExpandida === v.idVenta ? (
                        <i className="bi bi-eye-slash"></i>
                      ) : (
                        <i className="bi bi-eye"></i>
                      )}
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn btn-outline-primary"
                      onClick={() => abrirModalEditar(v)}
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
                      onClick={() => abrirModalEliminar(v)}
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
                {ventaExpandida === v.idVenta && detallesVenta[v.idVenta] && (
                  <tr>
                    <td colSpan="7" className="bg-light">
                      <div className="p-3">
                        <h6 className="mb-3">
                          Detalles de la Venta #{v.idVenta}
                        </h6>
                        <table className="table table-sm table-bordered">
                          <thead className="table-secondary">
                            <tr>
                              <th>ID Producto</th>
                              <th>Nombre Producto</th>
                              <th>Cantidad</th>
                              <th>Precio Unitario</th>
                              <th>Subtotal</th>
                            </tr>
                          </thead>
                          <tbody>
                            {detallesVenta[v.idVenta].map((detalle) => (
                              <tr key={detalle.idDetalleVenta}>
                                <td>{detalle.Producto_FK}</td>
                                <td>
                                  {detalle.Producto?.NombreProducto ||
                                    "Producto no disponible"}
                                </td>
                                <td>{detalle.Cantidad}</td>
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
                            <tr className="table-dark">
                              <td colSpan="4" className="text-end">
                                <strong>Total:</strong>
                              </td>
                              <td>
                                <strong>{formatearPrecio(v.Total)}</strong>
                              </td>
                            </tr>
                          </tfoot>
                        </table>
                      </div>
                    </td>
                  </tr>
                )}
              </>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center">
                {search
                  ? "No se encontraron resultados"
                  : "No hay ventas registradas"}
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {mostrarModalEditar && (
        <ModalEditarVenta
          venta={ventaSeleccionada}
          onClose={cerrarModalEditar}
          onGuardar={handleGuardarEdicion}
        />
      )}

      {mostrarModalEliminar && (
        <ModalEliminarVenta
          venta={ventaSeleccionada}
          onClose={cerrarModalEliminar}
          onConfirmar={handleConfirmarEliminacion}
        />
      )}
    </div>
  );
}
