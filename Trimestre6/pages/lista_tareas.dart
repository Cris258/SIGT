import 'package:flutter/material.dart';
import '../widgets/header_widget.dart';
import '../widgets/footer_line.dart';
import '../widgets/widgetsAdmin/modal_editar_tarea.dart';
import '../widgets/widgetsAdmin/modal_eliminar_tarea.dart';

class ListaTareas extends StatefulWidget {
  const ListaTareas({Key? key}) : super(key: key);

  @override
  State<ListaTareas> createState() => _ListaTareasState();
}

class _ListaTareasState extends State<ListaTareas> {
  bool isLoading = false;
  String search = "";
  final TextEditingController searchController = TextEditingController();

  // Datos simulados de tareas
  List<Map<String, dynamic>> tareas = [
    {
      'idTarea': 1,
      'Descripcion': 'Revisar inventario de pijamas para niños',
      'FechaAsignacion': DateTime(2025, 1, 15),
      'FechaLimite': DateTime(2025, 1, 20),
      'Prioridad': 'Alta',
      'EstadoTarea': 'En Progreso',
      'Persona_FK': 'Juan Pérez',
    },
    {
      'idTarea': 2,
      'Descripcion': 'Actualizar catálogo de productos en línea',
      'FechaAsignacion': DateTime(2025, 1, 10),
      'FechaLimite': DateTime(2025, 1, 25),
      'Prioridad': 'Media',
      'EstadoTarea': 'Pendiente',
      'Persona_FK': 'Ana Gómez',
    },
    {
      'idTarea': 3,
      'Descripcion': 'Preparar pedido para cliente mayorista',
      'FechaAsignacion': DateTime(2025, 1, 5),
      'FechaLimite': DateTime(2025, 1, 15),
      'Prioridad': 'Alta',
      'EstadoTarea': 'Completada',
      'Persona_FK': 'Carlos Ruiz',
    },
    {
      'idTarea': 4,
      'Descripcion': 'Organizar bodega de almacenamiento',
      'FechaAsignacion': DateTime(2025, 1, 12),
      'FechaLimite': DateTime(2025, 1, 30),
      'Prioridad': 'Baja',
      'EstadoTarea': 'Pendiente',
      'Persona_FK': 'María López',
    },
    {
      'idTarea': 5,
      'Descripcion': 'Realizar mantenimiento de equipos de costura',
      'FechaAsignacion': DateTime(2025, 1, 8),
      'FechaLimite': DateTime(2025, 1, 22),
      'Prioridad': 'Media',
      'EstadoTarea': 'En Progreso',
      'Persona_FK': 'Pedro Ramírez',
    },
  ];

  @override
  void dispose() {
    searchController.dispose();
    super.dispose();
  }

  List<Map<String, dynamic>> get tareasFiltradas {
    if (search.isEmpty) return tareas;

    return tareas.where((tarea) {
      final descripcion = (tarea['Descripcion'] ?? '').toString().toLowerCase();
      final prioridad = (tarea['Prioridad'] ?? '').toString().toLowerCase();
      final estado = (tarea['EstadoTarea'] ?? '').toString().toLowerCase();
      final empleado = (tarea['Persona_FK'] ?? '').toString().toLowerCase();
      final searchLower = search.toLowerCase();

      return descripcion.contains(searchLower) ||
          prioridad.contains(searchLower) ||
          estado.contains(searchLower) ||
          empleado.contains(searchLower);
    }).toList();
  }

  Color getPrioridadColor(String prioridad) {
    switch (prioridad) {
      case 'Alta':
        return Colors.red;
      case 'Media':
        return Colors.orange;
      case 'Baja':
        return Colors.green;
      default:
        return Colors.grey;
    }
  }

  Color getEstadoColor(String estado) {
    switch (estado) {
      case 'Completada':
        return Colors.green;
      case 'En Progreso':
        return Colors.orange;
      case 'Pendiente':
        return Colors.red;
      default:
        return Colors.grey;
    }
  }

