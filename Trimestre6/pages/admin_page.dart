import 'package:flutter/material.dart';
import 'package:fl_chart/fl_chart.dart';
import 'package:front/pages/lista_empleados.dart';
import 'package:front/pages/lista_tareas.dart';
import 'package:front/pages/lista_usuarios.dart';
import '../widgets/header_line.dart'; // Importar HeaderLine
import '../widgets/footer_line.dart'; // Importar FooterLine
import 'registro_usuarios.dart';
import 'RegistroTareas_page.dart';
import 'package:table_calendar/table_calendar.dart';
import 'package:front/pages/admin_inventario_page.dart';
import '../widgets/actualizar_datos_modal.dart';
import '../widgets/cambiar_contraseña_modal.dart';
import 'admin_clientes_page.dart';

class AdminPage extends StatefulWidget {
  const AdminPage({Key? key}) : super(key: key);

  @override
  State<AdminPage> createState() => _AdminPageState();
}

class _AdminPageState extends State<AdminPage> {
  final GlobalKey<ScaffoldState> _scaffoldKey = GlobalKey<ScaffoldState>();

  String? nombreUsuario = "Administrador";

  bool isLoading = false;
  bool _initialLoading = true;
  DateTime _focusedDay = DateTime.now();
  DateTime? _selectedDay;

  final List<dynamic> empleados = [
    {
      'ID': 1,
      'Empleado': 'Juan Pérez',
      'Rol': 'Desarrollador',
      'TareasHechas': 8,
      'Pendientes': 2,
      'TotalTareas': 10,
    },
    {
      'ID': 2,
      'Empleado': 'Ana Gómez',
      'Rol': 'Diseñadora',
      'TareasHechas': 5,
      'Pendientes': 5,
      'TotalTareas': 10,
    },
    {
      'ID': 3,
      'Empleado': 'Carlos Ruiz',
      'Rol': 'QA',
      'TareasHechas': 10,
      'Pendientes': 0,
      'TotalTareas': 10,
    },
  ];

  final List<dynamic> topEmpleados = [
    {
      'NombreEmpleado': 'Carlos Ruiz',
      'NombreRol': 'QA',
      'TareasCompletadas': 15,
      'TareasEnProgreso': 2,
      'TareasPendientes': 0,
      'ScoreRendimiento': 98.5,
    },
    {
      'NombreEmpleado': 'Juan Pérez',
      'NombreRol': 'Desarrollador',
      'TareasCompletadas': 12,
      'TareasEnProgreso': 3,
      'TareasPendientes': 1,
      'ScoreRendimiento': 92.0,
    },
    {
      'NombreEmpleado': 'Maria Lopez',
      'NombreRol': 'Gerente',
      'TareasCompletadas': 10,
      'TareasEnProgreso': 5,
      'TareasPendientes': 2,
      'ScoreRendimiento': 88.0,
    },
  ];

  final Map<String, dynamic> estadisticas = {
    'general': [
      {'EstadoTarea': 'Completada', 'Cantidad': 25},
      {'EstadoTarea': 'En Progreso', 'Cantidad': 10},
      {'EstadoTarea': 'Pendiente', 'Cantidad': 5},
      {'EstadoTarea': 'Cancelada', 'Cantidad': 2},
    ]
  };

  @override
  void initState() {
    super.initState();
    // Simular carga inicial
    Future.delayed(const Duration(seconds: 2), () {
      if (mounted) {
        setState(() {
          _initialLoading = false;
        });
      }
    });
  }

  void _simularRecarga() async {
    setState(() => isLoading = true);
    await Future.delayed(const Duration(seconds: 1));
    setState(() => isLoading = false);
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

  void _handleLogout() {
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
              // Navegar al login
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
    if (_initialLoading) {
      return Scaffold(
        body: Container(
          decoration: BoxDecoration(
            gradient: LinearGradient(
              begin: Alignment.topCenter,
              end: Alignment.bottomCenter,
              colors: [
                const Color(0xFF800080),
                const Color(0xFFE6C7F6),
              ],
            ),
          ),
          child: Center(
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                const CircularProgressIndicator(
                  valueColor: AlwaysStoppedAnimation<Color>(Colors.white),
                  strokeWidth: 5,
                ),
                const SizedBox(height: 24),
                const Text(
                  'Cargando Panel de Administración...',
                  style: TextStyle(
                    color: Colors.white,
                    fontSize: 20,
                    fontWeight: FontWeight.bold,
                  ),
                ),
                const SizedBox(height: 8),
                Text(
                  'Por favor espera',
                  style: TextStyle(
                    color: Colors.white.withOpacity(0.8),
                    fontSize: 14,
                  ),
                ),
              ],
            ),
          ),
        ),
      );
    }

