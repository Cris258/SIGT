import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import ModalEditarCarrito from "../componentesListas/ModalEditarCarrito";
import ModalEliminarCarrito from "../componentesListas/ModalEliminarCarrito";

export default function ListaCarritos() {
  const [carritos, setCarritos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [carritoSeleccionado, setCarritoSeleccionado] = useState(null);
  const [search, setSearch] = useState("");
  const [mostrarModalEditar, setMostrarModalEditar] = useState(false);
  const [mostrarModalEliminar, setMostrarModalEliminar] = useState(false);
  const [carritoExpandido, setCarritoExpandido] = useState(null);
  const [detallesCarrito, setDetallesCarrito] = useState({});

  useEffect(() => {
    cargarCarritos();
  }, []);

  const cargarCarritos = async () => {
    const token = localStorage.getItem("token");

    try {
      const res = await fetch("http://localhost:3001/api/carrito", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) throw new Error("Error al obtener carritos");
      const data = await res.json();

      // Mapear para traer info de cliente
      const carritosConCliente = await Promise.all(
        data.body.map(async (carrito) => {
          try {
            const resPersona = await fetch(
              `http://localhost:3001/api/persona/${carrito.Persona_FK}`,
              {
                headers: { Authorization: `Bearer ${token}` },
              }
            );
            if (resPersona.ok) {
              const personaData = await resPersona.json();
              carrito.Persona = personaData.body;
            }
          } catch (err) {
            console.error("Error cargando cliente:", err);
          }
          return carrito;
        })
      );

      setCarritos(carritosConCliente);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  const cargarDetallesCarrito = async (idCarrito) => {
    if (detallesCarrito[idCarrito]) {
      setCarritoExpandido(carritoExpandido === idCarrito ? null : idCarrito);
      return;
    }

    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        `http://localhost:3001/api/detallecarrito/carrito/${idCarrito}`,
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
        setDetallesCarrito((prev) => ({
          ...prev,
          [idCarrito]: data.body,
        }));
        setCarritoExpandido(idCarrito);
      }
    } catch (error) {
      console.error("Error al cargar detalles:", error);
    }
  };

  const abrirModalEditar = (carrito) => {
    setCarritoSeleccionado(carrito);
    setMostrarModalEditar(true);
  };

  const cerrarModalEditar = () => {
    setMostrarModalEditar(false);
    setCarritoSeleccionado(null);
  };

  const handleGuardarEdicion = (carritoActualizado) => {
    setCarritos((prev) =>
      prev.map((c) =>
        c.idCarrito === carritoActualizado.idCarrito ? carritoActualizado : c
      )
    );
  };

  const abrirModalEliminar = (carrito) => {
    setCarritoSeleccionado(carrito);
    setMostrarModalEliminar(true);
  };

  const cerrarModalEliminar = () => {
    setMostrarModalEliminar(false);
    setCarritoSeleccionado(null);
  };

  const handleConfirmarEliminacion = (carritoEliminado) => {
    setCarritos((prev) =>
      prev.filter((c) => c.idCarrito !== carritoEliminado.idCarrito)
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

  const carritosFiltrados = carritos.filter(
    (c) =>
      (c.idCarrito?.toString() || "")
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      (c.Estado || "").toLowerCase().includes(search.toLowerCase()) ||
      (c.Persona_FK?.toString() || "")
        .toLowerCase()
        .includes(search.toLowerCase())
  );

  if (loading) {
    return <p className="text-center mt-5">Cargando carritos...</p>;
  }

  return (
    <div className="container mt-5 d-flex flex-column align-items-center">
      <h2 className="text-center mb-4 merriweather-font">
        Lista de Carritos Registrados
      </h2>

      <div className="row mb-3 w-100">
        <div className="col-12 col-md-6 mx-auto">
          <input
            type="text"
            className="form-control"
            placeholder="Buscar por ID, estado, cliente..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <table className="table table-striped table-hover table-bordered table-responsive mt-3 w-auto text-center">
        <thead className="table-dark">
          <tr>
            <th>ID Carrito</th>
            <th>Fecha Creación</th>
            <th>Estado</th>
            <th>Cliente</th>
            <th>Ver Detalles</th>
            <th>Modificar</th>
            <th>Eliminar</th>
          </tr>
        </thead>
        <tbody>
          {carritosFiltrados.length > 0 ? (
            carritosFiltrados.map((c) => (
              <>
                <tr key={c.idCarrito}>
                  <td>{c.idCarrito}</td>
                  <td>{formatearFecha(c.FechaCreacion)}</td>
                  <td>
                    <span
                      className={`badge ${
                        c.Estado === "Pagado"
                          ? "bg-success"
                          : c.Estado === "Cancelado"
                          ? "bg-danger text-dark"
                          : c.Estado === "Pendiente"
                          ? "bg-warning text-dark"
                          : "bg-secondary"
                      }`}
                    >
                      {c.Estado}
                    </span>
                  </td>
                  <td>
                    {c.Persona
                      ? `${c.Persona.Primer_Nombre} ${c.Persona.Primer_Apellido}`
                      : "Cliente no disponible"}
                  </td>
                  <td>
                    <button
                      className="btn btn-outline-info btn-sm"
                      onClick={() => cargarDetallesCarrito(c.idCarrito)}
                    >
                      {carritoExpandido === c.idCarrito ? (
                        <i className="bi bi-eye-slash"></i>
                      ) : (
                        <i className="bi bi-eye"></i>
                      )}
                    </button>
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
                {carritoExpandido === c.idCarrito &&
                  detallesCarrito[c.idCarrito] && (
                    <tr>
                      <td colSpan="7" className="bg-light">
                        <div className="p-3">
                          <h6 className="mb-3">
                            Productos del Carrito #{c.idCarrito}
                          </h6>
                          <table className="table table-sm table-bordered">
                            <thead className="table-secondary">
                              <tr>
                                <th>ID Producto</th>
                                <th>Nombre Producto</th>
                                <th>Cantidad</th>
                                <th>Precio</th>
                              </tr>
                            </thead>
                            <tbody>
                              {detallesCarrito[c.idCarrito].map((detalle) => (
                                <tr key={detalle.idDetalleCarrito}>
                                  <td>{detalle.Producto_FK}</td>
                                  <td>
                                    {detalle.Producto?.NombreProducto ||
                                      "Producto no disponible"}
                                  </td>
                                  <td>{detalle.Cantidad}</td>
                                  <td>
                                    {detalle.Producto?.Precio
                                      ? `$${detalle.Producto.Precio.toLocaleString()}`
                                      : "N/A"}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
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
                  : "No hay carritos registrados"}
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {mostrarModalEditar && (
        <ModalEditarCarrito
          carrito={carritoSeleccionado}
          onClose={cerrarModalEditar}
          onGuardar={handleGuardarEdicion}
        />
      )}

      {mostrarModalEliminar && (
        <ModalEliminarCarrito
          carrito={carritoSeleccionado}
          onClose={cerrarModalEliminar}
          onConfirmar={handleConfirmarEliminacion}
        />
      )}
    </div>
  );
}