  void abrirModalEditar(Map<String, dynamic> tarea) {
    showDialog(
      context: context,
      builder: (context) => ModalEditarTarea(
        tarea: tarea,
        onGuardar: (tareaActualizada) {
          setState(() {
            final index = tareas.indexWhere(
              (t) => t['idTarea'] == tareaActualizada['idTarea'],
            );
            if (index != -1) {
              tareas[index] = tareaActualizada;
            }
          });
        },
      ),
    );
  }

  void abrirModalEliminar(Map<String, dynamic> tarea) {
    showDialog(
      context: context,
      builder: (context) => ModalEliminarTarea(
        tarea: tarea,
        onConfirmar: (tareaEliminada) {
          setState(() {
            tareas.removeWhere(
              (t) => t['idTarea'] == tareaEliminada['idTarea'],
            );
          });
        },
      ),
    );
  }

  void handleLogout() {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('Cerrar Sesión'),
        content: const Text('¿Estás seguro que deseas cerrar sesión?'),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: const Text('Cancelar'),
          ),
          TextButton(
            onPressed: () {
              Navigator.pop(context);
              Navigator.pushReplacementNamed(context, '/login');
            },
            child: const Text('Cerrar Sesión'),
          ),
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.grey[100],
      body: Column(
        children: [
          // Header
          HeaderWidget(),

          // Contenido principal
          Expanded(
            child: isLoading
                ? const Center(child: CircularProgressIndicator())
                : SingleChildScrollView(
                    padding: const EdgeInsets.all(16.0),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.center,
                      children: [
                        const Text(
                          'Lista de Tareas Asignadas',
                          style: TextStyle(
                            fontSize: 24,
                            fontWeight: FontWeight.bold,
                          ),
                          textAlign: TextAlign.center,
                        ),
                        const SizedBox(height: 24),

                        // Buscador
                        Container(
                          constraints: const BoxConstraints(maxWidth: 600),
                          child: TextField(
                            controller: searchController,
                            decoration: InputDecoration(
                              hintText:
                                  'Buscar por descripción, prioridad, estado...',
                              prefixIcon: const Icon(Icons.search),
                              filled: true,
                              fillColor: Colors.white,
                              border: OutlineInputBorder(
                                borderRadius: BorderRadius.circular(10),
                                borderSide: BorderSide(color: Colors.grey.shade300),
                              ),
                              enabledBorder: OutlineInputBorder(
                                borderRadius: BorderRadius.circular(10),
                                borderSide: BorderSide(color: Colors.grey.shade300),
                              ),
                            ),
                            onChanged: (value) {
                              setState(() {
                                search = value;
                              });
                            },
                          ),
                        ),
                        const SizedBox(height: 24),

                        // Tabla de tareas
                        _buildTareasTable(),
                      ],
                    ),
                  ),
          ),

          // Footer
          const FooterLine(),
        ],
      ),
    );
  }

  Widget _buildTareasTable() {
    final tareasMostradas = tareasFiltradas;

    if (tareasMostradas.isEmpty) {
      return Center(
        child: Padding(
          padding: const EdgeInsets.all(32.0),
          child: Text(
            search.isNotEmpty
                ? 'No se encontraron resultados'
                : 'No hay tareas registradas',
            style: const TextStyle(fontSize: 16, color: Colors.grey),
          ),
        ),
      );
    }

    return Card(
      elevation: 2,
      child: SingleChildScrollView(
        scrollDirection: Axis.horizontal,
        child: DataTable(
          headingRowColor: MaterialStateProperty.all(Colors.grey[800]),
          columns: const [
            DataColumn(
              label: Text(
                'ID',
                style: TextStyle(
                  fontWeight: FontWeight.bold,
                  color: Colors.white,
                ),
              ),
            ),
            DataColumn(
              label: Text(
                'Descripción',
                style: TextStyle(
                  fontWeight: FontWeight.bold,
                  color: Colors.white,
                ),
              ),
            ),
            DataColumn(
              label: Text(
                'Fecha Asignación',
                style: TextStyle(
                  fontWeight: FontWeight.bold,
                  color: Colors.white,
                ),
              ),
            ),
            DataColumn(
              label: Text(
                'Fecha Límite',
                style: TextStyle(
                  fontWeight: FontWeight.bold,
                  color: Colors.white,
                ),
              ),
            ),
            DataColumn(
              label: Text(
                'Prioridad',
                style: TextStyle(
                  fontWeight: FontWeight.bold,
                  color: Colors.white,
                ),
              ),
            ),
            DataColumn(
              label: Text(
                'Estado',
                style: TextStyle(
                  fontWeight: FontWeight.bold,
                  color: Colors.white,
                ),
              ),
            ),
            DataColumn(
              label: Text(
                'Empleado',
                style: TextStyle(
                  fontWeight: FontWeight.bold,
                  color: Colors.white,
                ),
              ),
            ),
            DataColumn(
              label: Text(
                'Modificar',
                style: TextStyle(
                  fontWeight: FontWeight.bold,
                  color: Colors.white,
                ),
              ),
            ),
            DataColumn(
              label: Text(
                'Eliminar',
                style: TextStyle(
                  fontWeight: FontWeight.bold,
                  color: Colors.white,
                ),
              ),
            ),
          ],
          rows: tareasMostradas.asMap().entries.map((entry) {
            final index = entry.key;
            final tarea = entry.value;

            return DataRow(
              color: MaterialStateProperty.all(
                index % 2 == 0 ? Colors.grey[50] : Colors.white,
              ),
              cells: [
                DataCell(
                  Text((index + 1).toString().padLeft(3, '0')),
                ),
                DataCell(
                  SizedBox(
                    width: 250,
                    child: Text(
                      tarea['Descripcion'] ?? 'N/A',
                      maxLines: 2,
                      overflow: TextOverflow.ellipsis,
                    ),
                  ),
                ),
                DataCell(
                  Text(
                    tarea['FechaAsignacion'] != null
                        ? '${tarea['FechaAsignacion'].day}/${tarea['FechaAsignacion'].month}/${tarea['FechaAsignacion'].year}'
                        : 'N/A',
                  ),
                ),
                DataCell(
                  Text(
                    tarea['FechaLimite'] != null
                        ? '${tarea['FechaLimite'].day}/${tarea['FechaLimite'].month}/${tarea['FechaLimite'].year}'
                        : 'N/A',
                  ),
                ),
                DataCell(
                  Container(
                    padding: const EdgeInsets.symmetric(
                      horizontal: 12,
                      vertical: 6,
                    ),
                    decoration: BoxDecoration(
                      color: getPrioridadColor(tarea['Prioridad'] ?? ''),
                      borderRadius: BorderRadius.circular(12),
                    ),
                    child: Text(
                      tarea['Prioridad'] ?? 'N/A',
                      style: const TextStyle(
                        color: Colors.white,
                        fontWeight: FontWeight.bold,
                        fontSize: 12,
                      ),
                    ),
                  ),
                ),
                DataCell(
                  Container(
                    padding: const EdgeInsets.symmetric(
                      horizontal: 12,
                      vertical: 6,
                    ),
                    decoration: BoxDecoration(
                      color: getEstadoColor(tarea['EstadoTarea'] ?? ''),
                      borderRadius: BorderRadius.circular(12),
                    ),
                    child: Text(
                      tarea['EstadoTarea'] ?? 'N/A',
                      style: const TextStyle(
                        color: Colors.white,
                        fontWeight: FontWeight.bold,
                        fontSize: 12,
                      ),
                    ),
                  ),
                ),
                DataCell(
                  Text(tarea['Persona_FK'] ?? 'N/A'),
                ),
                DataCell(
                  IconButton(
                    icon: const Icon(Icons.edit, color: Colors.blue),
                    onPressed: () => abrirModalEditar(tarea),
                    tooltip: 'Editar',
                  ),
                ),
                DataCell(
                  IconButton(
                    icon: const Icon(Icons.delete, color: Colors.red),
                    onPressed: () => abrirModalEliminar(tarea),
                    tooltip: 'Eliminar',
                  ),
                ),
              ],
            );
          }).toList(),
        ),
      ),
    );
  }
}