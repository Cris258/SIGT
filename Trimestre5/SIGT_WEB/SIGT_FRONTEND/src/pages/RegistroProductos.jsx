import React, { useState } from "react";
import FooterLine from "../components/FooterLine";
import "../styles/styleRegistro.css";

function RegistroProductos() {
  const [formData, setFormData] = useState({
    NombreProducto: "",
    Color: "",
    Talla: "",
    Stock: "",
    Precio: "",
  });

  // Lista de colores disponibles
  const colores = [
    "Rojo",
    "Azul",
    "Verde",
    "Amarillo",
    "Negro",
    "Blanco",
    "Gris",
    "Rosa",
    "Morado",
    "Naranja",
    "Café",
    "Beige",
    "Celeste",
    "Turquesa",
    "Violeta",
    "Fucsia",
    "Marino",
    "Vino",
    "Crema",
  ];

  // Mapa de colores para vista previa
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
    if (!colorName) return "transparent";
    const color = colorName.toLowerCase().trim();
    return colorMap[color] || "#cccccc";
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const envio = { ...formData };

    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:3001/api/producto", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(envio),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Producto registrado exitosamente ✅");
        console.log("Respuesta:", data);
        setFormData({
          NombreProducto: "",
          Color: "",
          Talla: "",
          Stock: "",
          Precio: "",
        });
      } else {
        alert("Error: " + (data.Message || "No se pudo registrar el producto"));
      }
    } catch (error) {
      console.error("Error en el registro:", error);
      alert("Error de conexión con el servidor ❌");
    }
  };

  return (
    <>
      <header className="py-3 shadow-sm merriweather-font">
        <div className="container">
          <div className="row g-0 justify-content-between align-items-center">
            {/* Logo + Título */}
            <div className="col-auto d-flex align-items-center ps-2">
              <img
                src="/img/Logo Vibra Positiva.jpg"
                alt="Logo"
                className="minilogo me-2"
              />
              <h1 className="titulo fw-bold text-uppercase mb-0 fs-7 ms-2">
                Vibra Positiva Pijamas
              </h1>
            </div>
            <nav className="menu col-auto d-flex flex-column flex-md-row align-items-center gap-1 gap-md-2">
              <a
                href="/adminInventario"
                className="co1 d-flex align-items-center text-center text-black text-decoration-none"
              >
                <div className="login d-flex align-items-center gap-1">
                  <span>Volver</span>
                  <div className="icono">
                    <i className="bi bi-box-arrow-left"></i>
                  </div>
                </div>
              </a>
            </nav>
          </div>
        </div>
      </header>
      <section className="container">
        <div className="card shadow-lg border-0 overflow-hidden">
          <div className="row text-center align-items-stretch">
            {/* Formulario */}
            <div className="col-md-8 d-flex flex-column align-items-center justify-content-center my-5">
              <form onSubmit={handleSubmit}>
                <p className="parrafo fs-5 text-black merriweather-font text-center">
                  ¡Vibra Positiva Pijamas!
                  <br />
                  Registra un nuevo producto en el inventario.
                </p>

                {/* Nombre Producto */}
                <div className="mb-3 text-start w-100">
                  <label htmlFor="nombreProducto" className="form-label">
                    Nombre del Producto
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="nombreProducto"
                    name="NombreProducto"
                    placeholder="Ej: Pijama Unicornio"
                    required
                    value={formData.NombreProducto}
                    onChange={handleChange}
                  />
                </div>

                {/* Color */}
                <div className="mb-3 text-start w-100">
                  <label htmlFor="color" className="form-label">
                    Color
                  </label>
                  <div className="d-flex align-items-center gap-2">
                    <select
                      className="form-select"
                      id="color"
                      name="Color"
                      required
                      value={formData.Color}
                      onChange={handleChange}
                    >
                      <option value="" disabled>
                        Seleccione un color
                      </option>
                      {colores.map((color) => (
                        <option key={color} value={color}>
                          {color}
                        </option>
                      ))}
                    </select>
                    {formData.Color && (
                      <div
                        style={{
                          width: "40px",
                          height: "40px",
                          minWidth: "40px",
                          borderRadius: "50%",
                          backgroundColor: getColorCode(formData.Color),
                          border: "2px solid #ddd",
                          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                        }}
                        title={formData.Color}
                      ></div>
                    )}
                  </div>
                </div>

                {/* Talla */}
                <div className="mb-3 text-start w-100">
                  <label htmlFor="talla" className="form-label">
                    Talla
                  </label>
                  <select
                    className="form-select"
                    id="talla"
                    name="Talla"
                    required
                    value={formData.Talla}
                    onChange={handleChange}
                  >
                    <option value="" disabled>
                      Seleccione una talla
                    </option>
                    <option value="2">2</option>
                    <option value="4">4</option>
                    <option value="6">6</option>
                    <option value="8">8</option>
                    <option value="10">10</option>
                    <option value="12">12</option>
                    <option value="14">14</option>
                    <option value="16">16</option>
                    <option value="XS">XS</option>
                    <option value="S">S</option>
                    <option value="M">M</option>
                    <option value="L">L</option>
                    <option value="XL">XL</option>
                  </select>
                </div>

                {/* Stock */}
                <div className="mb-3 text-start w-100">
                  <label htmlFor="stock" className="form-label">
                    Stock
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="stock"
                    name="Stock"
                    placeholder="Ej: 10, 20, 30"
                    required
                    min="0"
                    value={formData.Stock}
                    onChange={handleChange}
                  />
                </div>

                {/* Precio */}
                <div className="mb-3 text-start w-100">
                  <label htmlFor="precio" className="form-label">
                    Precio (COP)
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="precio"
                    name="Precio"
                    placeholder="Ej: 50000"
                    required
                    min="0"
                    step="100"
                    value={formData.Precio}
                    onChange={handleChange}
                  />
                </div>

                {/* Botón */}
                <div className="d-grid mt-5">
                  <button type="submit" className="boton">
                    Registrar Producto
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
      <FooterLine />
    </>
  );
}

export default RegistroProductos;