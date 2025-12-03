import 'package:flutter/material.dart';
import 'package:fl_chart/fl_chart.dart';
import 'package:front/pages/admin_clientes_page.dart';
import 'package:front/pages/lista_productos.dart';
import 'package:front/pages/registro_productos.dart';
import 'package:table_calendar/table_calendar.dart';
import '../widgets/header_line.dart';
import '../widgets/footer_line.dart';
import 'registro_usuarios.dart';
import 'package:front/pages/admin_page.dart';
import '../widgets/actualizar_datos_modal.dart';
import '../widgets/cambiar_contraseña_modal.dart';
import 'package:front/pages/lista_usuarios.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Admin Inventario',
      theme: ThemeData(
        primarySwatch: Colors.blue,
        scaffoldBackgroundColor: Colors.grey[100],
      ),
      home: const AdminInventarioPage(),
      debugShowCheckedModeBanner: false,
    );
  }
}

class AdminInventarioPage extends StatefulWidget {
  const AdminInventarioPage({Key? key}) : super(key: key);

  @override
  State<AdminInventarioPage> createState() => _AdminInventarioPageState();
}

class _AdminInventarioPageState extends State<AdminInventarioPage> {
  final GlobalKey<ScaffoldState> _scaffoldKey = GlobalKey<ScaffoldState>();
  bool _loading = false;
  bool _initialLoading = true;
  DateTime _focusedDay = DateTime.now();
  DateTime? _selectedDay;

  // Datos simulados del usuario
  final Map<String, String> usuario = {'nombre': 'Administrador'};

  // Productos simulados
  final List<Map<String, dynamic>> productos = [
    {
      'ID': 1,
      'Nombre': 'Pijama Clásica',
      'Color': 'azul',
      'Talla': 'M',
      'Stock': 15,
      'Precio': 45000
    },
    {
      'ID': 2,
      'Nombre': 'Pijama Premium',
      'Color': 'rosa',
      'Talla': 'L',
      'Stock': 8,
      'Precio': 65000
    },
    {
      'ID': 3,
      'Nombre': 'Pijama Infantil',
      'Color': 'verde',
      'Talla': 'S',
      'Stock': 20,
      'Precio': 35000
    },
    {
      'ID': 4,
      'Nombre': 'Pijama Ejecutiva',
      'Color': 'negro',
      'Talla': 'XL',
      'Stock': 4,
      'Precio': 75000
    },
    {
      'ID': 5,
      'Nombre': 'Pijama Verano',
      'Color': 'amarillo',
      'Talla': 'M',
      'Stock': 12,
      'Precio': 40000
    },
    {
      'ID': 6,
      'Nombre': 'Pijama Inverno',
      'Color': 'gris',
      'Talla': 'L',
      'Stock': 6,
      'Precio': 55000
    },
  ];

  // Top productos más vendidos
  final List<Map<String, dynamic>> topProductos = [
    {
      'ID': 1,
      'Nombre': 'Pijama Clásica',
      'Color': 'azul',
      'Talla': 'M',
      'UnidadesVendidas': 45
    },
    {
      'ID': 3,
      'Nombre': 'Pijama Infantil',
      'Color': 'verde',
      'Talla': 'S',
      'UnidadesVendidas': 38
    },
    {
      'ID': 2,
      'Nombre': 'Pijama Premium',
      'Color': 'rosa',
      'Talla': 'L',
      'UnidadesVendidas': 32
    },
    {
      'ID': 5,
      'Nombre': 'Pijama Verano',
      'Color': 'amarillo',
      'Talla': 'M',
      'UnidadesVendidas': 28
    },
    {
      'ID': 4,
      'Nombre': 'Pijama Ejecutiva',
      'Color': 'negro',
      'Talla': 'XL',
      'UnidadesVendidas': 22
    },
  ];

  // Estadísticas por talla
  final List<Map<String, dynamic>> estadisticasPorTalla = [
    {'Talla': 'S', 'Cantidad': 20},
    {'Talla': 'M', 'Cantidad': 27},
    {'Talla': 'L', 'Cantidad': 14},
    {'Talla': 'XL', 'Cantidad': 4},
  ];

