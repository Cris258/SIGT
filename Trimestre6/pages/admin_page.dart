import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:fl_chart/fl_chart.dart';
import 'package:table_calendar/table_calendar.dart';
// Importar tus modales
import '../widgets/actualizar_datos_modal.dart';
import '../widgets/cambiar_contraseña_modal.dart';


class AdminPage extends StatefulWidget {
  const AdminPage({Key? key}) : super(key: key);

  @override
  State<AdminPage> createState() => _AdminPageState();
}

class _AdminPageState extends State<AdminPage> {
  final GlobalKey<ScaffoldState> _scaffoldKey = GlobalKey<ScaffoldState>();
  
  String? nombreUsuario;
  String? apellidoUsuario;
  List<dynamic> empleados = [];
  List<dynamic> topEmpleados = [];
  Map<String, dynamic>? estadisticas;
  bool isLoading = true;
  
  // Variables para el calendario
  DateTime _focusedDay = DateTime.now();
  DateTime? _selectedDay;

  @override
  void initState() {
    super.initState();
    _cargarDatosUsuario();
    _cargarDatos();
  }

  Future<void> _cargarDatosUsuario() async {
    final prefs = await SharedPreferences.getInstance();
    setState(() {
      nombreUsuario = prefs.getString('Primer_Nombre');
      apellidoUsuario = prefs.getString('Primer_Apellido');
    });
  }

  Future<void> _cargarDatos() async {
    setState(() => isLoading = true);
    
    try {
      final prefs = await SharedPreferences.getInstance();
      final token = prefs.getString('token');

      if (token == null) {
        _mostrarError('Token no encontrado');
        return;
      }

      const String apiUrl = 'http://localhost:3001/api';
      final headers = {
        'Authorization': 'Bearer $token',
        'Content-Type': 'application/json',
      };

      // Cargar empleados
      final resEmpleados = await http.get(
        Uri.parse('$apiUrl/empleados-tareas'),
        headers: headers,
      );

      // Cargar top empleados
      final resTop = await http.get(
        Uri.parse('$apiUrl/top-empleados'),
        headers: headers,
      );

      // Cargar estadísticas
      final resStats = await http.get(
        Uri.parse('$apiUrl/estadisticas'),
        headers: headers,
      );

      if (resEmpleados.statusCode == 200) {
        final dataEmpleados = json.decode(resEmpleados.body);
        setState(() {
          empleados = dataEmpleados['data'] ?? [];
        });
      }

      if (resTop.statusCode == 200) {
        final dataTop = json.decode(resTop.body);
        setState(() {
          topEmpleados = dataTop['data'] ?? [];
        });
      }

      if (resStats.statusCode == 200) {
        final dataStats = json.decode(resStats.body);
        setState(() {
          estadisticas = dataStats['data'];
        });
      }
    } catch (e) {
      _mostrarError('Error al cargar datos: $e');
    } finally {
      setState(() => isLoading = false);
    }
  }

