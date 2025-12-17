import React, { useState, useEffect } from "react";

const ActualizarDatosModal = () => {
  const [formData, setFormData] = useState({
    TipoDocumento: '',
    NumeroDocumento: '',
    Primer_Nombre: '',
    Segundo_Nombre: '',
    Primer_Apellido: '',
    Segundo_Apellido: '',
    Telefono: '',
    Correo: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // Cargar datos cuando se abre el modal
  useEffect(() => {
    const modalElement = document.getElementById('modalActualizarDatos');
    
    const handleModalShow = async () => {
      console.log('🔵 Modal abierto, cargando datos...');
      await cargarDatosUsuario();
    };

    modalElement?.addEventListener('shown.bs.modal', handleModalShow);
    
    return () => {
      modalElement?.removeEventListener('shown.bs.modal', handleModalShow);
    };
  }, []);

  // Función para cargar datos actuales del usuario
  const cargarDatosUsuario = async () => {
    try {
      setLoading(true);
      
      // Obtener datos de localStorage
      const userId = localStorage.getItem('idPersona');
      const token = localStorage.getItem('token');
      
      console.log('📦 Datos de localStorage:');
      console.log('  - ID Usuario:', userId);
      console.log('  - Token:', token ? 'Existe ✅' : 'No existe ❌');
      
      if (!userId) {
        console.error('❌ No se encontró el ID del usuario en localStorage');
        alert('Error: No se encontró información del usuario. Por favor, inicie sesión nuevamente.');
        return;
      }

      const url = `http://localhost:3001/api/persona/${userId}`;
      console.log('🌐 Haciendo petición GET a:', url);
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      console.log('📡 Respuesta del servidor:');
      console.log('  - Status:', response.status);
      console.log('  - OK:', response.ok);

      if (response.ok) {
        const responseData = await response.json();
        console.log('✅ Respuesta completa del servidor:', responseData);
        
        // Extraer los datos del usuario desde el body
        const userData = responseData.body || responseData;
        console.log('✅ Datos del usuario:', userData);
        
        // Mapear los datos recibidos
        const datosFormateados = {
          TipoDocumento: userData.TipoDocumento || '',
          NumeroDocumento: userData.NumeroDocumento || '',
          Primer_Nombre: userData.Primer_Nombre || '',
          Segundo_Nombre: userData.Segundo_Nombre || '',
          Primer_Apellido: userData.Primer_Apellido || '',
          Segundo_Apellido: userData.Segundo_Apellido || '',
          Telefono: userData.Telefono || '',
          Correo: userData.Correo || ''
        };
        
        console.log('📝 Datos formateados para el formulario:', datosFormateados);
        setFormData(datosFormateados);
        
      } else {
        const errorData = await response.json();
        console.error('❌ Error del servidor:', errorData);
        alert(`Error al cargar los datos: ${errorData.message || 'Error desconocido'}`);
      }
    } catch (error) {
      console.error('💥 Error de conexión:', error);
      alert('Error al cargar los datos del usuario. Verifique la consola para más detalles.');
    } finally {
      setLoading(false);
      console.log('🏁 Carga de datos finalizada');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.Primer_Nombre.trim()) {
      newErrors.Primer_Nombre = 'El primer nombre es requerido';
    }

    if (!formData.Primer_Apellido.trim()) {
      newErrors.Primer_Apellido = 'El primer apellido es requerido';
    }

    if (formData.Telefono && !/^\d{10}$/.test(formData.Telefono)) {
      newErrors.Telefono = 'El teléfono debe tener 10 dígitos';
    }

    const nameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]*$/;
    
    if (formData.Primer_Nombre && !nameRegex.test(formData.Primer_Nombre)) {
      newErrors.Primer_Nombre = 'El nombre solo puede contener letras';
    }
    
    if (formData.Segundo_Nombre && !nameRegex.test(formData.Segundo_Nombre)) {
      newErrors.Segundo_Nombre = 'El nombre solo puede contener letras';
    }
    
    if (formData.Primer_Apellido && !nameRegex.test(formData.Primer_Apellido)) {
      newErrors.Primer_Apellido = 'El apellido solo puede contener letras';
    }
    
    if (formData.Segundo_Apellido && !nameRegex.test(formData.Segundo_Apellido)) {
      newErrors.Segundo_Apellido = 'El apellido solo puede contener letras';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    console.log('🔄 Iniciando actualización...');
    
    if (!validateForm()) {
      console.log('❌ Validación fallida');
      return;
    }

    setLoading(true);

    try {
      const datosParaActualizar = {
        TipoDocumento: formData.TipoDocumento, // Incluir campos de solo lectura
        NumeroDocumento: formData.NumeroDocumento,
        Primer_Nombre: formData.Primer_Nombre.trim(),
        Segundo_Nombre: formData.Segundo_Nombre.trim(),
        Primer_Apellido: formData.Primer_Apellido.trim(),
        Segundo_Apellido: formData.Segundo_Apellido.trim(),
        Telefono: formData.Telefono.trim(),
        Correo: formData.Correo // Incluir correo también
      };

      const userId = localStorage.getItem('idPersona');
      const token = localStorage.getItem('token');
      
      if (!userId) {
        alert('Error: No se encontró información del usuario');
        return;
      }

      console.log('📤 Enviando actualización:', datosParaActualizar);

      const response = await fetch(`http://localhost:3001/api/persona/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(datosParaActualizar)
      });

      const result = await response.json();
      console.log('📥 Respuesta de actualización:', result);

      if (response.ok) {
        alert('Datos actualizados correctamente');
        
        // Cerrar el modal usando el atributo data-bs-dismiss
        const modalElement = document.getElementById('modalActualizarDatos');
        const closeButton = modalElement?.querySelector('[data-bs-dismiss="modal"]');
        closeButton?.click();
        
        // Alternativa: Si tienes jQuery y Bootstrap cargados
        // $('#modalActualizarDatos').modal('hide');
        
      } else {
        if (result.errors) {
          setErrors(result.errors);
        } else {
          alert(result.message || 'Error al actualizar los datos');
        }
      }
    } catch (error) {
      console.error('💥 Error:', error);
      alert('Error de conexión. Por favor, intente nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="modal fade"
      id="modalActualizarDatos"
      tabIndex={-1}
      aria-labelledby="modalActualizarDatosLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-lg">
        <div className="modal-content rounded-3 shadow">
          <div className="modal-header text-black">
            <h5 className="modal-title" id="modalActualizarDatosLabel">
              Actualizar Datos
            </h5>
            <button
              type="button"
              className="btn-close btn-close-black"
              data-bs-dismiss="modal"
              aria-label="Cerrar"
            />
          </div>
          
          <form id="formActualizarDatos" onSubmit={handleSubmit}>
            <div className="modal-body bg-light">
              {loading && (
                <div className="text-center mb-3">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Cargando...</span>
                  </div>
                </div>
              )}
              
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label">Tipo de Documento</label>
                  <input
                    type="text"
                    className="form-control bg-light"
                    name="TipoDocumento"
                    value={formData.TipoDocumento}
                    readOnly
                  />
                  <small className="text-muted">Este campo no se puede modificar</small>
                </div>

                <div className="col-md-6">
                  <label className="form-label">Número de Documento</label>
                  <input
                    type="text"
                    className="form-control bg-light"
                    name="NumeroDocumento"
                    value={formData.NumeroDocumento}
                    readOnly
                  />
                  <small className="text-muted">Este campo no se puede modificar</small>
                </div>

                <div className="col-md-6">
                  <label className="form-label">
                    Primer Nombre <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className={`form-control ${errors.Primer_Nombre ? 'is-invalid' : ''}`}
                    name="Primer_Nombre"
                    value={formData.Primer_Nombre}
                    onChange={handleInputChange}
                    required
                    disabled={loading}
                  />
                  {errors.Primer_Nombre && (
                    <div className="invalid-feedback">{errors.Primer_Nombre}</div>
                  )}
                </div>

                <div className="col-md-6">
                  <label className="form-label">Segundo Nombre</label>
                  <input
                    type="text"
                    className={`form-control ${errors.Segundo_Nombre ? 'is-invalid' : ''}`}
                    name="Segundo_Nombre"
                    value={formData.Segundo_Nombre}
                    onChange={handleInputChange}
                    disabled={loading}
                  />
                  {errors.Segundo_Nombre && (
                    <div className="invalid-feedback">{errors.Segundo_Nombre}</div>
                  )}
                </div>

                <div className="col-md-6">
                  <label className="form-label">
                    Primer Apellido <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className={`form-control ${errors.Primer_Apellido ? 'is-invalid' : ''}`}
                    name="Primer_Apellido"
                    value={formData.Primer_Apellido}
                    onChange={handleInputChange}
                    required
                    disabled={loading}
                  />
                  {errors.Primer_Apellido && (
                    <div className="invalid-feedback">{errors.Primer_Apellido}</div>
                  )}
                </div>

                <div className="col-md-6">
                  <label className="form-label">Segundo Apellido</label>
                  <input
                    type="text"
                    className={`form-control ${errors.Segundo_Apellido ? 'is-invalid' : ''}`}
                    name="Segundo_Apellido"
                    value={formData.Segundo_Apellido}
                    onChange={handleInputChange}
                    disabled={loading}
                  />
                  {errors.Segundo_Apellido && (
                    <div className="invalid-feedback">{errors.Segundo_Apellido}</div>
                  )}
                </div>

                <div className="col-md-6">
                  <label className="form-label">Número de Teléfono</label>
                  <input
                    type="tel"
                    className={`form-control ${errors.Telefono ? 'is-invalid' : ''}`}
                    name="Telefono"
                    value={formData.Telefono}
                    onChange={handleInputChange}
                    placeholder="Ej: 3001234567"
                    disabled={loading}
                  />
                  {errors.Telefono && (
                    <div className="invalid-feedback">{errors.Telefono}</div>
                  )}
                </div>

                <div className="col-md-6">
                  <label className="form-label">Correo Electrónico</label>
                  <input
                    type="email"
                    className="form-control bg-light"
                    name="Correo"
                    value={formData.Correo}
                    readOnly
                  />
                  <small className="text-muted">Este campo no se puede modificar</small>
                </div>
              </div>

              <div className="text-center mt-4">
                <button 
                  type="submit" 
                  className="btn custom-btn px-4"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                      Actualizando...
                    </>
                  ) : (
                    'Finalizar'
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ActualizarDatosModal;