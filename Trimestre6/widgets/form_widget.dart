import 'package:flutter/material.dart';
import '../services/tareas_service.dart';
import '../models/tarea_model.dart'; // Importamos la clase Tarea

class FormWidget extends StatefulWidget {
  const FormWidget({super.key});

  @override
  State<FormWidget> createState() => _FormWidgetState();
}

class _FormWidgetState extends State<FormWidget> {
  // Inicializamos el servicio de tareas
  final TareaService _tareaService = TareaService();
  bool _isLoading = false; // Estado para controlar el botón de carga

  // ----- CONTROLADORES -----
  final descripcionCtrl = TextEditingController();
  final fechaAsignacionCtrl = TextEditingController();
  final fechaLimiteCtrl = TextEditingController();
  final documentoCtrl = TextEditingController(); // Usado para Persona_FK

  // ----- DROPDOWNS -----
  String? estadoTarea;
  String? prioridad;

  final formKey = GlobalKey<FormState>();

  @override
  void dispose() {
    descripcionCtrl.dispose();
    fechaAsignacionCtrl.dispose();
    fechaLimiteCtrl.dispose();
    documentoCtrl.dispose();
    super.dispose();
  }

  // Helper para mostrar el DatePicker y TimePicker
  Future<void> _selectDateTime(TextEditingController controller) async {
    final date = await showDatePicker(
      context: context,
      firstDate: DateTime(2020),
      lastDate: DateTime(2100),
      initialDate: DateTime.now(),
    );

    if (date != null) {
      final time = await showTimePicker(
        context: context,
        initialTime: TimeOfDay.now(),
      );

      if (time != null) {
        final fecha = DateTime(
          date.year,
          date.month,
          date.day,
          time.hour,
          time.minute,
        );
        // Formato que la API debería entender (ISO 8601 sin la 'T' para ser más limpio)
        controller.text =
            fecha.toIso8601String().substring(0, 16).replaceAll('T', ' ');
      }
    }
  }

  // --- NUEVA LÓGICA DE ENVÍO DE FORMULARIO ---
  void _onSubmit() async {
    if (!formKey.currentState!.validate()) return;

    // Aseguramos que los valores no nulos sean manejados
    if (estadoTarea == null || prioridad == null) {
      _mostrarMensaje(
        "Faltan Datos",
        "Por favor, selecciona un estado y una prioridad.",
        Colors.orange,
      );
      return;
    }

    setState(() => _isLoading = true);

    // 1. Crear el objeto Tarea con los datos del formulario
    final nuevaTarea = Tarea(
      descripcion: descripcionCtrl.text,
      // Usamos el texto como viene (Ej: 2025-11-23 10:30)
      fechaAsignacion: fechaAsignacionCtrl.text,
      fechaLimite: fechaLimiteCtrl.text,
      estadoTarea: estadoTarea!, // Los marcamos como no nulos
      prioridad: prioridad!,
      // Intentamos convertir el número de documento a int para Persona_FK
      personaFk: int.tryParse(documentoCtrl.text) ?? 0,
    );

    // 2. Llamar al servicio
    final resultado = await _tareaService.crearTarea(nuevaTarea);

    setState(() => _isLoading = false);

    if (resultado != null) {
      // Éxito
      _limpiarFormulario();
      _mostrarMensaje(
        "¡Tarea Creada!",
        "ID: ${resultado['id']} - ${resultado['Message']}",
        Colors.green,
      );
    } else {
      // Fracaso
      _mostrarMensaje(
        "Error al Guardar",
        "No se pudo completar la solicitud. Revisa tu consola.",
        Colors.red,
      );
    }
  }

  void _limpiarFormulario() {
    formKey.currentState!.reset();
    descripcionCtrl.clear();
    fechaAsignacionCtrl.clear();
    fechaLimiteCtrl.clear();
    documentoCtrl.clear();
    setState(() {
      estadoTarea = null;
      prioridad = null;
    });
  }

