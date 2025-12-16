import React, { useState } from "react";

import "../styles/2. styleRegistro.css";

function Registro() {
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <section className="container my-5">
        <div className="card shadow-lg border-0 overflow-hidden">
          <div className="container">
            <div className="row text-center align-items-stretch">
              {/* Formulario */}
              <div className="col-md-8 d-flex flex-column align-items-center justify-content-center my-4">
                <form>
                  <p className="parrafo fs-5 text-black merriweather-font">
                    ¡Bienvenido a Vibra Positiva Pijamas!
                    <br />
                    Regístrate para formar parte de nuestro equipo.
                  </p>

                  {/* Rol */}
                  <div className="mb-3">
                    <label
                      htmlFor="rol"
                      className="form-label text-start d-block"
                    >
                      Rol
                    </label>
                    <select
                      className="form-select"
                      id="rol"
                      name="rolPersona"
                      required
                    >
                      <option value="" disabled selected>
                        Seleccione su rol
                      </option>

                      <option value="Cliente">Cliente</option>
                    </select>
                  </div>

                  {/* Primer Nombre */}
                  <div className="mb-3">
                    <label
                      htmlFor="nombre"
                      className="form-label text-start d-block"
                    >
                      Primer Nombre
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="nombre"
                      name="Primer_Nombre"
                      placeholder="Escriba su nombre"
                      required
                    />
                  </div>

                  {/* Segundo Nombre */}
                  <div className="mb-3">
                    <label
                      htmlFor="segundoNombre"
                      className="form-label text-start d-block"
                    >
                      Segundo Nombre
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="segundoNombre"
                      name="Segundo_Nombre"
                      placeholder="Escriba su segundo nombre (opcional)"
                    />
                  </div>

                  {/* Primer Apellido */}
                  <div className="mb-3">
                    <label
                      htmlFor="apellido"
                      className="form-label text-start d-block"
                    >
                      Primer Apellido
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="apellido"
                      name="Primer_Apellido"
                      placeholder="Escriba su primer apellido"
                      required
                    />
                  </div>

                  {/* Segundo Apellido */}
                  <div className="mb-3">
                    <label
                      htmlFor="segundoApellido"
                      className="form-label text-start d-block"
                    >
                      Segundo Apellido
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="segundoApellido"
                      name="Segundo_Apellido"
                      placeholder="Escriba su segundo apellido (opcional)"
                    />
                  </div>

                  {/* Tipo Documento */}
                  <div className="mb-3">
                    <label
                      htmlFor="documento"
                      className="form-label text-start d-block"
                    >
                      Tipo Documento
                    </label>
                    <select
                      className="form-select"
                      id="documento"
                      name="TipoDocumento"
                      required
                    >
                      <option value="" disabled selected>
                        Seleccione su tipo de documento
                      </option>
                      <option value="CC">CC</option>
                      <option value="TI">TI</option>
                      <option value="CE">CE</option>
                      <option value="Pasaporte">Pasaporte</option>
                    </select>
                  </div>

                  {/* Número Documento */}
                  <div className="mb-3">
                    <label
                      htmlFor="numDocumento"
                      className="form-label text-start d-block"
                    >
                      Número Documento
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="numDocumento"
                      name="NumeroDocumento"
                      placeholder="Escriba su número de documento"
                      required
                    />
                  </div>

                  {/* Correo */}
                  <div className="mb-3">
                    <label
                      htmlFor="correo"
                      className="form-label text-start d-block"
                    >
                      Correo electrónico
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="correo"
                      name="Correo"
                      placeholder="sucorreo@ejemplo.com"
                      required
                    />
                  </div>

                  {/* Teléfono */}
                  <div className="mb-3">
                    <label
                      htmlFor="telefono"
                      className="form-label text-start d-block"
                    >
                      Número de Teléfono
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="telefono"
                      name="Telefono"
                      placeholder="Ej: 3123456789"
                      required
                    />
                  </div>

                  {/* Contraseña con toggle */}
                  <div className="mb-3">
                    <label
                      htmlFor="clave"
                      className="form-label text-start d-block"
                    >
                      Contraseña
                    </label>
                    <div className="input-group">
                      <input
                        type={showPassword ? "text" : "password"}
                        id="clave"
                        name="Contrasena"
                        className="form-control"
                        placeholder="Ingrese su contraseña"
                        required
                      />
                      <button
                        className="btn btn-outline-secondary"
                        type="button"
                        onClick={togglePassword}
                      >
                        {showPassword ? (
                          <i className="bi bi-eye-slash"></i>
                        ) : (
                          <i className="bi bi-eye"></i>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Botón */}
                  <div className="d-grid">
                    <button type="submit" className="boton">
                      Registrarse
                    </button>
                  </div>
                </form>
              </div>

              {/* Imagen lateral */}
              <div className="col-md-4 p-0">
                <img
                  src="img/Logo Vibra Positiva.jpg"
                  className="img-fluid img h-100"
                  alt="Diseño"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Registro;
