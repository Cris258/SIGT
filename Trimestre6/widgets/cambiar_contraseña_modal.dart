import 'package:flutter/material.dart';

class CambiarContrasenaModal extends StatefulWidget {
  const CambiarContrasenaModal({super.key});

  @override
  State<CambiarContrasenaModal> createState() => _CambiarContrasenaModalState();
}

class _CambiarContrasenaModalState extends State<CambiarContrasenaModal> {
  final _formKey = GlobalKey<FormState>();
  String _currentPassword = '';
  String _newPassword = '';
  String _confirmPassword = '';
  bool _isLoading = false;

  // ------------------------------------
  // SIMULACIÓN DE LA API
  // ------------------------------------
  Future<void> _mockCambiarContrasena(String actual, String nueva) async {
    setState(() { _isLoading = true; });
    await Future.delayed(const Duration(milliseconds: 1500));
    setState(() { _isLoading = false; });

    // Simula que la contraseña actual es incorrecta
    if (actual != "password123") { 
      throw Exception('La contraseña actual es incorrecta.');
    }
    debugPrint('✅ [MOCK API] Contraseña cambiada con éxito.');
  }

  void _mostrarSnackBar(BuildContext context, String message) {
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(content: Text(message)),
    );
  }

  Future<void> _handleSubmit() async {
    if (_formKey.currentState!.validate()) {
      try {
        await _mockCambiarContrasena(_currentPassword, _newPassword); // MOCK API
        _mostrarSnackBar(context, 'Contraseña actualizada correctamente (Simulado)');
        if (mounted) Navigator.of(context).pop();
      } on Exception catch (e) {
        // Muestra el mensaje de error de la simulación
        _mostrarSnackBar(context, 'Error: ${e.toString().split(':').last.trim()}');
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    return AlertDialog(
      title: const Text('Cambiar Contraseña'),
      content: SingleChildScrollView(
        child: Form(
          key: _formKey,
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: <Widget>[
              // Campo: Contraseña Actual
              TextFormField(
                obscureText: true,
                onChanged: (value) => _currentPassword = value,
                decoration: const InputDecoration(
                  labelText: 'Contraseña Actual *',
                  border: OutlineInputBorder(),
                ),
                validator: (value) {
                  if (value == null || value.isEmpty) {
                    return 'Ingrese su contraseña actual';
                  }
                  return null;
                },
              ),
              const SizedBox(height: 16),
              // Campo: Nueva Contraseña
              TextFormField(
                obscureText: true,
                onChanged: (value) => _newPassword = value,
                decoration: const InputDecoration(
                  labelText: 'Nueva Contraseña (mín. 8 caracteres) *',
                  border: OutlineInputBorder(),
                ),
                validator: (value) {
                  if (value == null || value.length < 8) {
                    return 'Debe tener al menos 8 caracteres';
                  }
                  return null;
                },
              ),
              const SizedBox(height: 16),
              // Campo: Confirmar Contraseña
              TextFormField(
                obscureText: true,
                onChanged: (value) => _confirmPassword = value,
                decoration: const InputDecoration(
                  labelText: 'Confirmar Nueva Contraseña *',
                  border: OutlineInputBorder(),
                ),
                validator: (value) {
                  if (value != _newPassword) {
                    return 'Las contraseñas no coinciden';
                  }
                  return null;
                },
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
                  child: CircularProgressIndicator(strokeWidth: 2))
              : const Text('Guardar'),
        ),
      ],
    );
  }
}