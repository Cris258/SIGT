// pagina Registro
document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('formularioRegistro');
    if (!form) return;

    form.addEventListener('submit', function (e) {
        e.preventDefault(); // Detiene el envío automático

        const rol = document.getElementById('rol');
        const primernombre = document.getElementById('nombre');
        const segundonombre = document.getElementById('segundoNombre');
        const primerapellido = document.getElementById('apellido');
        const segundoapellido = document.getElementById('segundoApellido');
        const tipodocumento = document.getElementById('documento');
        const telefono = document.getElementById('telefono');
        const numDocumento = document.getElementById('numDocumento');
        const correo = document.getElementById('correo');
        const clave = document.getElementById('clave');
        const confirmarClave = document.getElementById('confirmarClave');

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
        if (!primernombre.value.trim()) marcarInvalido(primernombre, 'El primer nombre es obligatorio');
        if (!primerapellido.value.trim()) marcarInvalido(primerapellido, 'El primer apellido es obligatorio');
        if (!tipodocumento.value) marcarInvalido(tipodocumento, 'Seleccione el tipo de documento');
        if (!telefono.value.trim()) marcarInvalido(telefono, 'El número de teléfono es obligatorio');
        if (!numDocumento.value.trim()) marcarInvalido(numDocumento, 'Ingrese el número de documento');

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!correo.value.trim()) marcarInvalido(correo, 'El correo es obligatorio');
        else if (!emailRegex.test(correo.value)) marcarInvalido(correo, 'Ingrese un correo válido');

        if (!clave.value) marcarInvalido(clave, 'La contraseña es obligatoria');
        else if (clave.value.length < 6) marcarInvalido(clave, 'Debe tener al menos 6 caracteres');

        if (!confirmarClave.value) marcarInvalido(confirmarClave, 'Confirme su contraseña');
        else if (clave.value !== confirmarClave.value) marcarInvalido(confirmarClave, 'Las contraseñas no coinciden');

        if (valido) {
            const modal = new bootstrap.Modal(document.getElementById('modalExito'));
            modal.show();

            document.getElementById('modalExito').addEventListener('hidden.bs.modal', function () {
                form.submit(); // Envío real al backend
            }, { once: true });
        }
    });

    // Mostrar/ocultar contraseña
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

    // Mostrar modal si viene de redirección con éxito
    const params = new URLSearchParams(window.location.search);
    if (params.get('registro') === 'exito') {
        const modal = new bootstrap.Modal(document.getElementById('modalExito'));
        modal.show();
    }
});