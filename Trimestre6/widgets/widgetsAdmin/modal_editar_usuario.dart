import 'package:flutter/material.dart';


class ModalEditarUsuario extends StatefulWidget {
  final Map<String, dynamic>? usuario;
  final Function(Map<String, dynamic>)? onGuardar;

  const ModalEditarUsuario({
    Key? key,
    this.usuario,
    this.onGuardar,
  }) : super(key: key);

  @override
  State<ModalEditarUsuario> createState() => _ModalEditarUsuarioState();
}

class _ModalEditarUsuarioState extends State<ModalEditarUsuario> {
  final _formKey = GlobalKey<FormState>();
  bool _isLoading = false;

  // Controladores de texto
  final _numeroDocumentoController = TextEditingController();
  final _primerNombreController = TextEditingController();
  final _segundoNombreController = TextEditingController();
  final _primerApellidoController = TextEditingController();
  final _segundoApellidoController = TextEditingController();
  final _telefonoController = TextEditingController();
  final _correoController = TextEditingController();

  // Valores de dropdowns
  String? _tipoDocumento;
  int? _rolFK;
  int _estadoPersonaFK = 1;

  // Listas para dropdowns
  final List<Map<String, dynamic>> estados = [
    {'id': 1, 'nombre': 'Activo'},
    {'id': 2, 'nombre': 'Inactivo'},
  ];

  final List<Map<String, dynamic>> roles = [
    {'id': 2, 'nombre': 'Administrador'},
    {'id': 3, 'nombre': 'Empleado'},
    {'id': 4, 'nombre': 'Cliente'},
  ];

  final List<Map<String, String>> tiposDocumento = [
    {'value': 'CC', 'label': 'Cédula de Ciudadanía'},
    {'value': 'TI', 'label': 'Tarjeta de Identidad'},
    {'value': 'CE', 'label': 'Cédula de Extranjería'},
    {'value': 'PA', 'label': 'Pasaporte'},
  ];

  @override
  void initState() {
    super.initState();
    if (widget.usuario != null) {
      _cargarDatosUsuario();
    }
  }

  void _cargarDatosUsuario() {
    final usuario = widget.usuario!;
    _numeroDocumentoController.text = usuario['NumeroDocumento']?.toString() ?? '';
    _tipoDocumento = usuario['TipoDocumento'];
    _primerNombreController.text = usuario['Primer_Nombre'] ?? '';
    _segundoNombreController.text = usuario['Segundo_Nombre'] ?? '';
    _primerApellidoController.text = usuario['Primer_Apellido'] ?? '';
    _segundoApellidoController.text = usuario['Segundo_Apellido'] ?? '';
    _telefonoController.text = usuario['Telefono'] ?? '';
    _correoController.text = usuario['Correo'] ?? '';
    _rolFK = usuario['Rol_FK'];
    _estadoPersonaFK = usuario['EstadoPersona_FK'] ?? 1;
  }

  @override
  void dispose() {
    _numeroDocumentoController.dispose();
    _primerNombreController.dispose();
    _segundoNombreController.dispose();
    _primerApellidoController.dispose();
    _segundoApellidoController.dispose();
    _telefonoController.dispose();
    _correoController.dispose();
    super.dispose();
  }

  String? _validarNombre(String? value, String campo) {
    if (value == null || value.trim().isEmpty) {
      return '$campo es requerido';
    }
    final nameRegex = RegExp(r'^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]*$');
    if (!nameRegex.hasMatch(value)) {
      return '$campo solo puede contener letras';
    }
    return null;
  }

  String? _validarTelefono(String? value) {
    if (value == null || value.trim().isEmpty) {
      return 'El teléfono es requerido';
    }
    if (!RegExp(r'^\d{10}$').hasMatch(value)) {
      return 'El teléfono debe tener 10 dígitos';
    }
    return null;
  }

  String? _validarCorreo(String? value) {
    if (value == null || value.trim().isEmpty) {
      return 'El correo es requerido';
    }
    if (!RegExp(r'^[^\s@]+@[^\s@]+\.[^\s@]+$').hasMatch(value)) {
      return 'El formato del correo no es válido';
    }
    return null;
  }

