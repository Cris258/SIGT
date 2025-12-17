import React, { useEffect, useRef, useState } from "react";

// AdminClients.jsx
// Requiere Bootstrap CSS y Bootstrap Icons en public/index.html:
// <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
// <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css" rel="stylesheet">
// También incluye en index.html: <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>

export default function AdminClients() {
  // Datos iniciales (copiados del HTML original)
  const initialClients = [
    {
      id: 1,
      nombre: "María Gómez",
      correo: "maria@gmail.com",
      telefono: "3124567890",
      direccion: "Calle 123 #45-67",
      departamento: "Bogota",
      productosAdquiridos: 12,
    },
    {
      id: 2,
      nombre: "Nicolas Pérez",
      correo: "nicolas.pz@hotmail.com",
      telefono: "3109876543",
      direccion: "Carrera 9 #78-45",
      departamento: "Cali",
      productosAdquiridos: 4,
    },
    {
      id: 3,
      nombre: "Esteban Andrade",
      correo: "esteban.andra@gmail.com",
      telefono: "3001234567",
      direccion: "Calle 76 h #45 - 67",
      departamento: "Bogota",
      productosAdquiridos: 7,
    },
  ];

  const [clients, setClients] = useState(initialClients);
  const [showClientModal, setShowClientModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    id: null,
    nombre: "",
    correo: "",
    telefono: "",
    direccion: "",
    departamento: "",
    productosAdquiridos: "",
  });

  const [toDelete, setToDelete] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // Cambiar contraseña
  const [showChangePass, setShowChangePass] = useState(false);
  const [passwords, setPasswords] = useState({ antigua: "", nueva: "", repetir: "" });
  const [passError, setPassError] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Recuperar contraseña
  const [showRecuperar, setShowRecuperar] = useState(false);
  const [emailRecuperar, setEmailRecuperar] = useState("");
  const [mensajeRecuperar, setMensajeRecuperar] = useState(null);
  const [claveTemporal, setClaveTemporal] = useState("");
  const [showClaveTemporal, setShowClaveTemporal] = useState(false);

  // Reporte (simulamos descarga CSV)
  const [docAdmin, setDocAdmin] = useState("");
  const [claveAdmin, setClaveAdmin] = useState("");
  const [mensajeErrorReporte, setMensajeErrorReporte] = useState(null);

  // Top clientes (calculado)
  const topClientes = [...clients].sort((a, b) => b.productosAdquiridos - a.productosAdquiridos).slice(0, 5);

  // Canvas ref para gráfico sencillo
  const canvasRef = useRef(null);

  useEffect(() => {
    drawChart();
  }, [clients]);

  function drawChart() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const total = clients.reduce((s, c) => s + Number(c.productosAdquiridos), 0) || 1;
    const start = 0;
    // dibujar donut simple: tomamos solo primeros 5 clientes para segmentos
    const segments = clients.map((c) => ({ label: c.nombre, value: Number(c.productosAdquiridos) }));
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const cx = canvas.width / 2;
    const cy = canvas.height / 2;
    const radius = Math.min(cx, cy) - 10;
    let angle = -Math.PI / 2;

    // paleta simple (no especificar colores globales; el usuario puede personalizar si quiere)
    const palette = ["#4e73df", "#1cc88a", "#36b9cc", "#f6c23e", "#e74a3b", "#858796"];

    segments.forEach((seg, i) => {
      const slice = (seg.value / total) * Math.PI * 2;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, radius, angle, angle + slice);
      ctx.closePath();
      ctx.fillStyle = palette[i % palette.length];
      ctx.fill();
      angle += slice;
    });

    // donut hole
    ctx.beginPath();
    ctx.fillStyle = "#ffffff";
    ctx.arc(cx, cy, radius * 0.6, 0, Math.PI * 2);
    ctx.fill();

    // texto central
    ctx.fillStyle = "#222";
    ctx.font = "bold 16px Arial";
    ctx.textAlign = "center";
    ctx.fillText(`Clientes: ${clients.length}`, cx, cy + 6);
  }

  // --- Manejo CRUD clientes ---
  function openCreateModal() {
    setEditMode(false);
    setFormData({ id: null, nombre: "", correo: "", telefono: "", direccion: "", departamento: "", productosAdquiridos: "" });
    setShowClientModal(true);
  }

  function openEditModal(client) {
    setEditMode(true);
    setFormData({ ...client });
    setShowClientModal(true);
  }

  function handleClientFormSubmit(e) {
    e.preventDefault();
    const data = { ...formData };
    if (!data.nombre || !data.correo) return alert("Nombre y correo son obligatorios");

    if (editMode) {
      setClients((prev) => prev.map((c) => (c.id === data.id ? { ...data, productosAdquiridos: Number(data.productosAdquiridos) } : c)));
    } else {
      const newId = clients.length ? Math.max(...clients.map((c) => c.id)) + 1 : 1;
      setClients((prev) => [...prev, { ...data, id: newId, productosAdquiridos: Number(data.productosAdquiridos) }]);
    }
    setShowClientModal(false);
  }

  function confirmDelete(client) {
    setToDelete(client);
    setShowDeleteConfirm(true);
  }

  function doDelete() {
    if (!toDelete) return;
    setClients((prev) => prev.filter((c) => c.id !== toDelete.id));
    setToDelete(null);
    setShowDeleteConfirm(false);
  }

  // --- Contraseña ---
  function handleChangePassSubmit(e) {
    e.preventDefault();
    if (passwords.nueva !== passwords.repetir) {
      setPassError("Las contraseñas no coinciden.");
      return;
    }
    if (passwords.nueva.length < 6) {
      setPassError("La contraseña debe tener al menos 6 caracteres.");
      return;
    }
    setPassError(null);
    // Aquí normalmente llamarías al backend para actualizar la contraseña
    setShowChangePass(false);
    setShowSuccessModal(true);
    setPasswords({ antigua: "", nueva: "", repetir: "" });
  }

  function togglePasswordVisibility(id) {
    const el = document.getElementById(id);
    if (!el) return;
    if (el.type === "password") el.type = "text";
    else el.type = "password";
  }

  // --- Recuperar correo ---
  function handleRecuperarSubmit(e) {
    e.preventDefault();
    // simulamos verificación de correo
    const found = clients.find((c) => c.correo.toLowerCase() === emailRecuperar.toLowerCase());
    if (!found) {
      setMensajeRecuperar("Correo inválido o no registrado.");
      return;
    }
    setMensajeRecuperar(null);
    // generamos clave temporal
    const temp = Math.random().toString(36).slice(-8);
    setClaveTemporal(temp);
    setShowClaveTemporal(true);
    setShowRecuperar(false);
  }

  // --- Reporte (descarga CSV) ---
  function handleDownloadReport() {
    if (!docAdmin || !claveAdmin) {
      setMensajeErrorReporte("⚠️ Ambos campos son obligatorios.");
      return;
    }
    setMensajeErrorReporte(null);
    // Simulamos verificación simple (en real: consultar backend)
    const csvRows = [
      ["ID", "Nombre", "Correo", "Telefono", "Direccion", "Departamento", "ProductosAdquiridos"],
      ...clients.map((c) => [c.id, c.nombre, c.correo, c.telefono, c.direccion, c.departamento, c.productosAdquiridos]),
    ];
    const csvContent = csvRows.map((r) => r.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `reporte_clientes_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="d-flex flex-column flex-md-row">
      {/* Sidebar */}
      <div className="sidebar collapse d-md-block p-3 bg-primary text-white" id="sidebarMenu" style={{ minWidth: 220 }}>
        <div className="text-center mb-4">
          <i className="bi bi-person-circle" style={{ fontSize: "3rem" }}></i>
          <h5 className="fw-bold mt-2">Nombre Administrador</h5>
        </div>

        <ul className="nav flex-column text-center">
          <li className="nav-item mb-2">
            <button className="btn btn-link text-white" onClick={() => setShowChangePass(true)}>Cambiar Contraseña</button>
          </li>

          <hr className="bg-light" />

          <li className="nav-item">
            <a href="#" className="nav-link custom-link text-white">Empleados</a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link custom-link text-white">Inventario</a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link active text-white">Clientes</a>
          </li>

          <hr className="bg-light" />

          <li className="nav-item mt-2">
            <button className="btn btn-link text-white" onClick={() => setShowRecuperar(true)}>Recuperar Contraseña</button>
          </li>
          <li className="nav-item mt-2">
            <button className="btn btn-link text-white" data-bs-toggle="modal" onClick={() => setShowRecuperar(true)}>Generar Reporte de los Clientes</button>
          </li>
        </ul>
      </div>

      {/* Main */}
      <main className="flex-grow-1 p-4 bg-light">
        <div className="row g-4 mb-4">
          <div className="col-12">
            <div className="card shadow-sm">
              <div className="card-header d-flex justify-content-between align-items-center">
                <span className="fw-bold">Clientes</span>
                <div className="btn-group">
                  <button className="btn btn-success btn-sm" id="btnAgregarCliente" title="Crear" onClick={openCreateModal}>
                    <i className="bi bi-plus-circle"></i>
                  </button>
                </div>
              </div>
              <div className="card-body table-responsive">
                <table className="table table-bordered align-middle text-center">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Nombre</th>
                      <th>Correo</th>
                      <th>Telefono</th>
                      <th>Dirección</th>
                      <th>Departamento</th>
                      <th>Productos Adquiridos</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody id="tablaInventario">
                    {clients.map((c) => (
                      <tr key={c.id} id={`cliente-${c.id}`}>
                        <td>{c.id}</td>
                        <td>{c.nombre}</td>
                        <td>{c.correo}</td>
                        <td>{c.telefono}</td>
                        <td>{c.direccion}</td>
                        <td>{c.departamento}</td>
                        <td>{c.productosAdquiridos}</td>
                        <td>
                          <button className="btn btn-sm btn-warning me-2" onClick={() => openEditModal(c)} title="Editar"><i className="bi bi-pencil"></i></button>
                          <button className="btn btn-sm btn-danger" onClick={() => confirmDelete(c)} title="Eliminar"><i className="bi bi-trash"></i></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <div className="row g-4 align-items-stretch text-center">
          <div className="col-12 col-md-4 d-flex">
            <div className="card shadow-sm w-100 d-flex flex-column">
              <div className="card-header fw-bold bg-info text-white">Estadísticas</div>
              <div className="card-body d-flex justify-content-center align-items-center">
                <canvas id="graficoClientes" ref={canvasRef} width={250} height={250} style={{ maxHeight: 250, maxWidth: 250 }}></canvas>
              </div>
            </div>
          </div>

          <div className="col-12 col-md-4 d-flex">
            <div className="card shadow-sm w-100 d-flex flex-column">
              <div className="card-header fw-bold bg-info text-white">Top 5 clientes con más compras</div>
              <div className="card-body">
                <ol className="list-group list-group-numbered" id="listaTopClientes">
                  {topClientes.map((t) => (
                    <li key={t.id} className="list-group-item d-flex justify-content-between align-items-start">
                      <div className="ms-2 me-auto">
                        <div className="fw-bold">{t.nombre}</div>
                        <small>{t.correo}</small>
                      </div>
                      <span className="badge bg-primary rounded-pill">{t.productosAdquiridos}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>

          <div className="col-12 col-md-4 d-flex">
            <div className="card shadow-sm w-100 d-flex flex-column">
              <div className="card-header fw-bold bg-info text-white">Calendario</div>
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

      {/* Modales implementados con react (no depende de JS de bootstrap) */}

      {/* Cliente Modal */}
      {showClientModal && (
        <div className="modal d-block" tabIndex={-1} style={{ backgroundColor: "rgba(0,0,0,0.4)" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <form onSubmit={handleClientFormSubmit}>
                <div className="modal-header text-black">
                  <h5 className="modal-title">{editMode ? "Editar Cliente" : "Agregar Cliente"}</h5>
                  <button type="button" className="btn-close" onClick={() => setShowClientModal(false)} aria-label="Cerrar"></button>
                </div>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label">Nombre</label>
                    <input value={formData.nombre} onChange={(e) => setFormData({ ...formData, nombre: e.target.value })} type="text" className="form-control" required />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Correo</label>
                    <input value={formData.correo} onChange={(e) => setFormData({ ...formData, correo: e.target.value })} type="email" className="form-control" required />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Telefono</label>
                    <input value={formData.telefono} onChange={(e) => setFormData({ ...formData, telefono: e.target.value })} type="text" className="form-control" />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Dirección</label>
                    <input value={formData.direccion} onChange={(e) => setFormData({ ...formData, direccion: e.target.value })} type="text" className="form-control" />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Departamento</label>
                    <input value={formData.departamento} onChange={(e) => setFormData({ ...formData, departamento: e.target.value })} type="text" className="form-control" />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Productos Adquiridos</label>
                    <input value={formData.productosAdquiridos} onChange={(e) => setFormData({ ...formData, productosAdquiridos: e.target.value })} type="number" min={0} className="form-control" />
                  </div>
                </div>
                <div className="modal-footer d-flex justify-content-center">
                  <button type="button" className="btn btn-danger text-white" onClick={() => setShowClientModal(false)}>Cancelar</button>
                  <button type="submit" className="btn custom-btn text-black">Guardar</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Confirmar eliminar */}
      {showDeleteConfirm && (
        <div className="modal d-block" tabIndex={-1} style={{ backgroundColor: "rgba(0,0,0,0.4)" }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header bg-danger text-white">
                <h5 className="modal-title w-100 text-center">¿Estás seguro?</h5>
                <button type="button" className="btn-close btn-close-white" onClick={() => setShowDeleteConfirm(false)} aria-label="Cerrar"></button>
              </div>
              <div className="modal-body text-center">Esta acción no se puede deshacer<br />¿Deseas eliminar este cliente?</div>
              <div className="modal-footer justify-content-center">
                <button type="button" className="btn btn-secondary" onClick={() => setShowDeleteConfirm(false)}>Cancelar</button>
                <button type="button" className="btn btn-danger" onClick={doDelete}>Eliminar</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Cambio de contraseña */}
      {showChangePass && (
        <div className="modal d-block" tabIndex={-1} style={{ backgroundColor: "rgba(0,0,0,0.4)" }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content shadow-lg">
              <div className="modal-header">
                <h5 className="modal-title">Cambiar Contraseña</h5>
                <button type="button" className="btn-close" onClick={() => setShowChangePass(false)} aria-label="Cerrar"></button>
              </div>
              <div className="modal-body text-center px-4 py-4">
                <form id="formCambiarContraseña" onSubmit={handleChangePassSubmit} className="text-start">
                  <div className="mb-3 text-start">
                    <label className="form-label">Contraseña Antigua</label>
                    <div className="input-group">
                      <input value={passwords.antigua} onChange={(e) => setPasswords({ ...passwords, antigua: e.target.value })} type="password" className="form-control" id="passwordAntigua" required />
                      <button type="button" className="btn btn-outline-secondary" onClick={() => togglePasswordVisibility('passwordAntigua')}>
                        <i className="bi bi-eye"></i>
                      </button>
                    </div>
                  </div>

                  <div className="mb-3 text-start">
                    <label className="form-label">Contraseña Nueva</label>
                    <div className="input-group">
                      <input value={passwords.nueva} onChange={(e) => setPasswords({ ...passwords, nueva: e.target.value })} type="password" className="form-control" id="passwordNueva" required />
                      <button type="button" className="btn btn-outline-secondary" onClick={() => togglePasswordVisibility('passwordNueva')}>
                        <i className="bi bi-eye"></i>
                      </button>
                    </div>
                  </div>

                  <div className="mb-3 text-start">
                    <label className="form-label">Repetir Contraseña</label>
                    <div className="input-group">
                      <input value={passwords.repetir} onChange={(e) => setPasswords({ ...passwords, repetir: e.target.value })} type="password" className="form-control" id="passwordRepetir" required />
                      <button type="button" className="btn btn-outline-secondary" onClick={() => togglePasswordVisibility('passwordRepetir')}>
                        <i className="bi bi-eye"></i>
                      </button>
                    </div>
                    {passError && <small className="text-danger">{passError}</small>}
                  </div>

                  <div className="d-grid">
                    <button type="submit" className="btn custom-btn text-black">Finalizar</button>
                  </div>
                </form>
                <a href="#" id="enlaceRecuperar" className="text-decoration-underline text-primary d-block mt-3" onClick={() => { setShowChangePass(false); setShowRecuperar(true); }}>
                  ¿Olvidó su contraseña?
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Exito cambio contraseña */}
      {showSuccessModal && (
        <div className="modal d-block" tabIndex={-1} style={{ backgroundColor: "rgba(0,0,0,0.4)" }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header text-black">
                <h5 className="modal-title w-100 text-center">¡Éxito!</h5>
                <button type="button" className="btn-close" onClick={() => setShowSuccessModal(false)}></button>
              </div>
              <div className="modal-body text-center">Tu contraseña ha sido cambiada correctamente. <br /> Por su seguridad inicie sesión nuevamente.</div>
              <div className="modal-footer d-flex justify-content-center">
                <a href="/" className="btn custom-btn">Aceptar</a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Recuperar correo modal */}
      {showRecuperar && (
        <div className="modal d-block" tabIndex={-1} style={{ backgroundColor: "rgba(0,0,0,0.4)" }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content shadow-lg">
              <div className="modal-header">
                <h5 className="modal-title">Recuperar Contraseña</h5>
                <button type="button" className="btn-close" onClick={() => setShowRecuperar(false)} aria-label="Cerrar"></button>
              </div>
              <div className="modal-body text-center px-4 py-4">
                <form id="formRecuperarCorreo" className="text-start" onSubmit={handleRecuperarSubmit}>
                  <div className="mb-3">
                    <label htmlFor="emailRecuperar" className="form-label">Correo electrónico registrado</label>
                    <input value={emailRecuperar} onChange={(e) => setEmailRecuperar(e.target.value)} type="email" id="emailRecuperar" className="form-control" required placeholder="ejemplo@correo.com" />
                  </div>
                  <div className="d-grid">
                    <button type="submit" className="btn custom-btn text-black">Enviar clave temporal</button>
                  </div>
                </form>
                {mensajeRecuperar && <div id="mensajeErrorCorreo" className="mt-3 text-danger d-block text-start">{mensajeRecuperar}</div>}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Clave temporal mostrada */}
      {showClaveTemporal && (
        <div className="modal d-block" tabIndex={-1} style={{ backgroundColor: "rgba(0,0,0,0.4)" }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content shadow-lg">
              <div className="modal-header">
                <h5 className="modal-title">Clave Temporal</h5>
                <button type="button" className="btn-close" onClick={() => setShowClaveTemporal(false)} aria-label="Cerrar"></button>
              </div>
              <div className="modal-body text-center px-4 py-4">
                <p>Su nueva clave temporal es:</p>
                <div className="d-flex justify-content-center align-items-center gap-3 mb-3">
                  <span id="claveTemporalOculta" className="fs-4">{"*".repeat(8)}</span>
                  <span id="claveTemporalReal" className="fs-4">{claveTemporal}</span>
                </div>
                <p className="text-muted">Por favor cámbiala cuanto antes.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal reporte (descarga csv) */}
      <div style={{ display: "none" }}>
        {/* mantenemos los inputs controlados fuera de flujo para replicar el formulario original si el usuario abre el modal */}
      </div>

      {/* Botón que abre el modal de reporte: lo mostramos como un modal simple mediante estado */}
      {/* Para simplicidad, también mostramos el formulario de reporte cuando el usuario hace click en "Generar Reporte de los Clientes" */}
      <div>
        {/* Si el usuario desea abrir el diálogo de reporte desde la UI, puede añadir un botón que active un estado para mostrarlo. Aquí implementamos inline: */}
      </div>

      {/* Modal Generar Reporte (puedes abrirlo desde sidebar) */}
      {/* Lo mostramos condicionalmente cuando el usuario pulse el botón en sidebar (showRecuperar lo reutiliza) */}
      {/* Para que no interfiera con la UX usamos el mismo state 'showRecuperar' para abrirlo desde sidebar: si quieres separarlo, agrega nuevo state */}

      {/* Modal reporte manual (no se muestra por defecto, el usuario puede integrarlo) */}

      {/* Panel flotante pequeño para descargar reporte (alternativa) */}
      <div style={{ position: "fixed", right: 20, bottom: 20 }}>
        <div className="card p-2 shadow-sm">
          <div className="mb-2">Descargar Reporte</div>
          <input className="form-control form-control-sm mb-1" placeholder="Documento Admin" value={docAdmin} onChange={(e) => setDocAdmin(e.target.value)} />
          <input className="form-control form-control-sm mb-1" placeholder="Clave Admin" value={claveAdmin} onChange={(e) => setClaveAdmin(e.target.value)} />
          {mensajeErrorReporte && <div className="text-danger small">{mensajeErrorReporte}</div>}
          <div className="d-grid">
            <button className="btn btn-sm btn-primary mt-1" onClick={handleDownloadReport}>Descargar CSV</button>
          </div>
        </div>
      </div>
    </div>
  );
}
