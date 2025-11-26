import 'package:flutter/material.dart';

// ------------------------------------
// 1. MODELO DE DATOS (Ajustado)
// ------------------------------------
class Persona {
  final String tipoDocumento;
  final String numeroDocumento;
  final String primerNombre;
  final String segundoNombre; // <--- Ya no es requerido con 'required' en el constructor
  final String primerApellido;
  final String segundoApellido;
  final String telefono;
  final String correo;

  Persona({
    required this.tipoDocumento,
    required this.numeroDocumento,
    required this.primerNombre,
    required this.primerApellido,
    required this.correo,
    // Hacemos que estos campos tengan un valor por defecto si se omiten (String vacío)
    this.segundoNombre = '', // <--- CORRECCIÓN CLAVE: Valor por defecto
    this.segundoApellido = '', // <--- Valor por defecto
    this.telefono = '', // <--- Valor por defecto
  });

  // Método para crear una copia (útil para la actualización)
  Persona copyWith({
    String? primerNombre,
    String? segundoNombre,
    String? primerApellido,
    String? segundoApellido,
    String? telefono,
  }) {
    return Persona(
      tipoDocumento: tipoDocumento,
      numeroDocumento: numeroDocumento,
      primerNombre: primerNombre ?? this.primerNombre,
      segundoNombre: segundoNombre ?? this.segundoNombre,
      primerApellido: primerApellido ?? this.primerApellido,
      segundoApellido: segundoApellido ?? this.segundoApellido,
      telefono: telefono ?? this.telefono,
      correo: correo,
    );
  }
}


// ------------------------------------
// 2. SIMULACIÓN DE LA API (Ajustado)
// ------------------------------------

final MOCK_USER_DATA = Persona(
  tipoDocumento: 'CC',
  numeroDocumento: '1010101010',
  primerNombre: 'Juan',
  segundoNombre: 'David', // Se pasa valor, pero es opcional en el constructor
  primerApellido: 'Pérez',
  segundoApellido: 'Gómez',
  telefono: '3001234567',
  correo: 'juan.perez@example.com',
);

Future<Persona> mockCargarDatosUsuario() async {
  await Future.delayed(const Duration(milliseconds: 1000));
  debugPrint('✅ [MOCK API] Datos de usuario simulados cargados.');
  return MOCK_USER_DATA;
}

Future<void> mockActualizarDatos(Persona data) async {
  await Future.delayed(const Duration(milliseconds: 1500));
  if (data.primerNombre == "ErrorSimulado") {
    debugPrint('❌ [MOCK API] Error de actualización simulado.');
    throw Exception('El servidor rechazó el nombre.');
  }
  debugPrint('✅ [MOCK API] Datos de usuario simulados actualizados con éxito: ${data.primerNombre}');
}


// ------------------------------------
// 3. WIDGET DEL MODAL
// ------------------------------------

class ActualizarDatosModal extends StatefulWidget {
  const ActualizarDatosModal({super.key});

  @override
  State<ActualizarDatosModal> createState() => _ActualizarDatosModalState();
}

class _ActualizarDatosModalState extends State<ActualizarDatosModal> {
  late Persona formData;
  bool _isLoading = true;
  final _formKey = GlobalKey<FormState>();
  
  Map<String, String?> errors = {};

  @override
  void initState() {
    super.initState();
    // CORRECCIÓN CLAVE: Ahora solo necesitamos los campos 'required' originales.
    // Los campos 'segundoNombre', 'segundoApellido' y 'telefono' se inicializan a '' 
    // automáticamente por el constructor de la clase Persona.
    formData = Persona(
      tipoDocumento: '',
      numeroDocumento: '',
      primerNombre: '',
      primerApellido: '',
      correo: '',
    );
    _cargarDatosUsuario();
  }

  Future<void> _cargarDatosUsuario() async {
    // ... (El resto de la lógica de carga permanece igual)
    try {
      final data = await mockCargarDatosUsuario(); 
      setState(() {
        formData = data;
        _isLoading = false;
      });
    } catch (e) {
      debugPrint('Error al cargar datos: $e');
      setState(() {
        _isLoading = false;
      });
      _mostrarSnackBar(context, 'Error al cargar los datos del usuario.');
    }
  }

  Future<void> _handleSubmit() async {
    // ... (El resto de la lógica de envío permanece igual)
    if (_formKey.currentState!.validate()) {
      setState(() {
        _isLoading = true;
      });
      try {
        await mockActualizarDatos(formData);
        _mostrarSnackBar(context, 'Datos actualizados correctamente (Simulado)');
        if (mounted) Navigator.of(context).pop();
      } on Exception catch (e) {
        _mostrarSnackBar(context, 'Error al actualizar: ${e.toString()}');
      } finally {
        setState(() {
          _isLoading = false;
        });
      }
    }
  }

