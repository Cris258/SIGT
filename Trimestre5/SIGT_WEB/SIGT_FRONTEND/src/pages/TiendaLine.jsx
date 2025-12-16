import React, { useState, useEffect } from "react";
import "../styles/TiendaClientes.css";
import FooterLine from "../components/FooterLine";
import HeaderLine from "../components/HeaderLine";
import SidebarCliente from "../components/componentsCliente/SidebarCliente";
import { Link } from "react-router-dom";

function TiendaLine() {
  const [carrito, setCarrito] = useState([]);
  const [productos, setProductos] = useState([]);
  const [productosAgrupados, setProductosAgrupados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cantidades, setCantidades] = useState({});

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
    cargarProductos();
    cargarCarrito();
  }, []);

  const cargarCarrito = () => {
    const carritoGuardado = JSON.parse(localStorage.getItem("carro")) || [];
    setCarrito(carritoGuardado);
  };

  const cargarProductos = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      const response = await fetch("http://localhost:3001/api/producto", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Productos cargados:", data);

        const productosData = data.body || data.data || data;
        setProductos(productosData);

        agruparProductos(productosData);
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Error al cargar productos");
        console.error("Error al cargar productos:", errorData);
      }
    } catch (error) {
      console.error("Error de conexión:", error);
      setError("Error de conexión con el servidor");
    } finally {
      setLoading(false);
    }
  };

  const agruparProductos = (productos) => {
    const agrupados = {};

    productos.forEach((producto) => {
      const clave = `${producto.NombreProducto}-${producto.Color}`;

      if (!agrupados[clave]) {
        agrupados[clave] = {
          ...producto,
          tallas: [],
        };
      }

      agrupados[clave].tallas.push({
        talla: producto.Talla,
        stock: producto.Stock,
        idProducto: producto.idProducto,
      });
    });

    setProductosAgrupados(Object.values(agrupados));
  };

  const getCantidad = (productoId) => {
    return cantidades[productoId] || 1;
  };

  const incrementarCantidad = (productoId, stockMax) => {
    const cantidadActual = getCantidad(productoId);
    if (cantidadActual < stockMax) {
      setCantidades((prev) => ({
        ...prev,
        [productoId]: cantidadActual + 1,
      }));
    }
  };

  const decrementarCantidad = (productoId) => {
    const cantidadActual = getCantidad(productoId);
    if (cantidadActual > 1) {
      setCantidades((prev) => ({
        ...prev,
        [productoId]: cantidadActual - 1,
      }));
    }
  };

  const agregarAlCarrito = (productoBase, tallaSeleccionada, productoId) => {
    if (!tallaSeleccionada) {
      alert("Por favor, selecciona una talla.");
      return;
    }

    const tallaInfo = productoBase.tallas.find(
      (t) => t.talla === tallaSeleccionada
    );

    if (!tallaInfo || tallaInfo.stock === 0) {
      alert("Esta talla no tiene stock disponible.");
      return;
    }

    const cantidadSeleccionada = getCantidad(productoId);

    if (cantidadSeleccionada > tallaInfo.stock) {
      alert(`Solo hay ${tallaInfo.stock} unidades disponibles de esta talla.`);
      return;
    }

    // Obtener carrito actual de localStorage
    const carritoActual = JSON.parse(localStorage.getItem("carro")) || [];

    // Crear producto con formato compatible con el carrito
    const nuevoProducto = {
      idProducto: tallaInfo.idProducto,
      nombre: productoBase.NombreProducto,
      precio: productoBase.Precio,
      imagen: productoBase.Imagen,
      color: productoBase.Color,
      talla: tallaSeleccionada,
      stock: tallaInfo.stock,
      cantidad: cantidadSeleccionada,
    };

    // Agregar al carrito
    carritoActual.push(nuevoProducto);

    // Guardar en localStorage
    localStorage.setItem("carro", JSON.stringify(carritoActual));

    // Actualizar estado local para el contador del carrito
    setCarrito(carritoActual);

    console.log("Producto agregado al carrito:", nuevoProducto);
    console.log("Carrito actualizado:", carritoActual);

    alert(
      `${cantidadSeleccionada} unidad(es) agregada(s): ${productoBase.NombreProducto} - Talla ${tallaSeleccionada}`
    );

    // Resetear cantidad
    setCantidades((prev) => ({
      ...prev,
      [productoId]: 1,
    }));
  };

  return (
    <>
      <HeaderLine />
      <div className="container-fluid d-flex justify-content-between align-items-center py-2 px-3">
        <SidebarCliente />

        <div className="me-4">
          <Link to="/carrito">
            <button className="btn btn-outline-dark position-relative">
              <i className="bi bi-cart-fill fs-5"></i>
              {carrito.length > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {carrito.length}
                </span>
              )}
            </button>
          </Link>
        </div>
      </div>

      <div className="container text-center mt-1 mb-2">
        <h1 className="fw-bold">TIENDA ONLINE</h1>
        <p className="fw-bold">Dulces sueños con estilo</p>
      </div>

      <div className="container">
        {loading && (
          <div className="text-center my-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Cargando productos...</span>
            </div>
            <p className="mt-2">Cargando productos...</p>
          </div>
        )}

        {error && (
          <div className="alert alert-danger text-center" role="alert">
            {error}
          </div>
        )}

        {!loading && !error && productosAgrupados.length === 0 && (
          <div className="alert alert-info text-center" role="alert">
            No hay productos disponibles en este momento.
          </div>
        )}

        {!loading && !error && productosAgrupados.length > 0 && (
          <div className="row g-4">
            {productosAgrupados.map((producto, index) => {
              const tallasConStock = producto.tallas.filter((t) => t.stock > 0);
              const tieneStock = tallasConStock.length > 0;
              const productoKey = `${producto.idProducto}-${index}`;

              return (
                <div className="col-md-4" key={productoKey}>
                  <div className="card shadow-sm">
                    <img
                      src={producto.Imagen || "img/default.jpg"}
                      className="card-img-top"
                      alt={producto.NombreProducto}
                      style={{ height: "300px", objectFit: "cover" }}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{producto.NombreProducto}</h5>
                      <p className="card-text">{producto.Descripcion}</p>

                      {producto.Color && (
                        <div className="d-flex align-items-center mb-2">
                          <strong className="me-2">Color:</strong>
                          <span
                            style={{
                              display: "inline-block",
                              width: "20px",
                              height: "20px",
                              borderRadius: "50%",
                              backgroundColor: getColorCode(producto.Color),
                              border: "1px solid #ddd",
                              marginRight: "8px",
                            }}
                          ></span>
                          <span>{producto.Color}</span>
                        </div>
                      )}

                      <p className="fw-bold">
                        ${producto.Precio.toLocaleString()} COP
                      </p>

                      {!tieneStock ? (
                        <p className="text-danger small fw-bold">
                          Sin stock disponible
                        </p>
                      ) : (
                        <>
                          <select
                            className="form-select mb-3"
                            id={`talla-${productoKey}`}
                            defaultValue=""
                          >
                            <option value="" disabled>
                              Selecciona talla
                            </option>
                            {producto.tallas
                              .sort((a, b) => {
                                const orden = [
                                  "XS",
                                  "S",
                                  "M",
                                  "L",
                                  "XL",
                                  "2",
                                  "4",
                                  "6",
                                  "8",
                                  "10",
                                  "12",
                                  "14",
                                  "16",
                                ];
                                return (
                                  orden.indexOf(a.talla) -
                                  orden.indexOf(b.talla)
                                );
                              })
                              .map((tallaInfo) => (
                                <option
                                  key={tallaInfo.talla}
                                  value={tallaInfo.talla}
                                  disabled={tallaInfo.stock === 0}
                                >
                                  {tallaInfo.talla} -{" "}
                                  {tallaInfo.stock > 0
                                    ? `${tallaInfo.stock} disponibles`
                                    : "Sin stock"}
                                </option>
                              ))}
                          </select>

                          {/* Selector de cantidad */}
                          <div className="d-flex align-items-center justify-content-center mb-3">
                            <button
                              className="btn btn-outline-secondary"
                              onClick={() => decrementarCantidad(productoKey)}
                              style={{ width: "40px", height: "40px" }}
                            >
                              -
                            </button>
                            <span
                              className="mx-3 fw-bold"
                              style={{ minWidth: "30px", textAlign: "center" }}
                            >
                              {getCantidad(productoKey)}
                            </span>
                            <button
                              className="btn btn-outline-secondary"
                              onClick={() => {
                                const select = document.getElementById(
                                  `talla-${productoKey}`
                                );
                                const tallaSeleccionada = select.value;
                                if (tallaSeleccionada) {
                                  const tallaInfo = producto.tallas.find(
                                    (t) => t.talla === tallaSeleccionada
                                  );
                                  if (tallaInfo) {
                                    incrementarCantidad(
                                      productoKey,
                                      tallaInfo.stock
                                    );
                                  }
                                } else {
                                  alert("Primero selecciona una talla");
                                }
                              }}
                              style={{ width: "40px", height: "40px" }}
                            >
                              +
                            </button>
                          </div>

                          <button
                            className="btn btn-carrito w-100"
                            onClick={() => {
                              const select = document.getElementById(
                                `talla-${productoKey}`
                              );
                              agregarAlCarrito(
                                producto,
                                select.value,
                                productoKey
                              );
                            }}
                          >
                            Agregar al carrito
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <FooterLine />
    </>
  );
}

export default TiendaLine;
