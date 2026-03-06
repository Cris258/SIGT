document.addEventListener('DOMContentLoaded', function () {
  const modal = document.getElementById('modal-galeria');

  modal.addEventListener('show.bs.modal', function (event) {
    const trigger = event.relatedTarget;
    const imageUrl = trigger.getAttribute('data-bs-image');
    const modalImg = modal.querySelector('#imagenModal');
    modalImg.src = imageUrl;
  });
});

document.getElementById('formularioModalLogin').addEventListener('submit', function (e) {
    e.preventDefault();

    const rol = document.getElementById('rolModal').value;
    const tipoDoc = document.getElementById('tipoDoc').value;
    const numeroDoc = document.getElementById('numeroDoc').value;
    const password = document.getElementById('password').value;

    if (!rol || !tipoDoc || !numeroDoc || !password) {
      alert('Por favor llena todos los campos.');
      return;
    }
    this.reset();
    if (rol === 'admin') {
      window.location.href = '3. Admin.html';
    } else if (rol === 'empleado') {
      window.location.href = '4. Empleado.html';
    } else if (rol == 'cliente') {
      window.location.href = '#';
    }
});

document.getElementById('togglePassword').addEventListener('click', function () {
  const input = document.getElementById('password');
  const icono = document.getElementById('iconoPassword');

  if (input.type === 'password') {
    input.type = 'text';
    icono.classList.remove('bi-eye');
    icono.classList.add('bi-eye-slash');
  } else {
    input.type = 'password';
    icono.classList.remove('bi-eye-slash');
    icono.classList.add('bi-eye');
  }
});

document.getElementById('formRecuperarCorreo').addEventListener('submit', function (e) {
  e.preventDefault();

  const correo = document.getElementById('emailRecuperar').value.trim();
  const errorMsg = document.getElementById('mensajeErrorCorreo');

  if (!correo || !correo.includes('@')) {
    errorMsg.classList.remove('d-none');
    errorMsg.textContent = 'Por favor ingresa un correo válido.';
    return;
  }

  errorMsg.classList.add('d-none');

  const claveTemporal = Math.floor(100000 + Math.random() * 900000);
  document.getElementById('claveTemporalReal').textContent = claveTemporal;
  document.getElementById('claveTemporalOculta').textContent = '*'.repeat(claveTemporal.toString().length);
  document.getElementById('claveTemporalReal').classList.add('d-none');
  document.getElementById('claveTemporalOculta').classList.remove('d-none');

  const icono = document.getElementById('iconoToggleClave');
  icono.classList.remove('bi-eye-slash');
  icono.classList.add('bi-eye');

  const modalCorreo = bootstrap.Modal.getInstance(document.getElementById('modalRecuperarCorreo'));
  modalCorreo.hide();

  const modalClave = new bootstrap.Modal(document.getElementById('modalClaveTemporal'));
  modalClave.show();
});

document.getElementById('btnToggleClave').addEventListener('click', function () {
  const oculta = document.getElementById('claveTemporalOculta');
  const real = document.getElementById('claveTemporalReal');
  const icono = document.getElementById('iconoToggleClave');

  const mostrandoReal = !real.classList.contains('d-none');

  if (mostrandoReal) {
    real.classList.add('d-none');
    oculta.classList.remove('d-none');
    icono.classList.remove('bi-eye-slash');
    icono.classList.add('bi-eye');
  } else {
    real.classList.remove('d-none');
    oculta.classList.add('d-none');
    icono.classList.remove('bi-eye');
    icono.classList.add('bi-eye-slash');
  }
});

const modalCorreo = document.getElementById('modalRecuperarCorreo');

modalCorreo.addEventListener('hidden.bs.modal', function () {
  document.getElementById('emailRecuperar').value = '';
  document.getElementById('mensajeErrorCorreo').classList.add('d-none');
  document.getElementById('mensajeErrorCorreo').textContent = '';
});