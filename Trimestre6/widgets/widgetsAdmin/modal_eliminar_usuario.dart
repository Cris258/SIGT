import 'package:flutter/material.dart';

class ModalEliminar extends StatefulWidget {
  final Map<String, dynamic> usuario; // Recibimos el usuario como un mapa
  final String tipoUsuario;
  final VoidCallback onConfirmar; // Callback para ejecutar tras "eliminar"

  const ModalEliminar({
    super.key,
    required this.usuario,
    this.tipoUsuario = "usuario",
    required this.onConfirmar,
  });

  @override
  State<ModalEliminar> createState() => _ModalEliminarState();
}

class _ModalEliminarState extends State<ModalEliminar> {
  bool _loading = false;

  Future<void> _handleEliminar() async {
    setState(() {
      _loading = true;
    });

    // --- SIMULACIÓN DE LLAMADA A API ---
    print("🗑️ Eliminando ${widget.tipoUsuario}: ${widget.usuario['idPersona']}");
    
    // Simulamos una espera de 2 segundos (como si fuera el fetch)
    await Future.delayed(const Duration(seconds: 2));

    if (!mounted) return;

    setState(() {
      _loading = false;
    });

    // --- ÉXITO SIMULADO ---
    // 1. Cerramos el modal de eliminación actual
    Navigator.of(context).pop(); 

    // 2. Mostramos diálogo de éxito (SweetAlert style)
    showDialog(
      context: context,
      builder: (ctx) => AlertDialog(
        title: const Row(
          children: [
            Icon(Icons.check_circle, color: Colors.green),
            SizedBox(width: 10),
            Text("Eliminado"),
          ],
        ),
        content: Text(
          "El ${widget.tipoUsuario} se eliminó correctamente.",
        ),
        actions: [
          TextButton(
            onPressed: () {
              Navigator.of(ctx).pop(); // Cerrar alerta de éxito
              widget.onConfirmar(); // Ejecutar la acción del padre
            },
            child: const Text("Aceptar"),
          ),
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    // Construcción del nombre completo para mostrar
    final nombreCompleto = "${widget.usuario['Primer_Nombre']} ${widget.usuario['Segundo_Nombre'] ?? ''} ${widget.usuario['Primer_Apellido']} ${widget.usuario['Segundo_Apellido'] ?? ''}";

    return Dialog(
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
      clipBehavior: Clip.antiAlias, // Para que el header rojo respete el borde
      child: Column(
        mainAxisSize: MainAxisSize.min, // El modal se ajusta al contenido
        children: [
          
          // --- HEADER ROJO (Bootstrap danger) ---
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
            color: const Color(0xFFDC3545), // Bootstrap Danger Color
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                const Row(
                  children: [
                    Icon(Icons.warning_amber_rounded, color: Colors.white),
                    SizedBox(width: 8),
                    Text(
                      "Confirmar Eliminación",
                      style: TextStyle(
                        color: Colors.white,
                        fontWeight: FontWeight.bold,
                        fontSize: 16,
                      ),
                    ),
                  ],
                ),
                // Botón cerrar (X)
                InkWell(
                  onTap: () => Navigator.of(context).pop(),
                  child: const Icon(Icons.close, color: Colors.white),
                ),
              ],
            ),
          ),

          // --- BODY ---
          Padding(
            padding: const EdgeInsets.all(20.0),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                
                // Alerta Amarilla (Warning Alert)
                Container(
                  padding: const EdgeInsets.all(12),
                  decoration: BoxDecoration(
                    color: const Color(0xFFFFF3CD), // Bootstrap warning bg
                    border: Border.all(color: const Color(0xFFFFECB5)),
                    borderRadius: BorderRadius.circular(6),
                  ),
                  child: Row(
                    children: [
                      const Icon(Icons.info_outline, color: Color(0xFF856404)),
                      const SizedBox(width: 10),
                      Expanded(
                        child: RichText(
                          text: const TextSpan(
                            style: TextStyle(color: Color(0xFF856404)),
                            children: [
                              TextSpan(text: "Advertencia: ", style: TextStyle(fontWeight: FontWeight.bold)),
                              TextSpan(text: "Esta acción no se puede deshacer."),
                            ],
                          ),
                        ),
                      ),
                    ],
                  ),
                ),
                const SizedBox(height: 20),

                // Pregunta de confirmación
                RichText(
                  text: TextSpan(
                    style: const TextStyle(color: Colors.black, fontSize: 15),
                    children: [
                      TextSpan(text: "¿Está seguro que desea eliminar al ${widget.tipoUsuario} "),
                      TextSpan(
                        text: nombreCompleto,
                        style: const TextStyle(fontWeight: FontWeight.bold),
                      ),
                      const TextSpan(text: " con documento "),
                      TextSpan(
                        text: "${widget.usuario['NumeroDocumento']}",
                        style: const TextStyle(fontWeight: FontWeight.bold),
                      ),
                      const TextSpan(text: "?"),
                    ],
                  ),
                ),
                const SizedBox(height: 15),

                // Tarjeta de detalles (Card bg-light)
                Container(
                  width: double.infinity,
                  padding: const EdgeInsets.all(15),
                  decoration: BoxDecoration(
                    color: Colors.grey[100], // Bootstrap bg-light
                    borderRadius: BorderRadius.circular(6),
                    border: Border.all(color: Colors.grey.shade300),
                  ),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        "Información del ${widget.tipoUsuario}:",
                        style: TextStyle(
                          color: Colors.grey[600],
                          fontWeight: FontWeight.bold,
                          fontSize: 13,
                        ),
                      ),
                      const SizedBox(height: 8),
                      _buildDetailRow("Nombre:", nombreCompleto),
                      _buildDetailRow("Documento:", "${widget.usuario['TipoDocumento']} - ${widget.usuario['NumeroDocumento']}"),
                      _buildDetailRow("Correo:", "${widget.usuario['Correo']}"),
                      _buildDetailRow("Teléfono:", "${widget.usuario['Telefono']}"),
                      if (widget.usuario['Rol'] != null)
                        _buildDetailRow("Rol:", "${widget.usuario['Rol']['NombreRol']}"),
                    ],
                  ),
                ),
              ],
            ),
          ),

          // --- FOOTER (Botones) ---
          Padding(
            padding: const EdgeInsets.fromLTRB(20, 0, 20, 20),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.end,
              children: [
                // Botón Cancelar
                OutlinedButton.icon(
                  onPressed: _loading ? null : () => Navigator.of(context).pop(),
                  icon: const Icon(Icons.cancel_outlined, size: 18),
                  label: const Text("Cancelar"),
                  style: OutlinedButton.styleFrom(
                    foregroundColor: Colors.grey[700],
                    side: BorderSide(color: Colors.grey.shade400),
                  ),
                ),
                const SizedBox(width: 10),
                
                // Botón Eliminar
                ElevatedButton(
                  onPressed: _loading ? null : _handleEliminar,
                  style: ElevatedButton.styleFrom(
                    backgroundColor: const Color(0xFFDC3545), // Bootstrap danger
                    foregroundColor: Colors.white,
                  ),
                  child: _loading
                      ? const SizedBox(
                          width: 20,
                          height: 20,
                          child: CircularProgressIndicator(
                            color: Colors.white,
                            strokeWidth: 2,
                          ),
                        )
                      : const Row(
                          children: [
                            Icon(Icons.delete, size: 18),
                            SizedBox(width: 5),
                            Text("Eliminar"),
                          ],
                        ),
                ),
              ],
            ),
          )
        ],
      ),
    );
  }

  // Helper para las filas de detalles
  Widget _buildDetailRow(String label, String value) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 4.0),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            "$label ",
            style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 13),
          ),
          Expanded(
            child: Text(
              value,
              style: const TextStyle(fontSize: 13),
              overflow: TextOverflow.ellipsis,
            ),
          ),
        ],
      ),
    );
  }
}