  // Mapa de colores
  final Map<String, Color> colorMap = {
    'rojo': Colors.red,
    'azul': Colors.blue,
    'verde': Colors.green,
    'amarillo': Colors.yellow,
    'negro': Colors.black,
    'blanco': Colors.white,
    'gris': Colors.grey,
    'rosa': Colors.pink,
    'morado': Colors.purple,
    'naranja': Colors.orange,
    'cafe': const Color(0xFF8B4513),
    'café': const Color(0xFF8B4513),
    'beige': const Color(0xFFF5F5DC),
    'celeste': Colors.lightBlue,
    'turquesa': Colors.teal,
    'violeta': Colors.purpleAccent,
    'fucsia': Colors.pinkAccent,
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

  Color getColorCode(String? colorName) {
    if (colorName == null) return Colors.grey[300]!;
    return colorMap[colorName.toLowerCase()] ?? Colors.grey[300]!;
  }

  void _recargarDatos() {
    setState(() {
      _loading = true;
    });

    // Simular carga
    Future.delayed(const Duration(seconds: 1), () {
      setState(() {
        _loading = false;
      });
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Datos actualizados')),
      );
    });
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
              // TODO: Navegar al login
              ScaffoldMessenger.of(context).showSnackBar(
                const SnackBar(content: Text('Sesión cerrada')),
              );
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
                  'Cargando Gestión de Inventario...',
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
            padding: const EdgeInsets.symmetric(vertical: 8),
            child: Row(
              children: [
                IconButton(
                  icon: const Icon(Icons.menu, color: Colors.white),
                  onPressed: () => _scaffoldKey.currentState?.openDrawer(),
                ),
                const Text(
                  'Gestión de Inventario',
                  style: TextStyle(
                    color: Colors.white,
                    fontSize: 18,
                    fontWeight: FontWeight.bold,
                  ),
                ),
              ],
            ),
          ),

