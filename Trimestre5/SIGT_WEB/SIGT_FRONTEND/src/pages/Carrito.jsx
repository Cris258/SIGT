import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Carrito.css";
import HeaderLine from "../components/HeaderLine";
import FooterLine from "../components/FooterLine";

function Carrito() {
  const [carrito, setCarrito] = useState([]);
  const [indexAEliminar, setIndexAEliminar] = useState(null);
  const [cargaInicial, setCargaInicial] = useState(true);
  const [productosSeleccionados, setProductosSeleccionados] = useState([]);
  const [procesandoCompra, setProcesandoCompra] = useState(false);

  useEffect(() => {
    const storedCarro = JSON.parse(localStorage.getItem("carro")) || [];
    console.log("Carrito cargado:", storedCarro);
    setCarrito(storedCarro);
    setProductosSeleccionados(storedCarro.map(() => true));
    setCargaInicial(false);
  }, []);

  useEffect(() => {
    if (!cargaInicial) {
      localStorage.setItem("carro", JSON.stringify(carrito));
      console.log("Carrito guardado:", carrito);
    }
  }, [carrito, cargaInicial]);

  const toggleSeleccion = (index) => {
    const nuevaSeleccion = [...productosSeleccionados];
    nuevaSeleccion[index] = !nuevaSeleccion[index];
    setProductosSeleccionados(nuevaSeleccion);
  };

  const seleccionarTodos = () => {
    setProductosSeleccionados(carrito.map(() => true));
  };

  const deseleccionarTodos = () => {
    setProductosSeleccionados(carrito.map(() => false));
  };

  const actualizarCantidad = (index, nuevaCantidad) => {
    if (nuevaCantidad >= 1 && nuevaCantidad <= carrito[index].stock) {
      const nuevoCarrito = [...carrito];
      nuevoCarrito[index].cantidad = nuevaCantidad;
      setCarrito(nuevoCarrito);
    } else if (nuevaCantidad > carrito[index].stock) {
      alert(`Solo hay ${carrito[index].stock} unidades disponibles`);
    }
  };

  const confirmarEliminacion = (index) => {
    setIndexAEliminar(index);
    const modal = new window.bootstrap.Modal(
      document.getElementById("confirmarModal")
    );
    modal.show();
  };

  const eliminarProducto = () => {
    if (indexAEliminar !== null) {
      const nuevoCarrito = [...carrito];
      const nuevaSeleccion = [...productosSeleccionados];

      nuevoCarrito.splice(indexAEliminar, 1);
      nuevaSeleccion.splice(indexAEliminar, 1);

      setCarrito(nuevoCarrito);
      setProductosSeleccionados(nuevaSeleccion);
      setIndexAEliminar(null);

      window.bootstrap.Modal.getInstance(
        document.getElementById("confirmarModal")
      ).hide();
    }
  };

  const vaciarCarrito = () => {
    setCarrito([]);
    setProductosSeleccionados([]);
    localStorage.removeItem("carro");
  };

  const finalizarCompra = async () => {
    setProcesandoCompra(true);

    try {
      const token = localStorage.getItem("token");
      const idPersona = localStorage.getItem("idPersona");

      if (!token || !idPersona) {
        alert(
          "Error: No se encontró información del usuario. Por favor, inicie sesión nuevamente."
        );
        setProcesandoCompra(false);
        return;
      }

      const productosAComprar = carrito.filter(
        (_, index) => productosSeleccionados[index]
      );

      if (productosAComprar.length === 0) {
        alert("Por favor, selecciona al menos un producto para comprar.");
        setProcesandoCompra(false);
        return;
      }

      console.log("Iniciando proceso de compra...");
      console.log("Productos a comprar:", productosAComprar);

      // PASO 1: Crear el Carrito
      const carritoData = {
        Persona_FK: parseInt(idPersona),
        FechaCreacion: new Date().toISOString(),
        Estado: "Pendiente",
      };

      console.log("Creando carrito:", carritoData);

      const carritoResponse = await fetch("http://localhost:3001/api/carrito", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(carritoData),
      });

      const carritoResult = await carritoResponse.json();
      console.log("Respuesta de carrito:", carritoResult);

      if (!carritoResponse.ok) {
        throw new Error(carritoResult.message || "Error al crear el carrito");
      }

      const idCarrito =
        carritoResult.body?.id ||
        carritoResult.id ||
        carritoResult.body?.idCarrito ||
        carritoResult.idCarrito;

      if (!idCarrito) {
        throw new Error("No se pudo obtener el ID del carrito");
      }

      console.log("Carrito creado con ID:", idCarrito);

      // PASO 2: Crear los DetalleCarrito
      const detalleCarritoPromesas = productosAComprar.map(async (producto) => {
        const detalleCarritoData = {
          Carrito_FK: idCarrito,
          Producto_FK: producto.idProducto,
          Cantidad: producto.cantidad,
        };

        console.log("Guardando detalle carrito:", detalleCarritoData);

        const detalleResponse = await fetch(
          "http://localhost:3001/api/detallecarrito",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(detalleCarritoData),
          }
        );

        const detalleResult = await detalleResponse.json();
        console.log("Respuesta detalle carrito:", detalleResult);

        if (!detalleResponse.ok) {
          throw new Error(
            `Error al guardar detalle de ${producto.nombre}: ${detalleResult.message}`
          );
        }

        return detalleResult;
      });

      await Promise.all(detalleCarritoPromesas);
      console.log("Todos los detalles del carrito guardados");

      // PASO 3: Crear la Venta
      const totalVenta = productosAComprar.reduce(
        (acc, prod) => acc + prod.precio * prod.cantidad,
        0
      );

      const ventaData = {
        Persona_FK: parseInt(idPersona),
        Fecha: new Date().toISOString().split("T")[0],
        Total: total,
      };

      console.log("Creando venta:", ventaData);

      const ventaResponse = await fetch("http://localhost:3001/api/venta", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(ventaData),
      });

      const ventaResult = await ventaResponse.json();
      console.log("Respuesta de venta - Status:", ventaResponse.status);
      console.log("Respuesta de venta - Body:", ventaResult);

      if (!ventaResponse.ok) {
        console.error("Error completo de venta:", ventaResult);
        throw new Error(
          ventaResult.message ||
            ventaResult.Message ||
            "Error al crear la venta"
        );
      }

      const idVenta =
        ventaResult.id ||
        ventaResult.body?.id ||
        ventaResult.body?.idVenta ||
        ventaResult.idVenta;

      if (!idVenta) {
        console.error("Respuesta completa de venta:", ventaResult);
        throw new Error("No se pudo obtener el ID de la venta");
      }

      console.log("Venta creada con ID:", idVenta);

      // PASO 4: Crear los DetalleVenta
      const detalleVentaPromesas = productosAComprar.map(async (producto) => {
        const detalleVentaData = {
          Venta_FK: idVenta,
          Producto_FK: producto.idProducto,
          Cantidad: producto.cantidad,
          PrecioUnitario: producto.precio,
        };

        console.log("Guardando detalle venta:", detalleVentaData);

        const detalleResponse = await fetch(
          "http://localhost:3001/api/detalleventa",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(detalleVentaData),
          }
        );

        const detalleResult = await detalleResponse.json();
        console.log("Respuesta detalle venta:", detalleResult);

        if (!detalleResponse.ok) {
          throw new Error(
            `Error al guardar detalle de venta de ${producto.nombre}: ${detalleResult.message}`
          );
        }

        return detalleResult;
      });

      await Promise.all(detalleVentaPromesas);
      console.log("Todos los detalles de venta guardados");

      // PASO 4.1: Actualizar stock de los productos
      const actualizarStockPromesas = productosAComprar.map(
        async (producto) => {
          const nuevoStock = producto.stock - producto.cantidad;

          console.log(
            `Actualizando stock de ${producto.nombre}: ${producto.stock} -> ${nuevoStock}`
          );

          const stockResponse = await fetch(
            `http://localhost:3001/api/producto/${producto.idProducto}`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({ Stock: nuevoStock }),
            }
          );

          if (!stockResponse.ok) {
            const errorData = await stockResponse.json();
            throw new Error(
              `Error al actualizar stock de ${producto.nombre}: ${errorData.message}`
            );
          }

          return await stockResponse.json();
        }
      );

      await Promise.all(actualizarStockPromesas);
      console.log("Stock de productos actualizado correctamente");

      // PASO 5 (Opcional): Actualizar estado del carrito a completado
      const actualizarEstadoResponse = await fetch(
        `http://localhost:3001/api/carrito/${idCarrito}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ Estado: "completado" }),
        }
      );

      if (actualizarEstadoResponse.ok) {
        console.log("Estado del carrito actualizado a completado");
      }

      console.log("Compra finalizada exitosamente");

      const carritoActualizado = carrito.filter(
        (_, index) => !productosSeleccionados[index]
      );
      setCarrito(carritoActualizado);
      setProductosSeleccionados(carritoActualizado.map(() => true));
      localStorage.setItem("carro", JSON.stringify(carritoActualizado));

      alert("¡Compra realizada exitosamente! Tu pedido ha sido procesado.");
    } catch (error) {
      console.error("Error en el proceso de compra:", error);
      alert(`Error al procesar la compra: ${error.message}`);
    } finally {
      setProcesandoCompra(false);
    }
  };

  const total = carrito.reduce((acc, prod, index) => {
    if (productosSeleccionados[index]) {
      return acc + prod.precio * prod.cantidad;
    }
    return acc;
  }, 0);

  const cantidadSeleccionada = productosSeleccionados.filter(Boolean).length;

  return (
    <>
      <HeaderLine />
      <div className="container my-5">
        <h2 className="text-center mb-4">Tu Carrito de Compras</h2>

        {carrito.length === 0 ? (
          <div className="text-center my-5">
            <p className="fs-4">Tu carrito está vacío</p>
            <a href="/TiendaLine" className="btn btn-primary mt-3">
              Ir a la tienda
            </a>
          </div>
        ) : (
          <>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <div>
                <button
                  className="btn btn-sm btn-outline-primary me-2"
                  onClick={seleccionarTodos}
                >
                  Seleccionar todos
                </button>
                <button
                  className="btn btn-sm btn-outline-secondary"
                  onClick={deseleccionarTodos}
                >
                  Deseleccionar todos
                </button>
              </div>
              <div>
                <span className="badge bg-info text-dark">
                  {cantidadSeleccionada} de {carrito.length} productos
                  seleccionados
                </span>
              </div>
            </div>

            <div className="table-responsive">
              <table className="table text-center align-middle">
                <thead className="table-light">
                  <tr>
                    <th>
                      <input
                        type="checkbox"
                        checked={
                          productosSeleccionados.every(Boolean) &&
                          carrito.length > 0
                        }
                        onChange={(e) => {
                          if (e.target.checked) {
                            seleccionarTodos();
                          } else {
                            deseleccionarTodos();
                          }
                        }}
                      />
                    </th>
                    <th>Imagen</th>
                    <th>Producto</th>
                    <th>Color</th>
                    <th>Talla</th>
                    <th>Precio</th>
                    <th>Cantidad</th>
                    <th>Subtotal</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {carrito.map((prod, index) => {
                    const subtotal = prod.precio * prod.cantidad;
                    const estaSeleccionado = productosSeleccionados[index];

                    return (
                      <tr
                        key={index}
                        className={estaSeleccionado ? "" : "table-secondary"}
                        style={{ opacity: estaSeleccionado ? 1 : 0.6 }}
                      >
                        <td>
                          <input
                            type="checkbox"
                            checked={estaSeleccionado || false}
                            onChange={() => toggleSeleccion(index)}
                          />
                        </td>
                        <td>
                          <img
                            src={prod.imagen || "img/default.jpg"}
                            width="80"
                            alt={prod.nombre}
                            style={{ objectFit: "cover", height: "80px" }}
                          />
                        </td>
                        <td className="fw-bold">{prod.nombre}</td>
                        <td>{prod.color}</td>
                        <td>
                          <span className="badge bg-secondary">
                            {prod.talla}
                          </span>
                        </td>
                        <td>${prod.precio.toLocaleString()} COP</td>
                        <td>
                          <div className="d-flex justify-content-center align-items-center gap-2">
                            <button
                              className="btn btn-sm btn-outline-secondary"
                              onClick={() =>
                                actualizarCantidad(index, prod.cantidad - 1)
                              }
                              disabled={prod.cantidad <= 1}
                            >
                              -
                            </button>
                            <input
                              type="number"
                              className="form-control text-center"
                              value={prod.cantidad}
                              min="1"
                              max={prod.stock}
                              style={{ width: "60px" }}
                              onChange={(e) =>
                                actualizarCantidad(
                                  index,
                                  parseInt(e.target.value) || 1
                                )
                              }
                            />
                            <button
                              className="btn btn-sm btn-outline-secondary"
                              onClick={() =>
                                actualizarCantidad(index, prod.cantidad + 1)
                              }
                              disabled={prod.cantidad >= prod.stock}
                            >
                              +
                            </button>
                          </div>
                          <small className="text-muted d-block mt-1">
                            Stock: {prod.stock}
                          </small>
                        </td>
                        <td className="fw-bold">
                          ${subtotal.toLocaleString()} COP
                        </td>
                        <td>
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => confirmarEliminacion(index)}
                          >
                            <i className="bi bi-trash"></i> Eliminar
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="row mt-4">
              <div className="col-md-6">
                <button
                  className="btn btn-outline-danger"
                  onClick={vaciarCarrito}
                  disabled={procesandoCompra}
                >
                  Vaciar carrito
                </button>
              </div>
              <div className="col-md-6 text-end">
                <h4>
                  Total a pagar:{" "}
                  <span className="text-primary">
                    ${total.toLocaleString()} COP
                  </span>
                </h4>
                {cantidadSeleccionada === 0 && (
                  <small className="text-danger d-block">
                    Selecciona al menos un producto
                  </small>
                )}
              </div>
            </div>

            <div className="d-flex justify-content-between mt-4">
              <a href="/TiendaLine" className="btn btn-secondary">
                <i className="bi bi-arrow-left"></i> Seguir Comprando
              </a>
              <button
                className="btn btn-success btn-lg"
                disabled={cantidadSeleccionada === 0 || procesandoCompra}
                onClick={finalizarCompra}
              >
                {procesandoCompra ? (
                  <>
                    <span
                      className="spinner-border spinner-border-sm me-2"
                      role="status"
                    ></span>
                    Procesando...
                  </>
                ) : (
                  <>
                    <i className="bi bi-check-circle"></i> Finalizar Compra (
                    {cantidadSeleccionada} productos)
                  </>
                )}
              </button>
            </div>
          </>
        )}

        <div
          className="modal fade"
          id="confirmarModal"
          tabIndex="-1"
          aria-labelledby="confirmarLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="confirmarLabel">
                  ¿Estás seguro?
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Cerrar"
                ></button>
              </div>
              <div className="modal-body">
                ¿Deseas eliminar este producto del carrito?
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={eliminarProducto}
                >
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <FooterLine />
    </>
  );
}

export default Carrito;