  void _guardarCambios() async {
    if (_formKey.currentState!.validate()) {
      if (_tipoDocumento == null) {
        _mostrarError('Debe seleccionar un tipo de documento');
        return;
      }
      if (_rolFK == null) {
        _mostrarError('Debe seleccionar un rol');
        return;
      }

      setState(() => _isLoading = true);

      // Simular delay de guardado
      await Future.delayed(const Duration(seconds: 1));

      final usuarioActualizado = {
        'idPersona': widget.usuario?['idPersona'],
        'TipoDocumento': _tipoDocumento,
        'NumeroDocumento': _numeroDocumentoController.text.trim(),
        'Primer_Nombre': _primerNombreController.text.trim(),
        'Segundo_Nombre': _segundoNombreController.text.trim(),
        'Primer_Apellido': _primerApellidoController.text.trim(),
        'Segundo_Apellido': _segundoApellidoController.text.trim(),
        'Telefono': _telefonoController.text.trim(),
        'Correo': _correoController.text.trim(),
        'Rol_FK': _rolFK,
        'EstadoPersona_FK': _estadoPersonaFK,
      };

      setState(() => _isLoading = false);

      if (widget.onGuardar != null) {
        widget.onGuardar!(usuarioActualizado);
      }

      _mostrarExito('Usuario actualizado correctamente');
      Navigator.of(context).pop();
    }
  }

