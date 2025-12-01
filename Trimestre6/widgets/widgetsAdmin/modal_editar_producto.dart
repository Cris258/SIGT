import 'package:flutter/material.dart';

class ModalEditarProducto extends StatefulWidget {
  final Map<String, dynamic> producto;
  final VoidCallback onClose;
  final Function(Map<String, dynamic>) onGuardar;

  const ModalEditarProducto({
    super.key,
    required this.producto,
    required this.onClose,
    required this.onGuardar,
  });

  @override
  State<ModalEditarProducto> createState() => _ModalEditarProductoState();
}

class _ModalEditarProductoState extends State<ModalEditarProducto> {
  final _formKey = GlobalKey<FormState>();

  late TextEditingController nombreCtrl;
  late TextEditingController stockCtrl;
  late TextEditingController precioCtrl;

  String? colorSeleccionado;
  String? tallaSeleccionada;

  final List<String> colores = [
    "Rojo", "Azul", "Verde", "Amarillo", "Negro", "Blanco",
    "Gris", "Rosa", "Morado", "Naranja", "Café", "Beige",
    "Celeste", "Turquesa", "Violeta", "Fucsia", "Marino", "Vino", "Crema"
  ];

  final List<String> tallas = ["XS", "S", "M", "L", "XL", "XXL"];

  @override
  void initState() {
    super.initState();

    nombreCtrl = TextEditingController(text: widget.producto["NombreProducto"]);
    stockCtrl = TextEditingController(text: widget.producto["Stock"].toString());
    precioCtrl = TextEditingController(text: widget.producto["Precio"].toString());

    colorSeleccionado = widget.producto["Color"];
    tallaSeleccionada = widget.producto["Talla"];
  }

  @override
  void dispose() {
    nombreCtrl.dispose();
    stockCtrl.dispose();
    precioCtrl.dispose();
    super.dispose();
  }

  void _guardar() {
    if (_formKey.currentState!.validate()) {
      final productoActualizado = {
        "idProducto": widget.producto["idProducto"],
        "NombreProducto": nombreCtrl.text.trim(),
        "Color": colorSeleccionado,
        "Talla": tallaSeleccionada,
        "Stock": int.parse(stockCtrl.text),
        "Precio": double.parse(precioCtrl.text),
      };
      widget.onGuardar(productoActualizado);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Dialog(
      insetPadding: const EdgeInsets.all(20),
      child: Padding(
        padding: const EdgeInsets.all(20),
        child: SingleChildScrollView(
          child: Form(
            key: _formKey,
            child: Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                const Text(
                  "Editar Producto",
                  style: TextStyle(fontSize: 22, fontWeight: FontWeight.bold),
                ),

                const SizedBox(height: 20),

                // Nombre producto
                TextFormField(
                  controller: nombreCtrl,
                  decoration: const InputDecoration(
                    labelText: "Nombre del Producto",
                    border: OutlineInputBorder(),
                  ),
                  validator: (value) =>
                      value!.trim().isEmpty ? "El nombre es obligatorio" : null,
                ),

                const SizedBox(height: 20),

                // Color
                DropdownButtonFormField<String>(
                  value: colorSeleccionado,
                  decoration: const InputDecoration(
                    labelText: "Color",
                    border: OutlineInputBorder(),
                  ),
                  items: colores
                      .map((c) => DropdownMenuItem(value: c, child: Text(c)))
                      .toList(),
                  onChanged: (v) => setState(() => colorSeleccionado = v),
                  validator: (value) =>
                      value == null ? "Seleccione un color" : null,
                ),

                const SizedBox(height: 20),

                // Talla
                DropdownButtonFormField<String>(
                  value: tallaSeleccionada,
                  decoration: const InputDecoration(
                    labelText: "Talla",
                    border: OutlineInputBorder(),
                  ),
                  items: tallas
                      .map((t) => DropdownMenuItem(value: t, child: Text(t)))
                      .toList(),
                  onChanged: (v) => setState(() => tallaSeleccionada = v),
                  validator: (value) =>
                      value == null ? "Seleccione una talla" : null,
                ),

                const SizedBox(height: 20),

                // Stock
                TextFormField(
                  controller: stockCtrl,
                  keyboardType: TextInputType.number,
                  decoration: const InputDecoration(
                    labelText: "Stock",
                    border: OutlineInputBorder(),
                  ),
                  validator: (value) {
                    if (value == null || value.isEmpty) {
                      return "Campo requerido";
                    }
                    if (int.tryParse(value) == null || int.parse(value) < 0) {
                      return "Ingrese un número válido";
                    }
                    return null;
                  },
                ),

                const SizedBox(height: 20),

                // Precio
                TextFormField(
                  controller: precioCtrl,
                  keyboardType: TextInputType.number,
                  decoration: const InputDecoration(
                    labelText: "Precio",
                    prefixText: "\$ ",
                    border: OutlineInputBorder(),
                  ),
                  validator: (value) {
                    if (value == null || value.isEmpty) {
                      return "Campo requerido";
                    }
                    if (double.tryParse(value) == null ||
                        double.parse(value) <= 0) {
                      return "Ingrese un precio válido";
                    }
                    return null;
                  },
                ),

                const SizedBox(height: 25),

                Row(
                  mainAxisAlignment: MainAxisAlignment.end,
                  children: [
                    TextButton(
                      onPressed: widget.onClose,
                      child: const Text("Cancelar"),
                    ),
                    const SizedBox(width: 10),
                    ElevatedButton(
                      onPressed: _guardar,
                      child: const Text("Guardar Cambios"),
                    ),
                  ],
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}