          // Contenido principal
          Expanded(
            child: _loading
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

  Widget _buildContent() {
    return SingleChildScrollView(
      padding: const EdgeInsets.all(16),
      child: Column(
        children: [
          _buildInventarioCard(),
          const SizedBox(height: 16),
          _buildEstadisticasRow(),
        ],
      ),
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
                    '${usuario['nombre']}',
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
              onTap: () {
                Navigator.push(
                  context,
                  MaterialPageRoute(builder: (context) => const AdminPage()),
                );
              },
            ),
            _buildDrawerItem(
              icon: Icons.inventory_2,
              title: 'Inventario',
              onTap: () => Navigator.pop(context),
              selected: true,
            ),
            _buildDrawerItem(
              icon: Icons.people_outline,
              title: 'Clientes',
              onTap: () {
                Navigator.push(
                  context,
                  MaterialPageRoute(builder: (context) => AdminClientesPage()),
                );
              },
            ),
            const Divider(color: Colors.white30, thickness: 1),
            _buildDrawerItem(
              icon: Icons.badge,
              title: 'Registro productos',
              onTap: () {
                Navigator.push(
                  context,
                  MaterialPageRoute(builder: (context) => RegistroProductos()),
                );
              },
            ),
            _buildDrawerItem(
              icon: Icons.manage_search,
              title: 'Administrar Productos',
              onTap: () {
                Navigator.push(
                  context,
                  MaterialPageRoute(builder: (context) => ListaProductos()),
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

  Widget _buildInventarioCard() {
    return Card(
      elevation: 2,
      child: Column(
        children: [
          Container(
            padding: const EdgeInsets.all(16),
            decoration: BoxDecoration(
              color: Colors.grey[200],
              borderRadius:
                  const BorderRadius.vertical(top: Radius.circular(4)),
            ),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                const Row(
                  children: [
                    Icon(Icons.inventory_2),
                    SizedBox(width: 8),
                    Text('Inventario de Pijamas',
                        style: TextStyle(
                            fontWeight: FontWeight.bold, fontSize: 16)),
                  ],
                ),
                ElevatedButton.icon(
                  onPressed: _recargarDatos,
                  icon: const Icon(Icons.refresh, size: 18),
                  label: const Text('Actualizar'),
                  style: ElevatedButton.styleFrom(
                    backgroundColor: const Color(0xFF7CBBE4),
                    foregroundColor: Colors.black,
                  ),
                ),
              ],
            ),
          ),
          SingleChildScrollView(
            scrollDirection: Axis.horizontal,
            child: DataTable(
              columns: const [
                DataColumn(
                    label: Text('ID',
                        style: TextStyle(fontWeight: FontWeight.bold))),
                DataColumn(
                    label: Text('Producto',
                        style: TextStyle(fontWeight: FontWeight.bold))),
                DataColumn(
                    label: Text('Color',
                        style: TextStyle(fontWeight: FontWeight.bold))),
                DataColumn(
                    label: Text('Talla',
                        style: TextStyle(fontWeight: FontWeight.bold))),
                DataColumn(
                    label: Text('Stock',
                        style: TextStyle(fontWeight: FontWeight.bold))),
                DataColumn(
                    label: Text('Precio',
                        style: TextStyle(fontWeight: FontWeight.bold))),
              ],
              rows: productos.map((prod) {
                return DataRow(cells: [
                  DataCell(Text(prod['ID'].toString())),
                  DataCell(Text(prod['Nombre'])),
                  DataCell(
                    Row(
                      children: [
                        Container(
                          width: 24,
                          height: 24,
                          decoration: BoxDecoration(
                            color: getColorCode(prod['Color']),
                            shape: BoxShape.circle,
                            border: Border.all(color: Colors.grey[300]!),
                          ),
                        ),
                        const SizedBox(width: 8),
                        Text(prod['Color'],
                            style: const TextStyle(
                                fontSize: 12, color: Colors.grey)),
                      ],
                    ),
                  ),
                  DataCell(Text(prod['Talla'])),
                  DataCell(
                    Container(
                      padding: const EdgeInsets.symmetric(
                          horizontal: 8, vertical: 4),
                      decoration: BoxDecoration(
                        color: prod['Stock'] > 10
                            ? Colors.green
                            : prod['Stock'] > 5
                                ? Colors.orange
                                : Colors.red,
                        borderRadius: BorderRadius.circular(12),
                      ),
                      child: Text(
                        prod['Stock'].toString(),
                        style: const TextStyle(
                            color: Colors.white, fontWeight: FontWeight.bold),
                      ),
                    ),
                  ),
                  DataCell(Text(
                      '\$${prod['Precio'].toString().replaceAllMapped(RegExp(r'(\d{1,3})(?=(\d{3})+(?!\d))'), (Match m) => '${m[1]}.')}')),
                ]);
              }).toList(),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildEstadisticasRow() {
    return LayoutBuilder(
      builder: (context, constraints) {
        if (constraints.maxWidth > 900) {
          return Row(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Expanded(child: _buildGraficoCard()),
              const SizedBox(width: 16),
              Expanded(child: _buildTopProductosCard()),
              const SizedBox(width: 16),
              Expanded(child: _buildCalendarioCard()),
            ],
          );
        } else {
          return Column(
            children: [
              _buildGraficoCard(),
              const SizedBox(height: 16),
              _buildTopProductosCard(),
              const SizedBox(height: 16),
              _buildCalendarioCard(),
            ],
          );
        }
      },
    );
  }

  Widget _buildGraficoCard() {
    final colors = [
      Colors.blueAccent,
      Colors.deepPurple,
      Colors.orangeAccent,
      Colors.green,
      Colors.redAccent,
    ];

    return Card(
      elevation: 4,
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
      child: Column(
        children: [
          Container(
            padding: const EdgeInsets.all(16),
            decoration: BoxDecoration(
              color: Colors.blueGrey[50],
              borderRadius:
                  const BorderRadius.vertical(top: Radius.circular(12)),
            ),
            child: const Row(
              children: [
                Icon(Icons.bar_chart, color: Colors.blueAccent),
                SizedBox(width: 8),
                Text(
                  'Estadísticas por Talla',
                  style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16),
                ),
              ],
            ),
          ),
          Padding(
            padding: const EdgeInsets.all(24),
            child: SizedBox(
              height: 250,
              child: PieChart(
                PieChartData(
                  sections: estadisticasPorTalla.asMap().entries.map((entry) {
                    return PieChartSectionData(
                      value: entry.value['Cantidad'].toDouble(),
                      title: '${entry.value['Cantidad']}',
                      color: colors[entry.key % colors.length],
                      radius: 90,
                      titleStyle: const TextStyle(
                        fontSize: 14,
                        fontWeight: FontWeight.bold,
                        color: Colors.white,
                      ),
                    );
                  }).toList(),
                  sectionsSpace: 2,
                  centerSpaceRadius: 40, // dona en el centro
                ),
              ),
            ),
          ),
          Wrap(
            spacing: 12,
            runSpacing: 8,
            children: estadisticasPorTalla.asMap().entries.map((entry) {
              return Row(
                mainAxisSize: MainAxisSize.min,
                children: [
                  Container(
                    width: 12,
                    height: 12,
                    decoration: BoxDecoration(
                      color: colors[entry.key % colors.length],
                      shape: BoxShape.circle,
                    ),
                  ),
                  const SizedBox(width: 6),
                  Text('${entry.value['Talla']}'),
                ],
              );
            }).toList(),
          ),
          const SizedBox(height: 16),
        ],
      ),
    );
  }

  Widget _buildTopProductosCard() {
    return Card(
      elevation: 2,
      child: Column(
        children: [
          Container(
            padding: const EdgeInsets.all(16),
            decoration: BoxDecoration(
              color: Colors.grey[200],
              borderRadius:
                  const BorderRadius.vertical(top: Radius.circular(4)),
            ),
            child: const Row(
              children: [
                Icon(Icons.emoji_events),
                SizedBox(width: 8),
                Text('Top 5 Productos más Vendidos',
                    style: TextStyle(fontWeight: FontWeight.bold)),
              ],
            ),
          ),
          ListView.builder(
            shrinkWrap: true,
            physics: const NeverScrollableScrollPhysics(),
            itemCount: topProductos.length,
            itemBuilder: (context, index) {
              final prod = topProductos[index];
              return ListTile(
                leading: CircleAvatar(
                  backgroundColor: Colors.blue[100],
                  child: Text('${index + 1}',
                      style: const TextStyle(fontWeight: FontWeight.bold)),
                ),
                title: Text(prod['Nombre'],
                    style: const TextStyle(fontWeight: FontWeight.bold)),
                subtitle: Row(
                  children: [
                    Container(
                      width: 16,
                      height: 16,
                      decoration: BoxDecoration(
                        color: getColorCode(prod['Color']),
                        shape: BoxShape.circle,
                        border: Border.all(color: Colors.grey[300]!),
                      ),
                    ),
                    const SizedBox(width: 4),
                    Text('${prod['Color']} - ${prod['Talla']}',
                        style: const TextStyle(fontSize: 12)),
                  ],
                ),
                trailing: Container(
                  padding:
                      const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
                  decoration: BoxDecoration(
                    color: Colors.blue[200],
                    borderRadius: BorderRadius.circular(12),
                  ),
                  child: Text(
                    prod['UnidadesVendidas'].toString(),
                    style: const TextStyle(fontWeight: FontWeight.bold),
                  ),
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
            decoration: BoxDecoration(
              color: Colors.grey[200],
              borderRadius:
                  const BorderRadius.vertical(top: Radius.circular(4)),
            ),
            child: const Row(
              children: [
                Icon(Icons.calendar_month),
                SizedBox(width: 8),
                Text('Calendario',
                    style: TextStyle(fontWeight: FontWeight.bold)),
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