  void _mostrarExito(String mensaje) {
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text(mensaje),
        backgroundColor: Colors.green,
        behavior: SnackBarBehavior.floating,
      ),
    );
  }

  void _mostrarError(String mensaje) {
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text(mensaje),
        backgroundColor: Colors.red,
        behavior: SnackBarBehavior.floating,
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Dialog(
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
      child: Container(
        constraints: const BoxConstraints(maxWidth: 700, maxHeight: 650),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            // Header
            Container(
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(
                color: Colors.white,
                borderRadius: const BorderRadius.only(
                  topLeft: Radius.circular(12),
                  topRight: Radius.circular(12),
                ),
                boxShadow: [
                  BoxShadow(
                    color: Colors.grey.shade200,
                    offset: const Offset(0, 1),
                    blurRadius: 3,
                  ),
                ],
              ),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  const Text(
                    'Editar Usuario',
                    style: TextStyle(
                      fontSize: 20,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  IconButton(
                    icon: const Icon(Icons.close),
                    onPressed: () => Navigator.of(context).pop(),
                  ),
                ],
              ),
            ),

            // Body
            Expanded(
              child: Container(
                color: Colors.grey.shade50,
                padding: const EdgeInsets.all(20),
                child: Form(
                  key: _formKey,
                  child: SingleChildScrollView(
                    child: Column(
                      children: [
                        if (_isLoading)
                          const Padding(
                            padding: EdgeInsets.only(bottom: 16),
                            child: CircularProgressIndicator(),
                          ),
                        Row(
                          children: [
                            Expanded(
                              child: _buildDropdown(
                                label: 'Tipo de Documento',
                                value: _tipoDocumento,
                                items: tiposDocumento
                                    .map((tipo) => DropdownMenuItem(
                                          value: tipo['value'],
                                          child: Text(tipo['label']!),
                                        ))
                                    .toList(),
                                onChanged: (value) =>
                                    setState(() => _tipoDocumento = value),
                                isRequired: true,
                              ),
                            ),
                            const SizedBox(width: 16),
                            Expanded(
                              child: _buildTextField(
                                label: 'Número de Documento',
                                controller: _numeroDocumentoController,
                                validator: (value) {
                                  if (value == null || value.trim().isEmpty) {
                                    return 'El número de documento es requerido';
                                  }
                                  return null;
                                },
                                isRequired: true,
                              ),
                            ),
                          ],
                        ),
                        const SizedBox(height: 16),
                        Row(
                          children: [
                            Expanded(
                              child: _buildTextField(
                                label: 'Primer Nombre',
                                controller: _primerNombreController,
                                validator: (value) =>
                                    _validarNombre(value, 'El primer nombre'),
                                isRequired: true,
                              ),
                            ),
                            const SizedBox(width: 16),
                            Expanded(
                              child: _buildTextField(
                                label: 'Segundo Nombre',
                                controller: _segundoNombreController,
                                validator: (value) {
                                  if (value != null && value.isNotEmpty) {
                                    return _validarNombre(value, 'El segundo nombre');
                                  }
                                  return null;
                                },
                              ),
                            ),
                          ],
                        ),
                        const SizedBox(height: 16),
                        Row(
                          children: [
                            Expanded(
                              child: _buildTextField(
                                label: 'Primer Apellido',
                                controller: _primerApellidoController,
                                validator: (value) =>
                                    _validarNombre(value, 'El primer apellido'),
                                isRequired: true,
                              ),
                            ),
                            const SizedBox(width: 16),
                            Expanded(
                              child: _buildTextField(
                                label: 'Segundo Apellido',
                                controller: _segundoApellidoController,
                                validator: (value) {
                                  if (value != null && value.isNotEmpty) {
                                    return _validarNombre(value, 'El segundo apellido');
                                  }
                                  return null;
                                },
                              ),
                            ),
                          ],
                        ),
                        const SizedBox(height: 16),
                        Row(
                          children: [
                            Expanded(
                              child: _buildTextField(
                                label: 'Teléfono',
                                controller: _telefonoController,
                                keyboardType: TextInputType.phone,
                                validator: _validarTelefono,
                                isRequired: true,
                                hintText: 'Ej: 3001234567',
                              ),
                            ),
                            const SizedBox(width: 16),
                            Expanded(
                              child: _buildTextField(
                                label: 'Correo',
                                controller: _correoController,
                                keyboardType: TextInputType.emailAddress,
                                validator: _validarCorreo,
                                isRequired: true,
                              ),
                            ),
                          ],
                        ),
                        const SizedBox(height: 16),
                        Row(
                          children: [
                            Expanded(
                              child: _buildDropdown(
                                label: 'Rol',
                                value: _rolFK,
                                items: roles
                                    .map((rol) => DropdownMenuItem(
                                          value: rol['id'] as int,
                                          child: Text(rol['nombre']),
                                        ))
                                    .toList(),
                                onChanged: (value) =>
                                    setState(() => _rolFK = value),
                                isRequired: true,
                              ),
                            ),
                            const SizedBox(width: 16),
                            Expanded(
                              child: _buildDropdown(
                                label: 'Estado',
                                value: _estadoPersonaFK,
                                items: estados
                                    .map((estado) => DropdownMenuItem(
                                          value: estado['id'] as int,
                                          child: Text(estado['nombre']),
                                        ))
                                    .toList(),
                                onChanged: (value) =>
                                    setState(() => _estadoPersonaFK = value!),
                                isRequired: true,
                              ),
                            ),
                          ],
                        ),
                      ],
                    ),
                  ),
                ),
              ),
            ),

            // Footer
            Container(
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(
                color: Colors.white,
                border: Border(
                  top: BorderSide(color: Colors.grey.shade300),
                ),
              ),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.end,
                children: [
                  TextButton(
                    onPressed: _isLoading
                        ? null
                        : () => Navigator.of(context).pop(),
                    child: const Text('Cancelar'),
                  ),
                  const SizedBox(width: 12),
                  ElevatedButton(
                    onPressed: _isLoading ? null : _guardarCambios,
                    style: ElevatedButton.styleFrom(
                      backgroundColor: Colors.blue,
                      foregroundColor: Colors.white,
                      padding: const EdgeInsets.symmetric(
                        horizontal: 24,
                        vertical: 12,
                      ),
                    ),
                    child: _isLoading
                        ? const SizedBox(
                            width: 20,
                            height: 20,
                            child: CircularProgressIndicator(
                              strokeWidth: 2,
                              valueColor:
                                  AlwaysStoppedAnimation<Color>(Colors.white),
                            ),
                          )
                        : const Text('Guardar Cambios'),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildTextField({
    required String label,
    required TextEditingController controller,
    String? Function(String?)? validator,
    bool isRequired = false,
    TextInputType? keyboardType,
    String? hintText,
  }) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Row(
          children: [
            Text(
              label,
              style: const TextStyle(
                fontWeight: FontWeight.w500,
                fontSize: 14,
              ),
            ),
            if (isRequired)
              const Text(
                ' *',
                style: TextStyle(color: Colors.red),
              ),
          ],
        ),
        const SizedBox(height: 8),
        TextFormField(
          controller: controller,
          validator: validator,
          keyboardType: keyboardType,
          enabled: !_isLoading,
          decoration: InputDecoration(
            hintText: hintText,
            border: OutlineInputBorder(
              borderRadius: BorderRadius.circular(8),
            ),
            contentPadding: const EdgeInsets.symmetric(
              horizontal: 12,
              vertical: 12,
            ),
            filled: true,
            fillColor: Colors.white,
          ),
        ),
      ],
    );
  }

  Widget _buildDropdown<T>({
    required String label,
    required T? value,
    required List<DropdownMenuItem<T>> items,
    required void Function(T?) onChanged,
    bool isRequired = false,
  }) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Row(
          children: [
            Text(
              label,
              style: const TextStyle(
                fontWeight: FontWeight.w500,
                fontSize: 14,
              ),
            ),
            if (isRequired)
              const Text(
                ' *',
                style: TextStyle(color: Colors.red),
              ),
          ],
        ),
        const SizedBox(height: 8),
        DropdownButtonFormField<T>(
          value: value,
          items: items,
          onChanged: _isLoading ? null : onChanged,
          decoration: InputDecoration(
            border: OutlineInputBorder(
              borderRadius: BorderRadius.circular(8),
            ),
            contentPadding: const EdgeInsets.symmetric(
              horizontal: 12,
              vertical: 12,
            ),
            filled: true,
            fillColor: Colors.white,
          ),
        ),
      ],
    );
  }
}