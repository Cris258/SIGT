// ========== LOGIN Y VALIDACIÓN ==========
document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('formularioLogin');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault(); // Evita el envío del formulario

    const rol = document.getElementById('rol');
    const tipodocumento = document.getElementById('documento');
    const numDocumento = document.getElementById('numDocumento');
    const clave = document.getElementById('clave');

    let valido = true;

    const marcarInvalido = (campo, mensaje) => {
      campo.classList.add('is-invalid');
      const feedback = campo.parentElement.querySelector('.invalid-feedback');
      if (feedback) feedback.textContent = mensaje;
      valido = false;
    };

    // Limpiar errores anteriores
    document.querySelectorAll('.form-control, .form-select').forEach(c => c.classList.remove('is-invalid'));

    // Validaciones
    if (!rol.value) marcarInvalido(rol, 'Seleccione un rol');
    if (!tipodocumento.value) marcarInvalido(tipodocumento, 'Seleccione el tipo de documento');
    if (!numDocumento.value.trim()) marcarInvalido(numDocumento, 'Ingrese el número de documento');
    if (!clave.value) marcarInvalido(clave, 'La contraseña es obligatoria');
    else if (clave.value.length < 6) marcarInvalido(clave, 'Debe tener al menos 6 caracteres');

    if (!valido) return;

    // Redirección según el rol
    if (rol.value === 'admin') {
      window.location.href = '3. Admin.php';
    } else if (rol.value === 'empleado') {
      window.location.href = '4. Empleado.php';
    } else if (rol.value === 'cliente') {
      window.location.href = '15. Usuario.php';
    } else {
      alert('Rol no válido.');
    }

    form.reset();
  });

  // Mostrar/ocultar contraseña (campo login)
  document.querySelectorAll('.toggle-password').forEach(btn => {
    btn.addEventListener('click', () => {
      const input = document.getElementById(btn.dataset.target);
      const icon = btn.querySelector('i');
      if (input.type === 'password') {
        input.type = 'text';
        icon.classList.remove('bi-eye');
        icon.classList.add('bi-eye-slash');
      } else {
        input.type = 'password';
        icon.classList.remove('bi-eye-slash');
        icon.classList.add('bi-eye');
      }
    });
  });
});


// ========== RECUPERAR CONTRASEÑA ==========
document.addEventListener('DOMContentLoaded', () => {
  const formRecuperar = document.getElementById('formRecuperar');
  const mensajeError = document.getElementById('mensajeError');
  const modalRecuperar = new bootstrap.Modal(document.getElementById('modalRecuperar'));
  const modalClave = new bootstrap.Modal(document.getElementById('modalClaveTemporal'));

  let claveTemporal = generarClaveTemporal(); // Generar al cargar

  formRecuperar.addEventListener('submit', (e) => {
    e.preventDefault();

    const correo = document.getElementById('emailRecuperar').value.trim();

    if (correo === '' || !correo.includes('@')) {
      mensajeError.classList.remove('d-none');
      return;
    }

    // Ocultar mensaje de error
    mensajeError.classList.add('d-none');
    modalRecuperar.hide();

    // Mostrar la clave temporal en el segundo modal
    document.getElementById('claveTemporalReal').textContent = claveTemporal;
    document.getElementById('claveTemporalOculta').classList.remove('d-none');
    document.getElementById('claveTemporalReal').classList.add('d-none');
    document.getElementById('iconoToggleClave').className = 'bi bi-eye';

    modalClave.show();

    // Generar una nueva clave la próxima vez
    claveTemporal = generarClaveTemporal();
  });

  // Mostrar / Ocultar clave temporal
  document.getElementById('btnToggleClave').addEventListener('click', () => {
    const oculta = document.getElementById('claveTemporalOculta');
    const visible = document.getElementById('claveTemporalReal');
    const icono = document.getElementById('iconoToggleClave');

    if (visible.classList.contains('d-none')) {
      visible.classList.remove('d-none');
      oculta.classList.add('d-none');
      icono.className = 'bi bi-eye-slash';
    } else {
      visible.classList.add('d-none');
      oculta.classList.remove('d-none');
      icono.className = 'bi bi-eye';
    }
  });

  // Generar clave aleatoria temporal
  function generarClaveTemporal() {
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let clave = '';
    for (let i = 0; i < 8; i++) {
      clave += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
    }
    return clave;
  }
});
