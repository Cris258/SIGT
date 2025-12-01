import 'package:flutter/material.dart';
import '../widgets/header_widget.dart';
import '../widgets/footer_widget.dart';

class RegistroProductos extends StatefulWidget {
  const RegistroProductos({super.key});

  @override
  State<RegistroProductos> createState() => _RegistroProductosState();
}

class _RegistroProductosState extends State<RegistroProductos> {
  final _formKey = GlobalKey<FormState>();

  String? _colorSeleccionado;
  String? _tallaSeleccionada;

  final List<String> colores = [
    "Rojo", "Azul", "Verde", "Amarillo", "Negro", "Blanco", "Gris",
    "Rosa", "Morado", "Naranja", "Café", "Beige", "Celeste", "Turquesa",
    "Violeta", "Fucsia", "Marino", "Vino", "Crema",
  ];

  final List<String> tallas = [
    "2","4","6","8","10","12","14","16","XS","S","M","L","XL"
  ];

  HeaderWidget headerWidget = HeaderWidget();
  FooterWidget footerWidget = FooterWidget();

  @override
  Widget build(BuildContext context) {
    const Color fondo = Color(0xFFE6C7F6);
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
        borderSide: BorderSide(color: Colors.purple, width: 1.5),
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
      backgroundColor: fondo,
      body: SingleChildScrollView(
        child: Column(
          children: [
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
                        "Registra un nuevo producto en el inventario.",
                        textAlign: TextAlign.center,
                        style: TextStyle(fontSize: 15, color: Colors.grey),
                      ),
                      const SizedBox(height: 35),

                      // Nombre Producto
                      const Text("Nombre del Producto", style: labelStyle),
                      const SizedBox(height: 10),
                      TextFormField(
                        decoration: fieldDecoration.copyWith(
                          hintText: "Ej: Pijama Unicornio",
                        ),
                        validator: (value) =>
                            value!.isEmpty ? 'Campo requerido' : null,
                      ),

                      const SizedBox(height: 25),

                      // Color
                      const Text("Color", style: labelStyle),
                      const SizedBox(height: 10),
                      DropdownButtonFormField<String>(
                        decoration: fieldDecoration.copyWith(
                          hintText: "Seleccione un color",
                        ),
                        value: _colorSeleccionado,
                        items: colores
                            .map((c) =>
                                DropdownMenuItem(value: c, child: Text(c)))
                            .toList(),
                        onChanged: (value) =>
                            setState(() => _colorSeleccionado = value),
                      ),

                      const SizedBox(height: 25),

                      // Talla
                      const Text("Talla", style: labelStyle),
                      const SizedBox(height: 10),
                      DropdownButtonFormField<String>(
                        decoration: fieldDecoration.copyWith(
                          hintText: "Seleccione una talla",
                        ),
                        value: _tallaSeleccionada,
                        items: tallas
                            .map((t) =>
                                DropdownMenuItem(value: t, child: Text(t)))
                            .toList(),
                        onChanged: (value) =>
                            setState(() => _tallaSeleccionada = value),
                      ),

                      const SizedBox(height: 25),

                      // Stock
                      const Text("Stock", style: labelStyle),
                      const SizedBox(height: 10),
                      TextFormField(
                        keyboardType: TextInputType.number,
                        decoration: fieldDecoration.copyWith(
                          hintText: "Ej: 10, 20, 30",
                        ),
                        validator: (value) =>
                            value!.isEmpty ? 'Campo requerido' : null,
                      ),

                      const SizedBox(height: 25),

                      // Precio
                      const Text("Precio (COP)", style: labelStyle),
                      const SizedBox(height: 10),
                      TextFormField(
                        keyboardType: TextInputType.number,
                        decoration: fieldDecoration.copyWith(
                          hintText: "Ej: 50000",
                        ),
                        validator: (value) =>
                            value!.isEmpty ? 'Campo requerido' : null,
                      ),

                      const SizedBox(height: 45),

                      // Botón Registrar
                      ElevatedButton(
                        onPressed: () {
                          if (_formKey.currentState!.validate()) {
                            ScaffoldMessenger.of(context).showSnackBar(
                              const SnackBar(
                                content: Text("Producto registrado (local)"),
                                backgroundColor: Colors.green,
                              ),
                            );
                          }
                        },
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
                        child: const Text("REGISTRAR PRODUCTO"),
                      ),
                    ],
                  ),
                ),
              ),
            ),

            footerWidget,
          ],
        ),
      ),
    );
  }
}