  void _mostrarError(String mensaje) {
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(content: Text(mensaje)),
    );
  }

  int _calcularProgreso(int hechas, int total) {
    if (total == 0) return 0;
    return ((hechas / total) * 100).round();
  }

  Color _getColorProgreso(int progreso) {
    if (progreso >= 75) return Colors.green;
    if (progreso >= 50) return Colors.blue;
    if (progreso >= 25) return Colors.orange;
    return Colors.red;
  }

  Color _getColorEstado(String estado) {
    switch (estado) {
      case 'Completada':
        return const Color(0xFF54e075);
      case 'En Progreso':
        return const Color(0xFFffd965);
      case 'Pendiente':
        return const Color(0xFFee5666);
      case 'Cancelada':
        return Colors.grey;
      default:
        return Colors.blue;
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      key: _scaffoldKey,
      appBar: AppBar(
        title: const Text('Dashboard Administrador'),
        backgroundColor: const Color(0xFFE6C7F6),
        leading: IconButton(
          icon: const Icon(Icons.menu),
          onPressed: () => _scaffoldKey.currentState?.openDrawer(),
        ),
      ),
      drawer: _buildDrawer(),
      body: isLoading
          ? const Center(child: CircularProgressIndicator())
          : _buildContent(),
    );
  }

  Widget _buildDrawer() {
    return Drawer(
      child: Container(
        color: const Color(0xFFE6C7F6),
        child: ListView(
          padding: EdgeInsets.zero,
          children: [
            DrawerHeader(
              decoration: const BoxDecoration(
                color: Color(0xFFE6C7F6),
              ),
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  const CircleAvatar(
                    radius: 40,
                    backgroundColor: Color(0xFF7E57C2),
                    child: Icon(Icons.person, size: 50, color: Colors.white),
                  ),
                  const SizedBox(height: 10),
                  Text(
                    nombreUsuario != null && apellidoUsuario != null
                        ? '$nombreUsuario $apellidoUsuario'
                        : 'Administrador',
                    style: const TextStyle(
                      color: Colors.white,
                      fontSize: 18,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                ],
              ),
            ),
            _buildDrawerItem(
              icon: Icons.settings,
              title: 'Actualizar Datos',
              onTap: () {
                Navigator.pop(context);
                showDialog(
                  context: context,
                  builder: (context) => const ActualizarDatosModal(),
                );
              },
            ),
            _buildDrawerItem(
              icon: Icons.lock,
              title: 'Cambiar Contraseña',
              onTap: () {
                Navigator.pop(context);
                showDialog(
                  context: context,
                  builder: (context) => const CambiarContrasenaModal(),
                );
              },
            ),
            _buildDrawerItem(
              icon: Icons.person_add,
              title: 'Registro de Usuarios',
              onTap: () {
                Navigator.pop(context);
                // Navegar a registro de usuarios
              },
            ),
            _buildDrawerItem(
              icon: Icons.people,
              title: 'Listar Usuarios',
              onTap: () {
                Navigator.pop(context);
                // Navegar a listar usuarios
              },
            ),
            const Divider(color: Colors.white30, thickness: 1),
            _buildDrawerItem(
              icon: Icons.badge,
              title: 'Empleados',
              onTap: () => Navigator.pop(context),
              selected: true,
            ),
            _buildDrawerItem(
              icon: Icons.inventory,
              title: 'Inventario',
              onTap: () {
                Navigator.pop(context);
                // Navegar a inventario
              },
            ),
            _buildDrawerItem(
              icon: Icons.people_outline,
              title: 'Clientes',
              onTap: () {
                Navigator.pop(context);
                // Navegar a clientes
              },
            ),
            const Divider(color: Colors.white30, thickness: 1),
            _buildDrawerItem(
              icon: Icons.manage_accounts,
              title: 'Administrar Empleados',
              onTap: () {
                Navigator.pop(context);
                // Navegar a administrar empleados
              },
            ),
            _buildDrawerItem(
              icon: Icons.assignment,
              title: 'Asignar Tarea',
              onTap: () {
                Navigator.pop(context);
                // Navegar a asignar tarea
              },
            ),
            _buildDrawerItem(
              icon: Icons.list_alt,
              title: 'Administrar Tareas',
              onTap: () {
                Navigator.pop(context);
                // Navegar a administrar tareas
              },
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildDrawerItem({
    required IconData icon,
    required String title,
    required VoidCallback onTap,
    bool selected = false,
  }) {
    return ListTile(
      leading: Icon(icon, color: Colors.white),
      title: Text(
        title,
        style: const TextStyle(color: Colors.white),
      ),
      selected: selected,
      selectedTileColor: const Color(0xFFE6C7F6),
      onTap: onTap,
    );
  }

  Widget _buildContent() {
    return SingleChildScrollView(
      padding: const EdgeInsets.all(16),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          _buildEmpleadosCard(),
          const SizedBox(height: 16),
          _buildStatsRow(),
        ],
      ),
    );
  }

  Widget _buildEmpleadosCard() {
    return Card(
      elevation: 2,
      child: Column(
        children: [
          Container(
            padding: const EdgeInsets.all(16),
            decoration: const BoxDecoration(
              color: Color.fromARGB(255, 69, 197, 214),
              borderRadius: BorderRadius.only(
                topLeft: Radius.circular(4),
                topRight: Radius.circular(4),
              ),
            ),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                const Row(
                  children: [
                    Icon(Icons.people, size: 20),
                    SizedBox(width: 8),
                    Text(
                      'Empleados y Tareas',
                      style: TextStyle(
                        fontWeight: FontWeight.bold,
                        fontSize: 16,
                      ),
                    ),
                  ],
                ),
                ElevatedButton.icon(
                  onPressed: _cargarDatos,
                  icon: const Icon(Icons.refresh, size: 16),
                  label: const Text('Actualizar'),
                  style: ElevatedButton.styleFrom(
                    backgroundColor: Colors.white,
                    foregroundColor: Colors.black,
                  ),
                ),
              ],
            ),
          ),
          empleados.isEmpty
              ? const Padding(
                  padding: EdgeInsets.all(32),
                  child: Text('No hay empleados registrados'),
                )
              : SingleChildScrollView(
                  scrollDirection: Axis.horizontal,
                  child: DataTable(
                    columns: const [
                      DataColumn(label: Text('ID')),
                      DataColumn(label: Text('Empleado')),
                      DataColumn(label: Text('Rol')),
                      DataColumn(label: Text('Hechas')),
                      DataColumn(label: Text('Pendientes')),
                      DataColumn(label: Text('Total')),
                      DataColumn(label: Text('Progreso')),
                    ],
                    rows: empleados.map((emp) {
                      final progreso = _calcularProgreso(
                        emp['TareasHechas'] ?? 0,
                        emp['TotalTareas'] ?? 0,
                      );
                      return DataRow(cells: [
                        DataCell(Text('${emp['ID']}')),
                        DataCell(Text(emp['Empleado'] ?? '')),
                        DataCell(Text(emp['Rol'] ?? '')),
                        DataCell(
                          Container(
                            padding: const EdgeInsets.symmetric(
                              horizontal: 8,
                              vertical: 4,
                            ),
                            decoration: BoxDecoration(
                              color: const Color(0xFFA8E6CF),
                              borderRadius: BorderRadius.circular(4),
                            ),
                            child: Text('${emp['TareasHechas']}'),
                          ),
                        ),
                        DataCell(
                          Container(
                            padding: const EdgeInsets.symmetric(
                              horizontal: 8,
                              vertical: 4,
                            ),
                            decoration: BoxDecoration(
                              color: const Color(0xFFFFB6B9),
                              borderRadius: BorderRadius.circular(4),
                            ),
                            child: Text('${emp['Pendientes']}'),
                          ),
                        ),
                        DataCell(
                          Text(
                            '${emp['TotalTareas']}',
                            style: const TextStyle(fontWeight: FontWeight.bold),
                          ),
                        ),
                        DataCell(
                          SizedBox(
                            width: 100,
                            child: LinearProgressIndicator(
                              value: progreso / 100,
                              backgroundColor: Colors.grey[300],
                              valueColor: AlwaysStoppedAnimation<Color>(
                                _getColorProgreso(progreso),
                              ),
                              minHeight: 20,
                            ),
                          ),
                        ),
                      ]);
                    }).toList(),
                  ),
                ),
        ],
      ),
    );
  }

  Widget _buildStatsRow() {
    return LayoutBuilder(
      builder: (context, constraints) {
        if (constraints.maxWidth > 900) {
          return Row(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Expanded(child: _buildEstadisticasCard()),
              const SizedBox(width: 16),
              Expanded(child: _buildTopEmpleadosCard()),
              const SizedBox(width: 16),
              Expanded(child: _buildCalendarioCard()),
            ],
          );
        } else {
          return Column(
            children: [
              _buildEstadisticasCard(),
              const SizedBox(height: 16),
              _buildTopEmpleadosCard(),
              const SizedBox(height: 16),
              _buildCalendarioCard(),
            ],
          );
        }
      },
    );
  }

  Widget _buildEstadisticasCard() {
    return Card(
      elevation: 2,
      child: Column(
        children: [
          Container(
            padding: const EdgeInsets.all(16),
            decoration: const BoxDecoration(
              color: Color(0xFF7cbbe4),
              borderRadius: BorderRadius.only(
                topLeft: Radius.circular(4),
                topRight: Radius.circular(4),
              ),
            ),
            child: const Row(
              children: [
                Icon(Icons.bar_chart, size: 20),
                SizedBox(width: 8),
                Text(
                  'Estadísticas de Tareas',
                  style: TextStyle(
                    fontWeight: FontWeight.bold,
                    fontSize: 16,
                  ),
                ),
              ],
            ),
          ),
          Padding(
            padding: const EdgeInsets.all(16),
            child: estadisticas == null ||
                    estadisticas!['general'] == null ||
                    (estadisticas!['general'] as List).isEmpty
                ? const Text('No hay tareas registradas')
                : Column(
                    children: [
                      SizedBox(
                        height: 200,
                        child: PieChart(
                          PieChartData(
                            sections: (estadisticas!['general'] as List)
                                .map((item) {
                              return PieChartSectionData(
                                value: (item['Cantidad'] ?? 0).toDouble(),
                                title: '${item['Cantidad']}',
                                color: _getColorEstado(item['EstadoTarea']),
                                radius: 50,
                              );
                            }).toList(),
                          ),
                        ),
                      ),
                      const SizedBox(height: 16),
                      ...(estadisticas!['general'] as List).map((item) {
                        return Padding(
                          padding: const EdgeInsets.symmetric(vertical: 4),
                          child: Row(
                            mainAxisAlignment: MainAxisAlignment.spaceBetween,
                            children: [
                              Row(
                                children: [
                                  Container(
                                    width: 12,
                                    height: 12,
                                    decoration: BoxDecoration(
                                      color: _getColorEstado(
                                          item['EstadoTarea']),
                                      shape: BoxShape.circle,
                                    ),
                                  ),
                                  const SizedBox(width: 8),
                                  Text(item['EstadoTarea'] ?? ''),
                                ],
                              ),
                              Chip(
                                label: Text('${item['Cantidad']}'),
                                backgroundColor: Colors.grey[300],
                              ),
                            ],
                          ),
                        );
                      }).toList(),
                    ],
                  ),
          ),
        ],
      ),
    );
  }

  Widget _buildTopEmpleadosCard() {
    return Card(
      elevation: 2,
      child: Column(
        children: [
          Container(
            padding: const EdgeInsets.all(16),
            decoration: const BoxDecoration(
              color: Color(0xFF7cbbe4),
              borderRadius: BorderRadius.only(
                topLeft: Radius.circular(4),
                topRight: Radius.circular(4),
              ),
            ),
            child: const Row(
              children: [
                Icon(Icons.emoji_events, size: 20),
                SizedBox(width: 8),
                Text(
                  'Top 5 Empleados',
                  style: TextStyle(
                    fontWeight: FontWeight.bold,
                    fontSize: 16,
                  ),
                ),
              ],
            ),
          ),
          topEmpleados.isEmpty
              ? const Padding(
                  padding: EdgeInsets.all(32),
                  child: Text('No hay datos suficientes'),
                )
              : ListView.builder(
                  shrinkWrap: true,
                  physics: const NeverScrollableScrollPhysics(),
                  itemCount: topEmpleados.length,
                  itemBuilder: (context, index) {
                    final emp = topEmpleados[index];
                    return ListTile(
                      leading: CircleAvatar(
                        backgroundColor: index == 0
                            ? Colors.amber
                            : index == 1
                                ? Colors.grey
                                : Colors.brown,
                        child: Text('${index + 1}'),
                      ),
                      title: Text(emp['NombreEmpleado'] ?? ''),
                      subtitle: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(emp['NombreRol'] ?? ''),
                          const SizedBox(height: 4),
                          Wrap(
                            spacing: 4,
                            children: [
                              Chip(
                                label: Text('✓ ${emp['TareasCompletadas']}'),
                                backgroundColor: Colors.green[100],
                                labelStyle: const TextStyle(fontSize: 10),
                              ),
                              Chip(
                                label: Text('⏳ ${emp['TareasEnProgreso']}'),
                                backgroundColor: Colors.orange[100],
                                labelStyle: const TextStyle(fontSize: 10),
                              ),
                              Chip(
                                label: Text('! ${emp['TareasPendientes']}'),
                                backgroundColor: Colors.red[100],
                                labelStyle: const TextStyle(fontSize: 10),
                              ),
                            ],
                          ),
                        ],
                      ),
                      trailing: Chip(
                        label: Text('${emp['ScoreRendimiento']}'),
                        backgroundColor: Colors.blue[100],
                      ),
                    );
                  },
                ),
        ],
      ),
    );
  }

  Widget _buildCalendarioCard() {
    return Card(
      elevation: 2,
      child: Column(
        children: [
          Container(
            padding: const EdgeInsets.all(16),
            decoration: const BoxDecoration(
              color: Color(0xFF7cbbe4),
              borderRadius: BorderRadius.only(
                topLeft: Radius.circular(4),
                topRight: Radius.circular(4),
              ),
            ),
            child: const Row(
              children: [
                Icon(Icons.calendar_month, size: 20),
                SizedBox(width: 8),
                Text(
                  'Calendario',
                  style: TextStyle(
                    fontWeight: FontWeight.bold,
                    fontSize: 16,
                  ),
                ),
              ],
            ),
          ),
          Padding(
            padding: const EdgeInsets.all(8.0),
            child: TableCalendar(
              firstDay: DateTime.utc(2020, 1, 1),
              lastDay: DateTime.utc(2030, 12, 31),
              focusedDay: _focusedDay,
              selectedDayPredicate: (day) {
                return isSameDay(_selectedDay, day);
              },
              onDaySelected: (selectedDay, focusedDay) {
                setState(() {
                  _selectedDay = selectedDay;
                  _focusedDay = focusedDay;
                });
              },
              calendarFormat: CalendarFormat.month,
              locale: 'es_CO',
              headerStyle: HeaderStyle(
                formatButtonVisible: false,
                titleCentered: true,
                titleTextStyle: const TextStyle(
                  fontSize: 16,
                  fontWeight: FontWeight.bold,
                ),
              ),
              calendarStyle: CalendarStyle(
                todayDecoration: BoxDecoration(
                  color: const Color(0xFF7cbbe4),
                  shape: BoxShape.circle,
                ),
                selectedDecoration: BoxDecoration(
                  color: const Color(0xFF4A148C),
                  shape: BoxShape.circle,
                ),
                weekendTextStyle: const TextStyle(color: Colors.red),
                outsideDaysVisible: false,
              ),
              daysOfWeekStyle: const DaysOfWeekStyle(
                weekendStyle: TextStyle(color: Colors.red),
              ),
            ),
          ),
        ],
      ),
    );
  }
}