  void _mostrarSnackBar(BuildContext context, String message) {
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(content: Text(message)),
    );
  }

  // Constructor de campo de texto reutilizable
  Widget _buildTextField({
    required String label,
    required String initialValue,
    required void Function(String)? onChanged,
    bool readOnly = false,
    bool isRequired = false,
    String? Function(String?)? validator,
    TextInputType keyboardType = TextInputType.text,
  }) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 16.0),
      child: TextFormField(
        initialValue: initialValue,
        onChanged: onChanged,
        readOnly: readOnly,
        keyboardType: keyboardType,
        validator: (value) {
          if (isRequired && (value == null || value.trim().isEmpty)) {
            return '$label es requerido';
          }
          if (validator != null) {
            return validator(value);
          }
          return null;
        },
        decoration: InputDecoration(
          labelText: label + (isRequired ? ' *' : ''),
          border: const OutlineInputBorder(),
          filled: readOnly,
          fillColor: readOnly ? Colors.grey[200] : null,
          errorText: errors[label],
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return AlertDialog(
      title: const Text('Actualizar Datos'),
      content: SingleChildScrollView(
        child: Form(
          key: _formKey,
          child: _isLoading
              ? const Center(child: CircularProgressIndicator())
              : Column(
                  mainAxisSize: MainAxisSize.min,
                  children: <Widget>[
                    // 1. Tipo de Documento (Solo lectura)
                    _buildTextField(
                      label: 'Tipo de Documento',
                      initialValue: formData.tipoDocumento,
                      onChanged: null,
                      readOnly: true,
                    ),

                    // 2. Número de Documento (Solo lectura)
                    _buildTextField(
                      label: 'Número de Documento',
                      initialValue: formData.numeroDocumento,
                      onChanged: null,
                      readOnly: true,
                    ),

                    // 3. Primer Nombre
                    _buildTextField(
                      label: 'Primer Nombre',
                      initialValue: formData.primerNombre,
                      isRequired: true,
                      onChanged: (value) => formData = formData.copyWith(primerNombre: value),
                      validator: (value) {
                        if (value != null && !RegExp(r'^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]*$').hasMatch(value)) {
                          return 'El nombre solo puede contener letras';
                        }
                        return null;
                      },
                    ),

                    // 4. Segundo Nombre
                    _buildTextField(
                      label: 'Segundo Nombre',
                      initialValue: formData.segundoNombre,
                      onChanged: (value) => formData = formData.copyWith(segundoNombre: value),
                      validator: (value) {
                        if (value != null && value.isNotEmpty && !RegExp(r'^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]*$').hasMatch(value)) {
                          return 'El nombre solo puede contener letras';
                        }
                        return null;
                      },
                    ),

                    // 5. Primer Apellido
                    _buildTextField(
                      label: 'Primer Apellido',
                      initialValue: formData.primerApellido,
                      isRequired: true,
                      onChanged: (value) => formData = formData.copyWith(primerApellido: value),
                      validator: (value) {
                        if (value != null && !RegExp(r'^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]*$').hasMatch(value)) {
                          return 'El apellido solo puede contener letras';
                        }
                        return null;
                      },
                    ),

                    // 6. Segundo Apellido
                    _buildTextField(
                      label: 'Segundo Apellido',
                      initialValue: formData.segundoApellido,
                      onChanged: (value) => formData = formData.copyWith(segundoApellido: value),
                      validator: (value) {
                        if (value != null && value.isNotEmpty && !RegExp(r'^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]*$').hasMatch(value)) {
                          return 'El apellido solo puede contener letras';
                        }
                        return null;
                      },
                    ),

                    // 7. Teléfono
                    _buildTextField(
                      label: 'Número de Teléfono',
                      initialValue: formData.telefono,
                      keyboardType: TextInputType.phone,
                      onChanged: (value) => formData = formData.copyWith(telefono: value),
                      validator: (value) {
                        if (value != null && value.isNotEmpty && !RegExp(r'^\d{10}$').hasMatch(value)) {
                          return 'El teléfono debe tener 10 dígitos';
                        }
                        return null;
                      },
                    ),

                    // 8. Correo Electrónico (Solo lectura)
                    _buildTextField(
                      label: 'Correo Electrónico',
                      initialValue: formData.correo,
                      onChanged: null,
                      readOnly: true,
                    ),
                  ],
                ),
        ),
      ),
      actions: <Widget>[
        TextButton(
          onPressed: () => Navigator.of(context).pop(),
          child: const Text('Cancelar'),
        ),
        ElevatedButton(
          onPressed: _isLoading ? null : _handleSubmit,
          child: _isLoading 
            ? const SizedBox(
                height: 20, 
                width: 20, 
                child: CircularProgressIndicator(strokeWidth: 2)
              )
            : const Text('Finalizar'),
        ),
      ],
    );
  }
}