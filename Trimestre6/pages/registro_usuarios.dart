import 'package:flutter/material.dart';
  import '../widgets/header_widget.dart';
  import '../widgets/footer_widget.dart';

class RegistroUsuarios extends StatefulWidget {
  const RegistroUsuarios({super.key});

  @override
  State<RegistroUsuarios> createState() => _RegistroUsuariosState();
}

class _RegistroUsuariosState extends State<RegistroUsuarios> {
  final _formKey = GlobalKey<FormState>();

  bool _showPassword = false;
  String? _tipoDocumento;
  String? _rolSeleccionado;

  final List<String> _tiposDocumento = ['CC', 'TI', 'CE', 'Pasaporte'];
  final List<String> _roles = ['Administrador', 'Vendedor', 'Cliente'];

  void _togglePassword() {
    setState(() => _showPassword = !_showPassword);
  }

  void _handleSubmit() {
    if (_formKey.currentState!.validate()) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content: Text('Formulario validado correctamente'),
          backgroundColor: Colors.green,
        ),
      );
    }
  }

  HeaderWidget headerWidget = HeaderWidget();
  FooterWidget footerWidget = FooterWidget();

  @override
  Widget build(BuildContext context) {
    const Color rosaBoton = Color(0xFFE6C7F6);
    const Color colorTextoBoton = Color(0xFF4A4A4A);

    const InputDecoration fieldDecoration = InputDecoration(
      hintStyle: TextStyle(fontSize: 14, color: Colors.grey),
      border: OutlineInputBorder(
        borderRadius: BorderRadius.all(Radius.circular(10)),
        borderSide: BorderSide(color: Colors.grey, width: 0.5),
      ),
      enabledBorder: OutlineInputBorder(
        borderRadius: BorderRadius.all(Radius.circular(10)),
        borderSide: BorderSide(color: Colors.grey, width: 0.5),
      ),
      focusedBorder: OutlineInputBorder(
        borderRadius: BorderRadius.all(Radius.circular(10)),
        borderSide: BorderSide(color: Color(0xFFE91E63), width: 1.5),
      ),
      filled: true,
      fillColor: Colors.white,
      contentPadding: EdgeInsets.all(16),
    );

    const TextStyle labelStyle = TextStyle(
      fontWeight: FontWeight.w700,
      fontSize: 15,
      color: Color(0xFF4A4A4A),
    );

    return Scaffold(
      // 🔥 Fondo rosado solicitado
      backgroundColor: const Color(0xFFE6C7F6),

      body: SingleChildScrollView(
        child: Column(
          children: [
            // ⭐ HEADER
            headerWidget,

            Padding(
              padding:
                  const EdgeInsets.symmetric(horizontal: 20.0, vertical: 10.0),
              child: Container(
                padding: const EdgeInsets.all(24),
                decoration: BoxDecoration(
                  color: Colors.white,
                  borderRadius: BorderRadius.circular(16),
                  boxShadow: [
                    BoxShadow(
                      color: Colors.black.withOpacity(0.08),
                      spreadRadius: 2,
                      blurRadius: 10,
                      offset: const Offset(0, 4),
                    ),
                  ],
                ),
                child: Form(
                  key: _formKey,
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.stretch,
                    children: [
                      const Text(
                        "¡Vibra Positiva Pijamas!",
                        textAlign: TextAlign.center,
                        style: TextStyle(
                          fontSize: 24,
                          fontWeight: FontWeight.w800,
                          color: Color(0xFF4A4A4A),
                        ),
                      ),
                      const SizedBox(height: 8),
                      const Text(
                        "Regístra a una Persona para que forme parte de nuestro equipo.",
                        textAlign: TextAlign.center,
                        style: TextStyle(fontSize: 15, color: Colors.grey),
                      ),
                      const SizedBox(height: 35),
                      const Text("Número Documento", style: labelStyle),
                      const SizedBox(height: 10),
                      TextFormField(
                        keyboardType: TextInputType.number,
                        decoration: fieldDecoration.copyWith(
                          hintText: "Escriba su número de documento",
                        ),
                        validator: (value) =>
                            value!.isEmpty ? 'Campo requerido' : null,
                      ),
                      const SizedBox(height: 25),
                      const Text("Tipo Documento", style: labelStyle),
                      const SizedBox(height: 10),
                      DropdownButtonFormField<String>(
                        decoration: fieldDecoration.copyWith(
                          hintText: "Seleccione su tipo de documento",
                        ),
                        value: _tipoDocumento,
                        items: _tiposDocumento
                            .map((value) => DropdownMenuItem(
                                value: value, child: Text(value)))
                            .toList(),
                        onChanged: (newValue) =>
                            setState(() => _tipoDocumento = newValue),
                      ),
                      const SizedBox(height: 25),
                      const Text("Primer Nombre", style: labelStyle),
                      const SizedBox(height: 10),
                      TextFormField(
                        decoration: fieldDecoration.copyWith(
                          hintText: "Escriba su nombre",
                        ),
                        validator: (value) =>
                            value!.isEmpty ? 'Campo requerido' : null,
                      ),
                      const SizedBox(height: 25),
                      const Text("Segundo Nombre", style: labelStyle),
                      const SizedBox(height: 10),
                      TextFormField(
                        decoration: fieldDecoration.copyWith(
                          hintText: "Escriba su segundo nombre (opcional)",
                        ),
                      ),
                      const SizedBox(height: 25),
                      const Text("Primer Apellido", style: labelStyle),
                      const SizedBox(height: 10),
                      TextFormField(
                        decoration: fieldDecoration.copyWith(
                          hintText: "Escriba su primer apellido",
                        ),
                        validator: (value) =>
                            value!.isEmpty ? 'Campo requerido' : null,
                      ),
                      const SizedBox(height: 25),
                      const Text("Segundo Apellido", style: labelStyle),
                      const SizedBox(height: 10),
                      TextFormField(
                        decoration: fieldDecoration.copyWith(
                          hintText: "Escriba su segundo apellido (opcional)",
                        ),
                      ),
                      const SizedBox(height: 25),
                      const Text("Número de Teléfono", style: labelStyle),
                      const SizedBox(height: 10),
                      TextFormField(
                        keyboardType: TextInputType.phone,
                        decoration: fieldDecoration.copyWith(
                          hintText: "Ej: 3123456789",
                        ),
                        validator: (value) =>
                            value!.isEmpty ? 'Campo requerido' : null,
                      ),
                      const SizedBox(height: 25),
                      const Text("Correo electrónico", style: labelStyle),
                      const SizedBox(height: 10),
                      TextFormField(
                        keyboardType: TextInputType.emailAddress,
                        decoration: fieldDecoration.copyWith(
                          hintText: "sucorreo@ejemplo.com",
                        ),
                        validator: (value) =>
                            value!.isEmpty ? 'Campo requerido' : null,
                      ),
                      const SizedBox(height: 25),
                      const Text("Contraseña", style: labelStyle),
                      const SizedBox(height: 10),
                      TextFormField(
                        obscureText: !_showPassword,
                        decoration: fieldDecoration.copyWith(
                          hintText: "Ingrese su contraseña",
                          suffixIcon: IconButton(
                            icon: Icon(
                              _showPassword
                                  ? Icons.visibility
                                  : Icons.visibility_off,
                              color: Colors.grey,
                            ),
                            onPressed: _togglePassword,
                          ),
                        ),
                        validator: (value) =>
                            value!.isEmpty ? 'Campo requerido' : null,
                      ),
                      const SizedBox(height: 25),
                      const Text("Rol", style: labelStyle),
                      const SizedBox(height: 10),
                      DropdownButtonFormField<String>(
                        decoration: fieldDecoration.copyWith(
                          hintText: "Seleccione un rol",
                        ),
                        value: _rolSeleccionado,
                        items: _roles
                            .map((rol) =>
                                DropdownMenuItem(value: rol, child: Text(rol)))
                            .toList(),
                        onChanged: (newValue) =>
                            setState(() => _rolSeleccionado = newValue),
                      ),
                      const SizedBox(height: 45),
                      ElevatedButton(
                        onPressed: _handleSubmit,
                        style: ElevatedButton.styleFrom(
                          backgroundColor: rosaBoton,
                          foregroundColor: colorTextoBoton,
                          padding: const EdgeInsets.symmetric(vertical: 18),
                          shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(12),
                          ),
                          textStyle: const TextStyle(
                            fontSize: 18,
                            fontWeight: FontWeight.bold,
                          ),
                          elevation: 0,
                        ),
                        child: const Text("REGISTRARSE"),
                      ),
                    ],
                  ),
                ),
              ),
            ),

            // ⭐ FOOTER
            footerWidget,
          ],
        ),
      ),
    );
  }
}
