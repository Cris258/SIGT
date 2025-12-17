import React from "react";

const AdminPage = () => {
  return (
    <div>
  {/* BOTÓN HAMBURGUESA SOLO EN MÓVIL */}
  <nav className="navbar navbar-light d-md-none">
    <div className="container-fluid">
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#sidebarMenu">
        <span className="navbar-toggler-icon" />
      </button>
    </div>
  </nav>
  {/* CONTENEDOR PRINCIPAL */}
  <div className="d-flex flex-column flex-md-row">
    {/* SIDEBAR */}
<div className="sidebar collapse d-md-block p-3" id="sidebarMenu">
  <div className="text-center text-white mb-4">
    <i className="bi bi-person-circle" style={{ fontSize: '3rem' }} />
    <h5 className="fw-bold mt-2">Nombre Administrador</h5>
  </div>
  <ul className="nav flex-column text-center">
    <li className="nav-item">
      <a href="#" className="nav-link custom-link" data-bs-toggle="modal" data-bs-target="#modalActualizarDatos">
        Actualizar Datos
      </a>
    </li>
    <li className="nav-item">
      <a href="#" className="nav-link custom-link" data-bs-toggle="modal" data-bs-target="#modalCambiarContraseña">
        Cambiar Contraseña
      </a>
    </li>
    <li className="nav-item">
      <a href="ListaUsuarios" className="nav-link custom-link">Registro de Usuarios</a>
    </li>
    <hr className="bg-light" />
    <li className="nav-item">
      <a href="admin" className="nav-link custom-link active">Empleados</a>
    </li>
    <li className="nav-item">
      <a href="adminInventario" className="nav-link custom-link">Inventario</a>
    </li>
    <li className="nav-item">
      <a href="AdminClientes.php" className="nav-link custom-link">Clientes</a>
    </li>
    <hr className="bg-light" />
    <li className="nav-item">
      <a href="adminEmpleado" className="nav-link custom-link">Administrar Empleados</a>
    </li>
    <li className="nav-item">
      <a href="#" className="nav-link custom-link" data-bs-toggle="modal" data-bs-target="#modalAsignarTarea">
        Asignar Tarea
      </a>
    </li>
    <li className="nav-item">
      <a href="#" className="nav-link custom-link" data-bs-toggle="modal" data-bs-target="#modalReporteEmpleado">
        Generar Reporte de Empleados y Tareas
      </a>
    </li>
  </ul>
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
    
    {/* MAIN */}
    <main className="flex-grow-1 p-4 bg-light">
      {/* FILA 1: TABLA DE EMPLEADOS */}
      <div className="row g-4 mb-4">
        <div className="col-12">
          <div className="card shadow-sm">
            <div className="card-header d-flex justify-content-between align-items-center">
              <span className="fw-bold">Empleados y Tareas</span>
              <div className="btn-group">
                <button className="btn btn-success btn-sm" id="btnAgregarEmpleado" title="Crear">
                  <i className="bi bi-person-plus" />
                </button>
              </div>
            </div>
            <div className="card-body table-responsive">
              <table className="table table-bordered align-middle text-center">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Empleado</th>
                    <th>Rol</th>
                    <th>Tareas Hechas</th>
                    <th>Pendientes</th>
                    <th>Total de Tareas</th>
                    <th>Próxima Entrega</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody id="tablaEmpleados">
                  <tr id="empleado-1">
                    <td>1</td>
                    <td>Cristian Valencia</td>
                    <td>Corte</td>
                    <td>5</td>
                    <td>2</td>
                    <td>7</td>
                    <td>2025-07-10</td>
                    <td>
                      <button className="btn btn-sm btn-warning btn-editar" data-id="empleado-1"><i className="bi bi-pencil" /></button>
                      <button className="btn btn-sm btn-danger btn-eliminar" data-id="empleado-1"><i className="bi bi-trash" /></button>
                    </td>
                  </tr>
                  <tr id="empleado-2">
                    <td>2</td>
                    <td>Juan Cruz</td>
                    <td>Domiciliario</td>
                    <td>8</td>
                    <td>1</td>
                    <td>9</td>
                    <td>2025-07-12</td>
                    <td>
                      <button className="btn btn-sm btn-warning btn-editar" data-id="empleado-2"><i className="bi bi-pencil" /></button>
                      <button className="btn btn-sm btn-danger btn-eliminar" data-id="empleado-2"><i className="bi bi-trash" /></button>
                    </td>
                  </tr>
                  <tr id="empleado-3">
                    <td>3</td>
                    <td>Valeria Meza</td>
                    <td>Ventas</td>
                    <td>8</td>
                    <td>1</td>
                    <td>9</td>
                    <td>2025-07-12</td>
                    <td>
                      <button className="btn btn-sm btn-warning btn-editar" data-id="empleado-3"><i className="bi bi-pencil" /></button>
                      <button className="btn btn-sm btn-danger btn-eliminar" data-id="empleado-3"><i className="bi bi-trash" /></button>
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
        <div className="col-12 col-md-4 d-flex flex-column">
          <div className="card shadow-sm h-100">
            <div className="card-header fw-bold">Estadísticas</div>
            <div className="card-body">
              <canvas id="graficoTareas" width={200} height={200} />
            </div>
          </div>
        </div>
        {/* Top 5 Empleados */}
        <div className="col-12 col-md-4 d-flex flex-column">
          <div className="card shadow-sm h-100">
            <div className="card-header fw-bold">Top 5 Empleados</div>
            <div className="card-body">
              <ol className="list-group list-group-numbered" id="listaTopEmpleados">
                {/* Se llena con JS */}
              </ol>
            </div>
          </div>
        </div>
        {/* Calendario */}
        <div className="col-12 col-md-4 d-flex flex-column">
          <div className="card shadow-sm h-100">
            <div className="card-header fw-bold">Calendario</div>
            <div className="card-body p-0">
              <iframe src="https://calendar.google.com/calendar/embed?src=es.co%23holiday%40group.v.calendar.google.com&ctz=America%2FBogota" style={{border: 0}} width="100%" height={300} frameBorder={0} scrolling="no" />
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
  {/* MODAL PARA CREAR/EDITAR EMPLEADO */}
  <div className="modal fade" id="empleadoModal" tabIndex={-1} aria-labelledby="empleadoModalLabel" aria-hidden="true">
    <div className="modal-dialog">
      <div className="modal-content">
        <form id="formEmpleado">
          <div className="modal-header text-black">
            <h5 className="modal-title" id="empleadoModalLabel">Agregar Tarea</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Cerrar" />
          </div>
          <div className="modal-body">
            <input type="hidden" id="modo" defaultValue="crear" />
            <input type="hidden" id="filaEditar" defaultValue />
            <div className="mb-3">
              <label htmlFor="nombreEmpleado" className="form-label">Nombre</label>
              <input type="text" className="form-control" id="nombreEmpleado" required />
            </div>
            <div className="mb-3">
              <label htmlFor="rolEmpleado" className="form-label">Rol</label>
              <select className="form-select" id="rolEmpleado" required>
                <option value disabled selected>Seleccione un rol</option>
                <option value="Corter">Corte</option>
                <option value="Confección">Confección</option>
                <option value="Ventas">Ventas</option>
                <option value="Recepción de Pedidos">Recepción de Pedidos</option>
                <option value="Operario de Fileteadora">Operaria de Fileteadora</option>
                <option value="Operaria de Máquina Collarín">Operaria de Máquina Collarín</option>
                <option value="Domiciliario">Domiciliario</option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="hechasEmpleado" className="form-label">Tareas Hechas</label>
              <input type="number" className="form-control" id="hechasEmpleado" required />
            </div>
            <div className="mb-3">
              <label htmlFor="pendientesEmpleado" className="form-label">Tareas Pendientes</label>
              <input type="number" className="form-control" id="pendientesEmpleado" required />
            </div>
            <div className="mb-3">
              <label htmlFor="entregaEmpleado" className="form-label">Fecha de Entrega</label>
              <input type="date" className="form-control" id="entregaEmpleado" required />
            </div>
            <div className="modal-footer d-flex justify-content-center">
              <button type="button" className="btn btn-danger text-white" data-bs-dismiss="modal">Cancelar</button>
              <button type="submit" className="btn custom-btn text-black">Guardar</button>  
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
  {/*Modal Eiimminar Confirmada*/}
  <div className="modal fade" id="modalEliminar" tabIndex={-1} aria-labelledby="modalEliminarLabel" aria-hidden="true">
    <div className="modal-dialog modal-dialog-centered">
      <div className="modal-content">
        <div className="modal-header bg-danger text-white">
          <h5 className="modal-title w-100 text-center" id="modalEliminarLabel">¿Estás seguro?</h5>
          <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Cerrar" />
        </div>
        <div className="modal-body text-center">
          Esta acción no se puede deshacer<br />¿Deseas eliminar este empleado?
        </div>
        <div className="modal-footer justify-content-center">
          <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
          <button type="button" className="btn btn-danger" id="confirmarEliminar">Eliminar</button>
        </div>
      </div>
    </div>
  </div>
  {/* Modal Eliminación Exitosa */}
  <div className="modal fade" id="modalEliminado" tabIndex={-1} aria-labelledby="modalEliminadoLabel" aria-hidden="true">
    <div className="modal-dialog modal-dialog-centered">
      <div className="modal-content border-success">
        <div className="modal-header text-blac">
          <h5 className="modal-title" id="modalEliminadoLabel">¡Eliminado!</h5>
          <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Cerrar" />
        </div>
        <div className="modal-body text-center">
          El empleado ha sido eliminado exitosamente.
        </div>
        <div className="modal-footer justify-content-center">
          <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Aceptar</button>
        </div>
      </div>
    </div>
  </div>
  {/* MODAL GENERAR REPORTE */}
  <div className="modal fade" id="modalReporteEmpleado" tabIndex={-1} aria-labelledby="modalReporteEmpleadoLabel" aria-hidden="true">
    <div className="modal-dialog">
      <div className="modal-content shadow">
        <div className="modal-header text-black">
          <h5 className="modal-title" id="modalReporteEmpleadoLabel">Generar Reporte de Empleados y Tareas</h5>
          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Cerrar" />
        </div>
        <div className="modal-body">
          <form id="formVerificarAdministrador">
            <div className="mb-3">
              <label htmlFor="docAdmin" className="form-label">Número de documento</label>
              <input type="number" className="form-control" id="docAdmin" required />
            </div>
            <div className="mb-3">
              <label htmlFor="claveAdmin" className="form-label">Clave de administrador</label>
              <input type="password" className="form-control" id="claveAdmin" required />
            </div>
          </form>
          <div id="mensajeError" className="text-danger d-none">⚠️ Ambos campos son obligatorios.</div>
        </div>
        <div className="modal-footer d-flex justify-content-center">
          <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
          <button type="button" className="btn custom-btn text-black" id="btnDescargarPDF">Descargar PDF</button>
        </div>
      </div>
    </div>
  </div>

</div>

  );
};

export default AdminPage;