    return Scaffold(
      key: _scaffoldKey,
      body: Column(
        children: [
          // Header
          HeaderLine(
            onLogout: _handleLogout,
          ),
          
          // AppBar debajo del header
          Container(
            color: const Color(0xFF800080),
            child: Row(
              children: [
                IconButton(
                  icon: const Icon(Icons.menu),
                  onPressed: () => _scaffoldKey.currentState?.openDrawer(),
                ),
                const Text(
                  'Panel de Administración',
                  style: TextStyle(
                    fontSize: 18,
                    fontWeight: FontWeight.bold,
                  ),
                ),
              ],
            ),
          ),
          
          // Contenido principal
          Expanded(
            child: isLoading
                ? const Center(child: CircularProgressIndicator())
                : _buildContent(),
          ),
          
          // Footer
          const FooterLine(),
        ],
      ),
      drawer: _buildDrawer(),
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
                    '$nombreUsuario',
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
                Navigator.push(
                  context,
                  MaterialPageRoute(
                      builder: (context) => const RegistroUsuarios()),
                );
              },
            ),
            _buildDrawerItem(
              icon: Icons.person_add,
              title: 'Listar Usuarios',
              onTap: () {
                Navigator.push(
                  context,
                  MaterialPageRoute(
                      builder: (context) => const ListaUsuarios()),
                );
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
              icon: Icons.person_add,
              title: ' Inventario',
              onTap: () {
                Navigator.push(
                  context,
                  MaterialPageRoute(
                      builder: (context) => const AdminInventarioPage()),
                );
              },
            ),
            _buildDrawerItem(
              icon: Icons.people_outline,
              title: 'Clientes',
              onTap: () {
                 Navigator.push(
                  context,
                  MaterialPageRoute(builder: (context) =>  AdminClientesPage()),
                );
                
              },
            ),
            _buildDrawerItem(
              icon: Icons.person_add,
              title: 'Administrar Empleados',
              onTap: () {
                Navigator.push(
                  context,
                  MaterialPageRoute(
                      builder: (context) => const ListaEmpleados()),
                );
              },
            ),
            _buildDrawerItem(
              icon: Icons.person_add,
              title: 'Asignar Tareas',
              onTap: () {
                Navigator.push(
                  context,
                  MaterialPageRoute(
                      builder: (context) => const RegistroTareasPage()),
                );
              },
            ),
            _buildDrawerItem(
              icon: Icons.person_add,
              title: 'Administrar Tareas',
              onTap: () {
                Navigator.push(
                  context,
                  MaterialPageRoute(
                      builder: (context) => const ListaTareas()),
                );
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
      leading: Icon(
        icon,
        color: selected ? const Color(0xFF4A148C) : Colors.white,
      ),
      title: Text(
        title,
        style: TextStyle(
          color: selected ? const Color(0xFF4A148C) : Colors.white,
          fontWeight: selected ? FontWeight.bold : FontWeight.normal,
        ),
      ),
      selected: selected,
      selectedTileColor: Colors.white.withOpacity(0.2),
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
                  onPressed: _simularRecarga,
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
            child: (estadisticas['general'] as List).isEmpty
                ? const Text('No hay tareas registradas')
                : Column(
                    children: [
                      SizedBox(
                        height: 200,
                        child: PieChart(
                          PieChartData(
                            sections:
                                (estadisticas['general'] as List).map((item) {
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
                      ...(estadisticas['general'] as List).map((item) {
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
                                      color:
                                          _getColorEstado(item['EstadoTarea']),
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
              headerStyle: const HeaderStyle(
                formatButtonVisible: false,
                titleCentered: true,
                titleTextStyle: TextStyle(
                  fontSize: 16,
                  fontWeight: FontWeight.bold,
                ),
              ),
              calendarStyle: const CalendarStyle(
                todayDecoration: BoxDecoration(
                  color: Color(0xFF7cbbe4),
                  shape: BoxShape.circle,
                ),
                selectedDecoration: BoxDecoration(
                  color: Color(0xFF4A148C),
                  shape: BoxShape.circle,
                ),
                weekendTextStyle: TextStyle(color: Colors.red),
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