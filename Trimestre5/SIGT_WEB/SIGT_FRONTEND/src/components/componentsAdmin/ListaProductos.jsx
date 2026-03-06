import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import ModalEditarProducto from "../componentesListas/ModalEditarProducto";
import ModalEliminarProducto from "../componentesListas/ModalEliminarProducto";

export default function ListaProductos() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [search, setSearch] = useState("");
  const [mostrarModalEditar, setMostrarModalEditar] = useState(false);
  const [mostrarModalEliminar, setMostrarModalEliminar] = useState(false);

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

    fetch("http://localhost:3001/api/producto", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Error al obtener productos");
        return res.json();
      })
      .then((data) => {
        setProductos(data.body);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const abrirModalEditar = (producto) => {
    setProductoSeleccionado(producto);
    setMostrarModalEditar(true);
  };

  const cerrarModalEditar = () => {
    setMostrarModalEditar(false);
    setProductoSeleccionado(null);
  };

  const handleGuardarEdicion = (productoActualizado) => {
    setProductos((prev) =>
      prev.map((p) =>
        p.idProducto === productoActualizado.idProducto
          ? productoActualizado
          : p
      )
    );
  };

  const abrirModalEliminar = (producto) => {
    setProductoSeleccionado(producto);
    setMostrarModalEliminar(true);
  };

  const cerrarModalEliminar = () => {
    setMostrarModalEliminar(false);
    setProductoSeleccionado(null);
  };

  const handleConfirmarEliminacion = (productoEliminado) => {
    setProductos((prev) =>
      prev.filter((p) => p.idProducto !== productoEliminado.idProducto)
    );
  };

  const productosFiltrados = productos.filter(
    (p) =>
      (p.idProducto?.toString() || "")
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      (p.NombreProducto || "").toLowerCase().includes(search.toLowerCase()) ||
      (p.Color || "").toLowerCase().includes(search.toLowerCase()) ||
      (p.Talla || "").toLowerCase().includes(search.toLowerCase()) ||
      (p.Stock?.toString() || "")
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      (p.Precio?.toString() || "").toLowerCase().includes(search.toLowerCase())
  );

  const formatearPrecio = (precio) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    }).format(precio);
  };

  if (loading) {
    return <p className="text-center mt-5">Cargando productos...</p>;
  }

  return (
    <div className="container mt-5 d-flex flex-column align-items-center">
      <h2 className="text-center mb-4 merriweather-font">
        Lista de Productos Registrados
      </h2>

      {/* Buscador */}
      <div className="row mb-3 w-100">
        <div className="col-12 col-md-6 mx-auto">
          <input
            type="text"
            className="form-control"
            placeholder="Buscar por nombre, color, talla, precio..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <table className="table table-striped table-hover table-bordered table-responsive mt-3 w-auto text-center">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Nombre Producto</th>
            <th>Color</th>
            <th>Talla</th>
            <th>Stock</th>
            <th>Precio</th>
            <th>Modificar</th>
            <th>Eliminar</th>
          </tr>
        </thead>
        <tbody>
          {productosFiltrados.length > 0 ? (
            productosFiltrados.map((p) => (
              <tr key={p.idProducto}>
                <td>{p.idProducto}</td>
                <td>{p.NombreProducto}</td>
                <td>
                  <div className="d-flex align-items-center justify-content-center gap-2">
                    <div
                      style={{
                        width: "24px",
                        height: "24px",
                        borderRadius: "50%",
                        backgroundColor: getColorCode(p.Color),
                        border: "2px solid #ddd",
                        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                      }}
                      title={p.Color}
                    ></div>
                    <span className="small text-muted">{p.Color}</span>
                  </div>
                </td>
                <td>
                  <span className="badge bg-secondary">{p.Talla}</span>
                </td>
                <td>
                  <span
                    className={`badge ${
                      p.Stock > 10
                        ? "bg-success"
                        : p.Stock > 5
                        ? "bg-warning"
                        : "bg-danger"
                    }`}
                  >
                    {p.Stock}
                  </span>
                </td>
                <td>{formatearPrecio(p.Precio)}</td>
                <td>
                  <button
                    className="btn btn-outline-primary"
                    onClick={() => abrirModalEditar(p)}
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
                    onClick={() => abrirModalEliminar(p)}
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
              <td colSpan="8" className="text-center">
                {search
                  ? "No se encontraron resultados"
                  : "No hay productos registrados"}
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Modal de Editar */}
      {mostrarModalEditar && (
        <ModalEditarProducto
          producto={productoSeleccionado}
          onClose={cerrarModalEditar}
          onGuardar={handleGuardarEdicion}
        />
      )}

      {/* Modal de Eliminar */}
      {mostrarModalEliminar && (
        <ModalEliminarProducto
          producto={productoSeleccionado}
          onClose={cerrarModalEliminar}
          onConfirmar={handleConfirmarEliminacion}
        />
      )}
    </div>
  );
}