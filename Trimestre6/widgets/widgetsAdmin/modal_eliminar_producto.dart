import 'package:flutter/material.dart';
import 'package:intl/intl.dart';

class ModalEliminarProducto extends StatelessWidget {
  final Map<String, dynamic> producto;
  final VoidCallback onClose;
  final Function(Map<String, dynamic>) onConfirmar;
  final bool loading;

  const ModalEliminarProducto({
    super.key,
    required this.producto,
    required this.onClose,
    required this.onConfirmar,
    this.loading = false,
  });

  // Mapa de colores
  Color getColorCode(String? colorName) {
    if (colorName == null) return Colors.grey;

    final colorMap = {
      "rojo": Colors.red,
      "azul": Colors.blue,
      "verde": Colors.green,
      "amarillo": Colors.yellow,
      "negro": Colors.black,
      "blanco": Colors.white,
      "gris": Colors.grey,
      "rosa": Color(0xffffc0cb),
      "morado": Color(0xff800080),
      "naranja": Color(0xffffa500),
      "cafe": Color(0xff8b4513),
      "café": Color(0xff8b4513),
      "beige": Color(0xfff5f5dc),
      "celeste": Color(0xff87ceeb),
      "turquesa": Color(0xff40e0d0),
      "violeta": Color(0xffee82ee),
      "fucsia": Color(0xffff00ff),
      "marino": Color(0xff000080),
      "vino": Color(0xff722f37),
      "crema": Color(0xfffffdd0),
    };

    final key = colorName.toLowerCase().trim();
    return colorMap[key] ?? Colors.grey;
  }

  // Formato de precio COP
  String formatearPrecio(num precio) {
    final f = NumberFormat.currency(
      locale: "es_CO",
      symbol: "\$",
      decimalDigits: 0,
    );
    return f.format(precio);
  }

  @override
  Widget build(BuildContext context) {
    return AlertDialog(
      backgroundColor: Colors.white,
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
      titlePadding: EdgeInsets.zero,
      title: Container(
        padding: const EdgeInsets.all(16),
        decoration: const BoxDecoration(
          color: Colors.red,
          borderRadius: BorderRadius.vertical(top: Radius.circular(12)),
        ),
        child: const Row(
          children: [
            Icon(Icons.warning_rounded, color: Colors.white),
            SizedBox(width: 8),
            Text(
              "Confirmar Eliminación",
              style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold),
            ),
          ],
        ),
      ),

      content: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          // Advertencia
          Container(
            padding: const EdgeInsets.all(12),
            decoration: BoxDecoration(
              color: Colors.yellow.shade100,
              borderRadius: BorderRadius.circular(8),
            ),
            child: const Text(
              "⚠️ Esta acción no se puede deshacer.",
              style: TextStyle(fontWeight: FontWeight.bold),
            ),
          ),

          const SizedBox(height: 12),

          Text(
            "¿Está seguro que desea eliminar el producto "
            "${producto["NombreProducto"]}?",
            textAlign: TextAlign.center,
          ),

          const SizedBox(height: 10),

          // CARD INFORMACIÓN
          Container(
            padding: const EdgeInsets.all(12),
            decoration: BoxDecoration(
              color: Colors.grey.shade100,
              borderRadius: BorderRadius.circular(10),
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const Text(
                  "Información del producto:",
                  style: TextStyle(fontWeight: FontWeight.bold),
                ),
                const SizedBox(height: 6),

                Text("ID: ${producto["idProducto"]}"),
                Text("Nombre: ${producto["NombreProducto"]}"),

                Row(
                  children: [
                    const Text("Color: "),
                    Container(
                      width: 20,
                      height: 20,
                      decoration: BoxDecoration(
                        color: getColorCode(producto["Color"]),
                        shape: BoxShape.circle,
                        border: Border.all(color: Colors.grey),
                      ),
                    ),
                    const SizedBox(width: 6),
                    Text(producto["Color"]),
                  ],
                ),

                Text("Talla: ${producto["Talla"]}"),

                Text(
                  "Stock: ${producto["Stock"]}",
                  style: TextStyle(
                    color: producto["Stock"] > 10
                        ? Colors.green
                        : producto["Stock"] > 5
                            ? Colors.orange
                            : Colors.red,
                    fontWeight: FontWeight.bold,
                  ),
                ),

                Text("Precio: ${formatearPrecio(producto["Precio"])}"),
              ],
            ),
          ),

          if (producto["Stock"] > 0)
            Container(
              margin: const EdgeInsets.only(top: 12),
              padding: const EdgeInsets.all(10),
              decoration: BoxDecoration(
                color: Colors.blue.shade50,
                borderRadius: BorderRadius.circular(8),
              ),
              child: const Text(
                "ℹ️ Este producto tiene stock disponible. "
                "Al eliminarlo, se perderá el inventario registrado.",
                textAlign: TextAlign.center,
              ),
            ),
        ],
      ),

      actions: [
        TextButton(
          onPressed: loading ? null : onClose,
          child: const Text("Cancelar"),
        ),
        ElevatedButton.icon(
          onPressed: loading ? null : () => onConfirmar(producto),
          icon: loading
              ? const SizedBox(
                  width: 16,
                  height: 16,
                  child: CircularProgressIndicator(strokeWidth: 2),
                )
              : const Icon(Icons.delete),
          label: Text(loading ? "Eliminando..." : "Eliminar"),
          style: ElevatedButton.styleFrom(
            backgroundColor: Colors.red,
            foregroundColor: Colors.white,
          ),
        ),
      ],
    );
  }
}