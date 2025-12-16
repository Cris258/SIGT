import React, { useState } from "react";
import Swal from "sweetalert2";
import "../styles/2. styleRegistro.css";

function Login() {
  const [rol, setRol] = useState("");
  const [tipoDocumento, setTipoDocumento] = useState("");
  const [numeroDocumento, setNumeroDocumento] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => setShowPassword(!showPassword);

  const handleSubmit = (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Inicio no válido",
      text: "Usuario o contraseña incorrecta",
      icon: "error",
    });
  };

  return (
    <>
      <section className="container my-5">
        <div className="card shadow-lg border-0 overflow-hidden">
          <div className="container">
            <div className="row text-center align-items-stretch">
              <div className="col-md-8 d-flex flex-column align-items-center justify-content-center my-4">
                <form onSubmit={handleSubmit}>
                  <p className="parrafo fs-5 text-black merriweather-font">
                    ¡Bienvenido a Vibra Positiva Pijamas!
                    <br />
                    Inicia Sesión para tener acceso a nuestro contenido.
                  </p>

                  <div className="mb-3">
                    <label className="form-label text-start d-block">Rol</label>
                    <select
                      className="form-select"
                      value={rol}
                      onChange={(e) => setRol(e.target.value)}
                      required
                    >
                      <option value="" disabled>
                        Seleccione su rol
                      </option>
                      <option value="Administrador">Administrador</option>
                      <option value="Empleado">Empleado</option>
                      <option value="Cliente">Cliente</option>
                    </select>
                  </div>

                  <div className="mb-3">
                    <label className="form-label text-start d-block">
                      Tipo Documento
                    </label>
                    <select
                      className="form-select"
                      value={tipoDocumento}
                      onChange={(e) => setTipoDocumento(e.target.value)}
                      required
                    >
                      <option value="" disabled>
                        Seleccione su tipo de documento
                      </option>
                      <option value="CC">CC</option>
                      <option value="TI">TI</option>
                      <option value="CE">CE</option>
                      <option value="Pasaporte">Pasaporte</option>
                    </select>
                  </div>

                  <div className="mb-3">
                    <label className="form-label text-start d-block">
                      Número Documento
                    </label>
                    <input
                      type="number"
                      className="form-control no-spinner"
                      value={numeroDocumento}
                      onChange={(e) => setNumeroDocumento(e.target.value)}
                      placeholder="Escriba su número de documento"
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label text-start d-block">
                      Contraseña
                    </label>
                    <div className="input-group">
                      <input
                        type={showPassword ? "text" : "password"}
                        className="form-control"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
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

                  <div className="d-grid mb-2">
                    <button type="submit" className="boton-login">
                      Iniciar sesión
                    </button>
                  </div>

                  <div className="text-center mb-1">
                    <a href="/RecuperarContraseña" className="link-login">
                      ¿Olvidó su contraseña?
                    </a>
                  </div>

                  <div className="text-center">
                    <p>
                      No te has registrado
                      <a href="/registro" className="link-login">
                        {" "}
                        Registrate
                      </a>{" "}
                      aqui
                    </p>
                  </div>
                </form>
              </div>

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

export default Login;