  void _mostrarMensaje(String title, String content, Color color) {
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text('$title\n$content'),
        backgroundColor: color,
        duration: const Duration(seconds: 4),
      ),
    );
  }
  // --- FIN DE LA NUEVA LÓGICA ---

  @override
  Widget build(BuildContext context) {
    // Definir el color rosado claro solicitado: #E6C7F6
    const Color rosaBoton = Color(0xFFE6C7F6);
    // El foreground es oscuro ya que el fondo del botón es muy claro
    const Color colorTextoBoton = Color(0xFF4A4A4A);

    // Estilos generales para los campos de texto
    const InputDecoration fieldDecoration = InputDecoration(
      hintStyle: TextStyle(fontSize: 14),
      border: OutlineInputBorder(
        borderRadius:
            BorderRadius.all(Radius.circular(10)), // Bordes redondeados
        borderSide: BorderSide(color: Colors.grey, width: 0.5),
      ),
      enabledBorder: OutlineInputBorder(
        borderRadius: BorderRadius.all(Radius.circular(10)),
        borderSide: BorderSide(color: Colors.grey, width: 0.5),
      ),
      focusedBorder: OutlineInputBorder(
        borderRadius: BorderRadius.all(Radius.circular(10)),
        borderSide: BorderSide(
            color: Color(0xFFE91E63),
            width: 1.5), // Un color más vibrante al enfocar
      ),
      filled: true,
      fillColor: Colors.white, // Asegurar que los campos de texto sean blancos
      contentPadding: EdgeInsets.all(16),
      suffixIconColor:
          Colors.grey, // Añadido aquí para que aplique a todos los campos
    );

    return SingleChildScrollView(
      child: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 20.0, vertical: 30.0),
        child: Container(
          // Contenedor para dar el efecto de tarjeta blanca al formulario (más agradable para móvil)
          padding: const EdgeInsets.all(24),
          decoration: BoxDecoration(
            color: Colors.white, // Fondo blanco para el formulario
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
          child: Theme(
            // Aplicar tema para que el botón de guardar tenga el color solicitado
            data: Theme.of(context).copyWith(
              elevatedButtonTheme: ElevatedButtonThemeData(
                style: ElevatedButton.styleFrom(
                  backgroundColor: rosaBoton, // Color de fondo del botón
                  foregroundColor: colorTextoBoton, // Color del texto oscuro
                  padding: const EdgeInsets.symmetric(
                      vertical: 18), // Mayor padding para mejor tacto móvil
                  shape: RoundedRectangleBorder(
                    borderRadius:
                        BorderRadius.circular(12), // Bordes más redondeados
                  ),
                  textStyle: const TextStyle(
                    fontSize: 18,
                    fontWeight: FontWeight.bold,
                  ),
                ),
              ),
            ),
            child: Form(
              key: formKey,
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.stretch,
                children: [
                  // ----- TÍTULO -----
                  const Text(
                    "Registro de Tareas",
                    textAlign: TextAlign.center,
                    style: TextStyle(
                      fontSize: 28, // Título más grande y claro para móvil
                      fontWeight: FontWeight.w800,
                      color: Color(0xFF4A4A4A),
                    ),
                  ),
                  const SizedBox(height: 8),
                  const Text(
                    "Ingresa la información de la tarea.",
                    textAlign: TextAlign.center,
                    style: TextStyle(
                      fontSize: 15,
                      color: Colors.grey,
                    ),
                  ),
                  const SizedBox(height: 35),

                  // ----- DESCRIPCIÓN -----
                  const Text("Descripción",
                      style:
                          TextStyle(fontWeight: FontWeight.w700, fontSize: 15)),
                  const SizedBox(height: 10),
                  TextFormField(
                    controller: descripcionCtrl,
                    maxLines: 4,
                    decoration: fieldDecoration.copyWith(
                      hintText: "Ej: Revisar inventario de pijamas...",
                      contentPadding: const EdgeInsets.all(16),
                    ),
                    validator: (value) =>
                        value!.isEmpty ? "La descripción es obligatoria" : null,
                  ),
                  const SizedBox(height: 30),

                  // ----- FECHA ASIGNACIÓN -----
                  const Text("Fecha de Asignación",
                      style:
                          TextStyle(fontWeight: FontWeight.w700, fontSize: 15)),
                  const SizedBox(height: 10),
                  TextFormField(
                    controller: fechaAsignacionCtrl,
                    decoration: fieldDecoration.copyWith(
                      suffixIcon: const Icon(Icons.calendar_today_outlined),
                    ),
                    readOnly: true,
                    validator: (value) =>
                        value!.isEmpty ? "Selecciona una fecha" : null,
                    onTap: () => _selectDateTime(fechaAsignacionCtrl),
                  ),
                  const SizedBox(height: 30),

                  // ----- FECHA LÍMITE -----
                  const Text("Fecha Límite",
                      style:
                          TextStyle(fontWeight: FontWeight.w700, fontSize: 15)),
                  const SizedBox(height: 10),
                  TextFormField(
                    controller: fechaLimiteCtrl,
                    decoration: fieldDecoration.copyWith(
                      suffixIcon: const Icon(Icons.calendar_today_outlined),
                    ),
                    readOnly: true,
                    validator: (value) =>
                        value!.isEmpty ? "Selecciona una fecha límite" : null,
                    onTap: () => _selectDateTime(fechaLimiteCtrl),
                  ),
                  const SizedBox(height: 30),

                  // ----- ESTADO -----
                  const Text("Estado de la Tarea",
                      style:
                          TextStyle(fontWeight: FontWeight.w700, fontSize: 15)),
                  const SizedBox(height: 10),
                  DropdownButtonFormField<String>(
                    decoration: fieldDecoration,
                    value: estadoTarea,
                    items: const [
                      DropdownMenuItem(
                          value: "Pendiente", child: Text("Pendiente")),
                      DropdownMenuItem(
                          value: "En Proceso", child: Text("En Proceso")),
                      DropdownMenuItem(
                          value: "Finalizada", child: Text("Finalizada")),
                    ],
                    onChanged: (value) => setState(() => estadoTarea = value),
                    validator: (value) =>
                        value == null ? "Selecciona un estado" : null,
                  ),
                  const SizedBox(height: 30),

                  // ----- PRIORIDAD -----
                  const Text("Prioridad",
                      style:
                          TextStyle(fontWeight: FontWeight.w700, fontSize: 15)),
                  const SizedBox(height: 10),
                  DropdownButtonFormField<String>(
                    decoration: fieldDecoration,
                    value: prioridad,
                    items: const [
                      DropdownMenuItem(value: "Alta", child: Text("Alta")),
                      DropdownMenuItem(value: "Media", child: Text("Media")),
                      DropdownMenuItem(value: "Baja", child: Text("Baja")),
                    ],
                    onChanged: (value) => setState(() => prioridad = value),
                    validator: (value) =>
                        value == null ? "Selecciona una prioridad" : null,
                  ),
                  const SizedBox(height: 30),

                  // ----- DOCUMENTO (Persona_FK) -----
                  const Text("ID o Documento (Responsable)",
                      style:
                          TextStyle(fontWeight: FontWeight.w700, fontSize: 15)),
                  const SizedBox(height: 10),
                  TextFormField(
                    controller: documentoCtrl,
                    decoration: fieldDecoration.copyWith(
                      hintText: "Ej: 45 (ID de la persona asignada)",
                    ),
                    keyboardType: TextInputType.number,
                    validator: (value) {
                      if (value!.isEmpty) {
                        return "Este campo es obligatorio";
                      }
                      if (int.tryParse(value) == null) {
                        return "Debe ser un número válido (ID)";
                      }
                      return null;
                    },
                  ),
                  const SizedBox(height: 45),

                  // ----- BOTÓN -----
                  ElevatedButton(
                    onPressed: _isLoading
                        ? null
                        : _onSubmit, // Usa la función de envío
                    child: _isLoading
                        ? const SizedBox(
                            width: 24,
                            height: 24,
                            child: CircularProgressIndicator(
                              color: colorTextoBoton,
                              strokeWidth: 3,
                            ),
                          )
                        : const Text("GUARDAR TAREA"),
                  ),
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }
}
