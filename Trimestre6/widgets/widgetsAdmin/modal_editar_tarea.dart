import 'package:flutter/material.dart';

class ModalEditarTarea extends StatefulWidget {
  final Map<String, dynamic> tarea;
  final Function(Map<String, dynamic>) onGuardar;

  const ModalEditarTarea({
    Key? key,
    required this.tarea,
    required this.onGuardar,
  }) : super(key: key);

  @override
  State<ModalEditarTarea> createState() => _ModalEditarTareaState();
}

class _ModalEditarTareaState extends State<ModalEditarTarea> {
  final _formKey = GlobalKey<FormState>();
  
  late TextEditingController descripcionCtrl;
  late DateTime fechaAsignacion;
  late DateTime fechaLimite;
  late String estadoTarea;
  late String prioridad;
  late String empleadoSeleccionado;

  // Datos simulados de empleados
  final List<Map<String, String>> empleados = [
    {'id': '1', 'nombre': 'Juan Pérez García'},
    {'id': '2', 'nombre': 'Ana María Gómez López'},
    {'id': '3', 'nombre': 'Carlos Alberto Ruiz Martínez'},
    {'id': '4', 'nombre': 'María José López Hernández'},
    {'id': '5', 'nombre': 'Pedro Antonio Ramírez Silva'},
  ];

  @override
  void initState() {
    super.initState();
    
    // Inicializar valores del formulario con los datos de la tarea
    descripcionCtrl = TextEditingController(
      text: widget.tarea['Descripcion'] ?? '',
    );
    
    fechaAsignacion = widget.tarea['FechaAsignacion'] ?? DateTime.now();
    fechaLimite = widget.tarea['FechaLimite'] ?? DateTime.now();
    estadoTarea = widget.tarea['EstadoTarea'] ?? 'Pendiente';
    prioridad = widget.tarea['Prioridad'] ?? '';
    empleadoSeleccionado = widget.tarea['Persona_FK'] ?? '';
  }

  @override
  void dispose() {
    descripcionCtrl.dispose();
    super.dispose();
  }

  Future<void> _selectDate(BuildContext context, bool isAsignacion) async {
    final DateTime? picked = await showDatePicker(
      context: context,
      initialDate: isAsignacion ? fechaAsignacion : fechaLimite,
      firstDate: DateTime(2020),
      lastDate: DateTime(2030),
      locale: const Locale('es', 'CO'),
    );

    if (picked != null) {
      setState(() {
        if (isAsignacion) {
          fechaAsignacion = picked;
          // Si la fecha límite es anterior, ajustarla
          if (fechaLimite.isBefore(fechaAsignacion)) {
            fechaLimite = fechaAsignacion;
          }
        } else {
          fechaLimite = picked;
        }
      });
    }
  }

