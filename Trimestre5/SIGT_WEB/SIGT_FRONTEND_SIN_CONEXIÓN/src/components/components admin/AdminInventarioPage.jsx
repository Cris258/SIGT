import React from "react";


export default function AdminInventarioPage() {
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
      <div className="d-flex flex-column flex-md-row">
        {/* SIDEBAR */}
        <div className="sidebar collapse d-md-block p-3" id="sidebarMenu">
          <div className="text-center text-white mb-4">
            <i className="bi bi-person-circle" style={{ fontSize: "3rem" }}></i>
            <h5 className="fw-bold mt-2">Nombre Administrador</h5>
          </div>

          <ul className="nav flex-column text-center">
           
           

          

            <hr className="bg-light" />

            <li className="nav-item">
              <a href="admin" className="nav-link custom-link">
                Empleados
              </a>
            </li>
            <li className="nav-item">
              <a
                href="adminInventario"
                className="nav-link custom-link active"
              >
                Inventario
              </a>
            </li>
            <li className="nav-item">
              <a href="AdminClientes.php" className="nav-link custom-link">
                Clientes
              </a>
            </li>

            <hr className="bg-light" />

            <li className="nav-item">
              <a
                href="listaUsuarios"
                className="nav-link custom-link"
              >
                Administrar Inventario
              </a>
            </li>
            <li className="nav-item">
              <a
                href="#"
                className="nav-link custom-link"
                data-bs-toggle="modal"
                data-bs-target="#modalReporteStock"
              >
                Generar Reporte del Stock
              </a>
            </li>
          </ul>
        </div>

        {/* MAIN */}
        <main className="flex-grow-1 p-4 bg-light">
          {/* FILA 1: TABLA DE INVENTARIO */}
          <div className="row g-4 mb-4">
            <div className="col-12">
              <div className="card shadow-sm">
                <div className="card-header d-flex justify-content-between align-items-center">
                  <span className="fw-bold">Inventario de Pijamas</span>
                  <div className="btn-group">
                    <button
                      className="btn btn-success btn-sm"
                      id="btnAgregarProducto"
                      title="Crear"
                    >
                      <i className="bi bi-plus-circle"></i>
                    </button>
                  </div>
                </div>
                <div className="card-body table-responsive">
                  <table className="table table-bordered align-middle text-center">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Nombre Producto</th>
                        <th>Categoria</th>
                        <th>Talla</th>
                        <th>Stock</th>
                        <th>Precio</th>
                        <th>Acciones</th>
                      </tr>
                    </thead>
                    <tbody id="tablaInventario">
                      <tr id="producto-1">
                        <td>1</td>
                        <td>Pijama de Estrellas</td>
                        <td>Mujer</td>
                        <td>S</td>
                        <td>12</td>
                        <td>$ 45.000 COP</td>
                        <td>
                          <button
                            className="btn btn-sm btn-warning btn-editar"
                            data-id="producto-1"
                          >
                            <i className="bi bi-pencil"></i>
                          </button>
                          <button
                            className="btn btn-sm btn-danger btn-eliminar"
                            data-id="producto-1"
                          >
                            <i className="bi bi-trash"></i>
                          </button>
                        </td>
                      </tr>
                      <tr id="producto-2">
                        <td>2</td>
                        <td>Pijama Gamer</td>
                        <td>Hombre</td>
                        <td>L</td>
                        <td>8</td>
                        <td>$ 48.500 COP</td>
                        <td>
                          <button
                            className="btn btn-sm btn-warning btn-editar"
                            data-id="producto-2"
                          >
                            <i className="bi bi-pencil"></i>
                          </button>
                          <button
                            className="btn btn-sm btn-danger btn-eliminar"
                            data-id="producto-2"
                          >
                            <i className="bi bi-trash"></i>
                          </button>
                        </td>
                      </tr>
                      <tr id="producto-3">
                        <td>3</td>
                        <td>Pijama Unicornios</td>
                        <td>Niña</td>
                        <td>6</td>
                        <td>15</td>
                        <td>$ 39.900 COP</td>
                        <td>
                          <button
                            className="btn btn-sm btn-warning btn-editar"
                            data-id="producto-3"
                          >
                            <i className="bi bi-pencil"></i>
                          </button>
                          <button
                            className="btn btn-sm btn-danger btn-eliminar"
                            data-id="producto-3"
                          >
                            <i className="bi bi-trash"></i>
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          {/* FILA 2: ESTADÍSTICAS, TOP Y CALENDARIO */}
          <div className="row g-4 align-items-stretch text-center">
            {/* Estadísticas */}
            <div className="col-12 col-md-4 d-flex">
              <div className="card shadow-sm w-100 d-flex flex-column">
                <div className="card-header fw-bold bg-info text-white">
                  Estadísticas
                </div>
                <div className="card-body d-flex justify-content-center align-items-center">
                  <canvas
                    id="graficoInventario"
                    style={{ maxHeight: "250px", maxWidth: "250px" }}
                  ></canvas>
                </div>
              </div>
            </div>

            {/* Top 5 */}
            <div className="col-12 col-md-4 d-flex">
              <div className="card shadow-sm w-100 d-flex flex-column">
                <div className="card-header fw-bold bg-info text-white">
                  Top 5 Productos en Stock
                </div>
                <div className="card-body">
                  <ol
                    className="list-group list-group-numbered"
                    id="listaTopProductos"
                  ></ol>
                </div>
              </div>
            </div>

            {/* Calendario */}
            <div className="col-12 col-md-4 d-flex">
              <div className="card shadow-sm w-100 d-flex flex-column">
                <div className="card-header fw-bold bg-info text-white">
                  Calendario
                </div>
                <div className="card-body p-0 flex-grow-1">
                  <iframe
                    src="https://calendar.google.com/calendar/embed?src=es.co%23holiday%40group.v.calendar.google.com&ctz=America%2FBogota"
                    style={{ border: 0, width: "100%", height: "100%" }}
                    frameBorder="0"
                    scrolling="no"
                    title="Calendario"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
 {/* MODAL: ACTUALIZAR DATOS */}
    <div className="modal fade" id="modalActualizarDatos" tabIndex={-1} aria-labelledby="modalActualizarDatosLabel" aria-hidden="true">
      <div className="modal-dialog modal-lg">
        <div className="modal-content rounded-3 shadow">
          <div className="modal-header text-black">
            <h5 className="modal-title" id="modalActualizarDatosLabel">Actualizar Datos</h5>
            <button type="button" className="btn-close btn-close-black" data-bs-dismiss="modal" aria-label="Cerrar" />
          </div>
          <form id="formActualizarDatos">
            <div className="modal-body bg-light">
              <div className="container">
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label">Primer Nombre</label>
                    <input type="text" className="form-control" name="primerNombre" />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Edad</label>
                    <input type="number" className="form-control" name="edad" />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Segundo Nombre</label>
                    <input type="text" className="form-control" name="segundoNombre" />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Correo Electrónico</label>
                    <input type="email" className="form-control" name="correo" />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Primer Apellido</label>
                    <input type="text" className="form-control" name="primerApellido" />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Número de Teléfono</label>
                    <input type="tel" className="form-control" name="telefono" />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Segundo Apellido</label>
                    <input type="text" className="form-control" name="segundoApellido" />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Dirección</label>
                    <input type="text" className="form-control" name="direccion" />
                  </div>
                </div>
                <div className="text-center mt-4">
                  <button type="submit" className="btn custom-btn px-4">Finalizar</button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
    {/* Modal: Cambiar Contraseña */}
    <div className="modal fade" id="modalCambiarContraseña" tabIndex={-1} aria-labelledby="modalCambiarContraseñaLabel" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content shadow-lg">
          <div className="modal-header">
            <h5 className="modal-title" id="modalCambiarContraseñaLabel">Cambiar Contraseña</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Cerrar" />
          </div>
          <div className="modal-body text-center px-4 py-4">
            <form id="formCambiarContraseña">
              <div className="mb-3 text-start">
                <label className="form-label">Contraseña Antigua</label>
                <div className="input-group">
                  <input type="password" className="form-control" id="passwordAntigua" required />
                  <button type="button" className="btn btn-outline-secondary toggle-password" data-input="passwordAntigua">
                    <i className="bi bi-eye" />
                  </button>
                </div>
              </div>
              <div className="mb-3 text-start">
                <label className="form-label">Contraseña Nueva</label>
                <div className="input-group">
                  <input type="password" className="form-control" id="passwordNueva" required />
                  <button type="button" className="btn btn-outline-secondary toggle-password" data-input="passwordNueva">
                    <i className="bi bi-eye" />
                  </button>
                </div>
              </div>
              <div className="mb-3 text-start">
                <label className="form-label">Repetir Contraseña</label>
                <div className="input-group">
                  <input type="password" className="form-control" id="passwordRepetir" required />
                  <button type="button" className="btn btn-outline-secondary toggle-password" data-input="passwordRepetir">
                    <i className="bi bi-eye" />
                  </button>
                </div>
                <small id="errorCoincidencia" className="text-danger d-none">Las contraseñas no coinciden.</small>
              </div>
              <button type="submit" className="btn custom-btn text-black">Finalizar</button>
            </form>
            <a href="#" id="enlaceRecuperar" className="text-decoration-underline text-primary d-block mt-3">
              ¿Olvidó su contraseña?
            </a>
          </div>
        </div>
      </div>
    </div>
    {/* Modal: Contraseña cambiada con éxito */}
    <div className="modal fade" id="modalExito" tabIndex={-1} aria-labelledby="modalExitoLabel" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header text-black">
            <h5 className="modal-title w-100 text-center" id="modalExitoLabel">¡Éxito!</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" />
          </div>
          <div className="modal-body text-center">
            Tu contraseña ha sido cambiada correctamente. <br /> Por su seguridad inicie sesión nuevamente.
          </div>
          <div className="modal-footer d-flex justify-content-center">
            <a href="1. index.php" className="btn custom-btn">Aceptar</a>
          </div>
        </div>
      </div>
    </div>
    {/* Modal: Recuperar Contraseña */}
    <div className="modal fade" id="modalRecuperarCorreo" tabIndex={-1} aria-labelledby="modalRecuperarCorreoLabel" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content shadow-lg">
          <div className="modal-header">
            <h5 className="modal-title" id="modalRecuperarCorreoLabel">Recuperar Contraseña</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Cerrar" />
          </div>
          <div className="modal-body text-center px-4 py-4">
            <form id="formRecuperarCorreo" className="text-start">
              <div className="mb-3">
                <label htmlFor="emailRecuperar" className="form-label">Correo electrónico registrado</label>
                <input type="email" id="emailRecuperar" className="form-control" required placeholder="ejemplo@correo.com" />
              </div>
              <div className="d-grid">
                <button type="submit" className="btn custom-btn text-black">Enviar clave temporal</button>
              </div>
            </form>
            <div id="mensajeErrorCorreo" className="mt-3 text-danger d-none text-start">Correo inválido o no registrado.
            </div>
          </div>
        </div>
      </div>
    </div>
    {/* Modal: Clave Temporal Generada */}
    <div className="modal fade" id="modalClaveTemporal" tabIndex={-1} aria-labelledby="modalClaveTemporalLabel" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content shadow-lg">
          <div className="modal-header">
            <h5 className="modal-title" id="modalClaveTemporalLabel">Clave Temporal</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Cerrar" />
          </div>
          <div className="modal-body text-center px-4 py-4">
            <p>Su nueva clave temporal es:</p>
            <div className="d-flex justify-content-center align-items-center gap-3 mb-3">
              <span id="claveTemporalOculta" className="fs-4">********</span>
              <span id="claveTemporalReal" className="fs-4 d-none" />
              <button type="button" id="btnToggleClave" className="btn btn-sm btn-outline-dark">
                <i id="iconoToggleClave" className="bi bi-eye" />
              </button>
            </div>
            <p className="text-muted">Por favor cámbiala cuanto antes.</p>
          </div>
        </div>
      </div>
    </div>
    {/* MODAL: ASIGNAR TAREA */}
    <div className="modal fade" id="modalAsignarTarea" tabIndex={-1} aria-labelledby="modalAsignarTareaLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content rounded-3 shadow">
          <div className="modal-header text-black">
            <h5 className="modal-title" id="modalAsignarTareaLabel">Asignar Tarea a Empleado</h5>
            <button type="button" className="btn-close btn-close-black" data-bs-dismiss="modal" aria-label="Cerrar" />
          </div>
          <form id="formAsignarTarea">
            <div className="modal-body">
              <div className="mb-3">
                <label className="form-label">ID Empleado</label>
                <input type="number" className="form-control" id="idEmpleadoAsignar" required />
              </div>
              <div className="mb-3">
                <label className="form-label">Tarea</label>
                <input type="text" className="form-control" id="tarea" required />
              </div>
              <div className="mb-3">
                <label htmlFor="tipoTarea">Tipo de Tarea</label>
                <select id="tipoTarea" className="form-select">
                  <option disabled selected>Seleccione el tipo</option>
                  <option value="Corte">Corte</option>
                  <option value="Confección">Confección</option>
                  <option value="Entrega">Entrega</option>
                  <option value="Control de calidad">Control de calidad</option>
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="prioridadTarea">Prioridad</label>
                <select id="prioridadTarea" className="form-select" required>
                  <option disabled selected>Seleccione una prioridad</option>
                  <option value="Alta">Alta</option>
                  <option value="Media">Media</option>
                  <option value="Baja">Baja</option>
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label">Descripción</label>
                <input type="text" className="form-control" id="descripcionTarea" required />
              </div>
              <div className="mb-3">
                <label className="form-label">Fecha Límite de Entrega</label>
                <input type="date" className="form-control" id="fechaEntregaAsignar" required />
              </div>
            </div>
            <div className="modal-footer d-flex justify-content-center">
              <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Cancelar</button>
              <button type="submit" className="btn custom-btn text-black">Asignar</button>
            </div>
          </form>
        </div>
      </div>
    </div>
    {/* MODAL: ERROR */}
    <div className="modal fade" id="modalErrorAsignar" tabIndex={-1} aria-labelledby="modalErrorLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content rounded-3 shadow">
          <div className="modal-header bg-danger text-white">
            <h5 className="modal-title" id="modalErrorLabel">Error</h5>
            <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Cerrar" />
          </div>
          <div className="modal-body text-center">
            <p>No se encontró un empleado con ese ID.</p>
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}