  void _handleSubmit() {
    if (!_formKey.currentState!.validate()) return;

    // Validar que la fecha límite no sea anterior a la asignación
    if (fechaLimite.isBefore(fechaAsignacion)) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content: Text('La fecha límite no puede ser anterior a la fecha de asignación'),
          backgroundColor: Colors.orange,
        ),
      );
      return;
    }

    // Crear la tarea actualizada
    final tareaActualizada = {
      ...widget.tarea,
      'Descripcion': descripcionCtrl.text,
      'FechaAsignacion': fechaAsignacion,
      'FechaLimite': fechaLimite,
      'EstadoTarea': estadoTarea,
      'Prioridad': prioridad,
      'Persona_FK': empleadoSeleccionado,
    };

    // Llamar al callback
    widget.onGuardar(tareaActualizada);

    // Mostrar mensaje de éxito
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(
        content: Text('✅ Tarea actualizada exitosamente'),
        backgroundColor: Colors.green,
      ),
    );

    // Cerrar el modal
    Navigator.pop(context);
  }

  @override
  Widget build(BuildContext context) {
    return Dialog(
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(16),
      ),
      child: Container(
        constraints: const BoxConstraints(maxWidth: 600, maxHeight: 700),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            // Header del modal
            Container(
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(
                color: Colors.blue.shade700,
                borderRadius: const BorderRadius.only(
                  topLeft: Radius.circular(16),
                  topRight: Radius.circular(16),
                ),
              ),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  const Text(
                    'Editar Tarea',
                    style: TextStyle(
                      fontSize: 20,
                      fontWeight: FontWeight.bold,
                      color: Colors.white,
                    ),
                  ),
                  IconButton(
                    icon: const Icon(Icons.close, color: Colors.white),
                    onPressed: () => Navigator.pop(context),
                  ),
                ],
              ),
            ),

            // Contenido del formulario
            Expanded(
              child: SingleChildScrollView(
                padding: const EdgeInsets.all(20),
                child: Form(
                  key: _formKey,
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      // Descripción
                      const Text(
                        'Descripción de la Tarea',
                        style: TextStyle(
                          fontWeight: FontWeight.bold,
                          fontSize: 14,
                        ),
                      ),
                      const SizedBox(height: 8),
                      TextFormField(
                        controller: descripcionCtrl,
                        maxLines: 4,
                        decoration: InputDecoration(
                          hintText: 'Ingrese la descripción de la tarea',
                          border: OutlineInputBorder(
                            borderRadius: BorderRadius.circular(8),
                          ),
                          filled: true,
                          fillColor: Colors.grey.shade50,
                        ),
                        validator: (value) {
                          if (value == null || value.isEmpty) {
                            return 'La descripción es obligatoria';
                          }
                          return null;
                        },
                      ),
                      const SizedBox(height: 20),

                      // Fechas
                      Row(
                        children: [
                          // Fecha Asignación
                          Expanded(
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                const Text(
                                  'Fecha de Asignación',
                                  style: TextStyle(
                                    fontWeight: FontWeight.bold,
                                    fontSize: 14,
                                  ),
                                ),
                                const SizedBox(height: 8),
                                InkWell(
                                  onTap: () => _selectDate(context, true),
                                  child: Container(
                                    padding: const EdgeInsets.all(12),
                                    decoration: BoxDecoration(
                                      border: Border.all(color: Colors.grey.shade400),
                                      borderRadius: BorderRadius.circular(8),
                                      color: Colors.grey.shade50,
                                    ),
                                    child: Row(
                                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                      children: [
                                        Text(
                                          '${fechaAsignacion.day}/${fechaAsignacion.month}/${fechaAsignacion.year}',
                                        ),
                                        const Icon(Icons.calendar_today, size: 20),
                                      ],
                                    ),
                                  ),
                                ),
                              ],
                            ),
                          ),
                          const SizedBox(width: 16),

                          // Fecha Límite
                          Expanded(
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                const Text(
                                  'Fecha Límite',
                                  style: TextStyle(
                                    fontWeight: FontWeight.bold,
                                    fontSize: 14,
                                  ),
                                ),
                                const SizedBox(height: 8),
                                InkWell(
                                  onTap: () => _selectDate(context, false),
                                  child: Container(
                                    padding: const EdgeInsets.all(12),
                                    decoration: BoxDecoration(
                                      border: Border.all(color: Colors.grey.shade400),
                                      borderRadius: BorderRadius.circular(8),
                                      color: Colors.grey.shade50,
                                    ),
                                    child: Row(
                                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                      children: [
                                        Text(
                                          '${fechaLimite.day}/${fechaLimite.month}/${fechaLimite.year}',
                                        ),
                                        const Icon(Icons.calendar_today, size: 20),
                                      ],
                                    ),
                                  ),
                                ),
                              ],
                            ),
                          ),
                        ],
                      ),
                      const SizedBox(height: 20),

                      // Prioridad y Estado
                      Row(
                        children: [
                          // Prioridad
                          Expanded(
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                const Text(
                                  'Prioridad',
                                  style: TextStyle(
                                    fontWeight: FontWeight.bold,
                                    fontSize: 14,
                                  ),
                                ),
                                const SizedBox(height: 8),
                                DropdownButtonFormField<String>(
                                  value: prioridad.isEmpty ? null : prioridad,
                                  decoration: InputDecoration(
                                    border: OutlineInputBorder(
                                      borderRadius: BorderRadius.circular(8),
                                    ),
                                    filled: true,
                                    fillColor: Colors.grey.shade50,
                                  ),
                                  items: const [
                                    DropdownMenuItem(
                                      value: 'Alta',
                                      child: Text('🔴 Alta'),
                                    ),
                                    DropdownMenuItem(
                                      value: 'Media',
                                      child: Text('🟡 Media'),
                                    ),
                                    DropdownMenuItem(
                                      value: 'Baja',
                                      child: Text('🟢 Baja'),
                                    ),
                                  ],
                                  onChanged: (value) {
                                    setState(() {
                                      prioridad = value ?? '';
                                    });
                                  },
                                  validator: (value) {
                                    if (value == null || value.isEmpty) {
                                      return 'Seleccione una prioridad';
                                    }
                                    return null;
                                  },
                                ),
                              ],
                            ),
                          ),
                          const SizedBox(width: 16),

                          // Estado
                          Expanded(
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                const Text(
                                  'Estado',
                                  style: TextStyle(
                                    fontWeight: FontWeight.bold,
                                    fontSize: 14,
                                  ),
                                ),
                                const SizedBox(height: 8),
                                DropdownButtonFormField<String>(
                                  value: estadoTarea,
                                  decoration: InputDecoration(
                                    border: OutlineInputBorder(
                                      borderRadius: BorderRadius.circular(8),
                                    ),
                                    filled: true,
                                    fillColor: Colors.grey.shade50,
                                  ),
                                  items: const [
                                    DropdownMenuItem(
                                      value: 'Pendiente',
                                      child: Text('Pendiente'),
                                    ),
                                    DropdownMenuItem(
                                      value: 'En Progreso',
                                      child: Text('En Progreso'),
                                    ),
                                    DropdownMenuItem(
                                      value: 'Completada',
                                      child: Text('Completada'),
                                    ),
                                  ],
                                  onChanged: (value) {
                                    setState(() {
                                      estadoTarea = value ?? 'Pendiente';
                                    });
                                  },
                                ),
                              ],
                            ),
                          ),
                        ],
                      ),
                      const SizedBox(height: 20),

                      // Empleado
                      const Text(
                        'Asignar a Empleado',
                        style: TextStyle(
                          fontWeight: FontWeight.bold,
                          fontSize: 14,
                        ),
                      ),
                      const SizedBox(height: 8),
                      DropdownButtonFormField<String>(
                        value: empleadoSeleccionado.isEmpty ? null : empleadoSeleccionado,
                        decoration: InputDecoration(
                          border: OutlineInputBorder(
                            borderRadius: BorderRadius.circular(8),
                          ),
                          filled: true,
                          fillColor: Colors.grey.shade50,
                        ),
                        items: empleados.map((empleado) {
                          return DropdownMenuItem<String>(
                            value: empleado['nombre'],
                            child: Text(empleado['nombre']!),
                          );
                        }).toList(),
                        onChanged: (value) {
                          setState(() {
                            empleadoSeleccionado = value ?? '';
                          });
                        },
                        validator: (value) {
                          if (value == null || value.isEmpty) {
                            return 'Seleccione un empleado';
                          }
                          return null;
                        },
                      ),
                    ],
                  ),
                ),
              ),
            ),

            // Footer con botones
            Container(
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(
                color: Colors.grey.shade100,
                borderRadius: const BorderRadius.only(
                  bottomLeft: Radius.circular(16),
                  bottomRight: Radius.circular(16),
                ),
              ),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.end,
                children: [
                  TextButton(
                    onPressed: () => Navigator.pop(context),
                    style: TextButton.styleFrom(
                      padding: const EdgeInsets.symmetric(
                        horizontal: 24,
                        vertical: 12,
                      ),
                    ),
                    child: const Text(
                      'Cancelar',
                      style: TextStyle(fontSize: 16),
                    ),
                  ),
                  const SizedBox(width: 12),
                  ElevatedButton(
                    onPressed: _handleSubmit,
                    style: ElevatedButton.styleFrom(
                      backgroundColor: Colors.blue.shade700,
                      foregroundColor: Colors.white,
                      padding: const EdgeInsets.symmetric(
                        horizontal: 24,
                        vertical: 12,
                      ),
                    ),
                    child: const Text(
                      'Guardar Cambios',
                      style: TextStyle(fontSize: 16),
                    ),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}