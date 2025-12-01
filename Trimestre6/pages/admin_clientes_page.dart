import 'package:flutter/material.dart';
import 'package:front/pages/admin_inventario_page.dart';
import 'package:front/pages/admin_page.dart';
import 'package:front/pages/lista_carritos.dart';
import 'package:front/pages/lista_clientes.dart';
import 'package:front/pages/lista_ventas.dart';
import 'package:intl/intl.dart';
import 'package:table_calendar/table_calendar.dart';
import 'package:fl_chart/fl_chart.dart';
import '../widgets/actualizar_datos_modal.dart';
import '../widgets/cambiar_contraseña_modal.dart';
import 'registro_usuarios.dart';

class AdminClientesPage extends StatefulWidget {
  const AdminClientesPage({Key? key}) : super(key: key);

  @override
  State<AdminClientesPage> createState() => _AdminClientesPageState();
}

class _AdminClientesPageState extends State<AdminClientesPage> {
  bool loading = true;
  String nombreUsuario = "Administrador";
  List<Map<String, dynamic>> clientes = [];
  List<Map<String, dynamic>> topClientes = [];
  Map<String, dynamic>? estadisticas;
  DateTime _focusedDay = DateTime.now();
  DateTime? _selectedDay;

  @override
  void initState() {
    super.initState();
    cargarDatos();
  }

  Future<void> cargarDatos() async {
    setState(() => loading = true);

    // Simular delay de red
    await Future.delayed(Duration(seconds: 1));

    setState(() {
      // Datos simulados de clientes
      clientes = [
        {
          'ID': 1,
          'Nombre': 'Carlos',
          'Apellido': 'González',
          'Email': 'carlos.gonzalez@email.com',
          'Telefono': '3001234567',
          'TotalCompras': 12,
          'TotalGastado': 2450000,
          'Estado': 'Activo',
        },
        {
          'ID': 2,
          'Nombre': 'María',
          'Apellido': 'Rodríguez',
          'Email': 'maria.rodriguez@email.com',
          'Telefono': '3109876543',
          'TotalCompras': 8,
          'TotalGastado': 1890000,
          'Estado': 'Activo',
        },
        {
          'ID': 3,
          'Nombre': 'Pedro',
          'Apellido': 'Martínez',
          'Email': 'pedro.martinez@email.com',
          'Telefono': '3201122334',
          'TotalCompras': 3,
          'TotalGastado': 650000,
          'Estado': 'Nuevo',
        },
        {
          'ID': 4,
          'Nombre': 'Ana',
          'Apellido': 'López',
          'Email': 'ana.lopez@email.com',
          'Telefono': '3154455667',
          'TotalCompras': 15,
          'TotalGastado': 3200000,
          'Estado': 'Activo',
        },
        {
          'ID': 5,
          'Nombre': 'Luis',
          'Apellido': 'Pérez',
          'Email': 'luis.perez@email.com',
          'Telefono': '3187788990',
          'TotalCompras': 1,
          'TotalGastado': 125000,
          'Estado': 'Inactivo',
        },
      ];

      // Top 5 clientes ordenados por total gastado
      topClientes = List.from(clientes)
        ..sort((a, b) =>
            (b['TotalGastado'] as int).compareTo(a['TotalGastado'] as int))
        ..take(5);

      // Estadísticas simuladas
      estadisticas = {
        'porEstado': [
          {'Estado': 'Activo', 'Cantidad': 3},
          {'Estado': 'Inactivo', 'Cantidad': 1},
          {'Estado': 'Nuevo', 'Cantidad': 1},
        ],
      };

      loading = false;
    });
  }

  Map<String, dynamic> getNivelCliente(int compras) {
    if (compras >= 10) {
      return {
        'nivel': 'VIP',
        'color': Colors.amber,
        'icono': Icons.star,
      };
    }
    if (compras >= 5) {
      return {
        'nivel': 'Premium',
        'color': Colors.lightBlue,
        'icono': Icons.diamond,
      };
    }
    return {
      'nivel': 'Regular',
      'color': Colors.grey[600],
      'icono': Icons.person,
    };
  }

  String formatearPrecio(int precio) {
    final formatter = NumberFormat.currency(
      locale: 'es_CO',
      symbol: '\$',
      decimalDigits: 0,
    );
    return formatter.format(precio);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.grey[100],
      appBar: AppBar(
        title: Text('Panel de Clientes'),
        backgroundColor: Color(0xFFE6C7F6),
        actions: [
          IconButton(
            icon: Icon(Icons.refresh),
            onPressed: cargarDatos,
          ),
        ],
      ),
      drawer: _buildDrawer(),
      body: loading
          ? Center(
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  
                  CircularProgressIndicator(),
                  SizedBox(height: 16),
                  Text('Cargando datos de clientes...'),
                ],
              ),
            )
          : SingleChildScrollView(
              padding: EdgeInsets.all(16),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  // TABLA DE CLIENTES
                  _buildClientesTable(),
                  SizedBox(height: 24),

                  // FILA DE ESTADÍSTICAS, TOP Y CALENDARIO
                  LayoutBuilder(
                    builder: (context, constraints) {
                      if (constraints.maxWidth > 900) {
                        return Row(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Expanded(child: _buildEstadisticas()),
                            SizedBox(width: 16),
                            Expanded(child: _buildTopClientes()),
                            SizedBox(width: 16),
                            Expanded(child: _buildCalendario()),
                          ],
                        );
                      } else {
                        return Column(
                          children: [
                            _buildEstadisticas(),
                            SizedBox(height: 16),
                            _buildTopClientes(),
                            SizedBox(height: 16),
                            _buildCalendario(),
                          ],
                        );
                      }
                    },
                  ),
                ],
              ),
            ),
    );
  }

  Widget _buildDrawer() {
    return Drawer(
      child: Container(
        color: Color(0xFFE6C7F6),
        child: ListView(
          padding: EdgeInsets.zero,
          children: [
            DrawerHeader(
              decoration: BoxDecoration(
                color: Color(0xFFE6C7F6),
              ),
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  CircleAvatar(
                    radius: 40,
                    backgroundColor: Color(0xFF7E57C2),
                    child: Icon(Icons.person, size: 50, color: Colors.white),
                  ),
                  SizedBox(height: 10),
                  Text(
                    nombreUsuario,
                    style: TextStyle(
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
            Divider(color: Colors.white30, thickness: 1),
            _buildDrawerItem(
              icon: Icons.badge,
              title: 'Empleados',
              onTap: () {
                  Navigator.push(
                  context,
                  MaterialPageRoute(
                      builder: (context) => const AdminPage()),
                );
              },
            ),
            _buildDrawerItem(
              icon: Icons.inventory,
              title: 'Inventario',
              onTap: () {
                Navigator.push(
                  context,
                  MaterialPageRoute(
                      builder: (context) => const AdminInventarioPage()),
                );
              },
            ),
            _buildDrawerItem(
              icon: Icons.people,
              title: 'Clientes',
              onTap: () => Navigator.pop(context),
              selected: true,
            ),
            Divider(color: Colors.white30, thickness: 1),
            _buildDrawerItem(
              icon: Icons.manage_accounts,
              title: 'Administrar Clientes',
              onTap: () {   Navigator.push(
                  context,
                  MaterialPageRoute(
                      builder: (context) => const ListaClientes()),
                );},
            ),

            //ListaClientes
            _buildDrawerItem(
              icon: Icons.shopping_cart,
              title: 'Administrar Carritos',
              onTap:() {  Navigator.push(
                  context,
                  MaterialPageRoute(
                      builder: (context) => const ListaCarritos()),
                );
                
              },
            ),
            _buildDrawerItem(
              icon: Icons.point_of_sale,
              title: 'Administrar Ventas',
             onTap:() {  Navigator.push(
                  context,
                  MaterialPageRoute(
                      builder: (context) => const ListaVentas()),
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
        color: selected ? Color(0xFF7E57C2) : Colors.white,
      ),
      title: Text(
        title,
        style: TextStyle(
          color: selected ? Color(0xFF7E57C2) : Colors.white,
          fontWeight: selected ? FontWeight.bold : FontWeight.normal,
        ),
      ),
      tileColor: selected ? Colors.white.withOpacity(0.2) : null,
      onTap: onTap,
    );
  }

  Widget _buildClientesTable() {
    return Card(
      elevation: 3,
      child: Column(
        children: [
          Container(
            padding: EdgeInsets.all(16),
            decoration: BoxDecoration(
              color: Colors.grey[200],
              borderRadius: BorderRadius.vertical(top: Radius.circular(4)),
            ),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Row(
                  children: [
                    Icon(Icons.people, size: 20),
                    SizedBox(width: 8),
                    Text(
                      'Clientes y Compras',
                      style: TextStyle(
                        fontSize: 16,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                  ],
                ),
                ElevatedButton.icon(
                  onPressed: cargarDatos,
                  icon: Icon(Icons.refresh, size: 18),
                  label: Text('Actualizar'),
                  style: ElevatedButton.styleFrom(
                    backgroundColor: Color(0xFF7CBBE4),
                    foregroundColor: Colors.black,
                  ),
                ),
              ],
            ),
          ),
          SingleChildScrollView(
            scrollDirection: Axis.horizontal,
            child: DataTable(
              columns: [
                DataColumn(
                    label: Text('ID',
                        style: TextStyle(fontWeight: FontWeight.bold))),
                DataColumn(
                    label: Text('Cliente',
                        style: TextStyle(fontWeight: FontWeight.bold))),
                DataColumn(
                    label: Text('Correo',
                        style: TextStyle(fontWeight: FontWeight.bold))),
                DataColumn(
                    label: Text('Teléfono',
                        style: TextStyle(fontWeight: FontWeight.bold))),
                DataColumn(
                    label: Text('Compras',
                        style: TextStyle(fontWeight: FontWeight.bold))),
                DataColumn(
                    label: Text('Total Gastado',
                        style: TextStyle(fontWeight: FontWeight.bold))),
                DataColumn(
                    label: Text('Nivel',
                        style: TextStyle(fontWeight: FontWeight.bold))),
                DataColumn(
                    label: Text('Estado',
                        style: TextStyle(fontWeight: FontWeight.bold))),
              ],
              rows: clientes.map((cliente) {
                final nivel = getNivelCliente(cliente['TotalCompras']);
                return DataRow(cells: [
                  DataCell(Text(cliente['ID'].toString())),
                  DataCell(
                    Row(
                      children: [
                        Icon(Icons.person_outline, size: 16),
                        SizedBox(width: 4),
                        Text('${cliente['Nombre']} ${cliente['Apellido']}'),
                      ],
                    ),
                  ),
                  DataCell(
                      Text(cliente['Email'], style: TextStyle(fontSize: 12))),
                  DataCell(Text(cliente['Telefono'])),
                  DataCell(
                    Container(
                      padding: EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                      decoration: BoxDecoration(
                        color: Color(0xFFA8E6CF),
                        borderRadius: BorderRadius.circular(5),
                      ),
                      child: Text(
                        cliente['TotalCompras'].toString(),
                        style: TextStyle(fontWeight: FontWeight.bold),
                      ),
                    ),
                  ),
                  DataCell(
                    Text(
                      formatearPrecio(cliente['TotalGastado']),
                      style: TextStyle(fontWeight: FontWeight.bold),
                    ),
                  ),
                  DataCell(
                    Chip(
                      avatar:
                          Icon(nivel['icono'], size: 16, color: Colors.white),
                      label: Text(
                        nivel['nivel'],
                        style: TextStyle(color: Colors.white, fontSize: 12),
                      ),
                      backgroundColor: nivel['color'],
                    ),
                  ),
                  DataCell(
                    Chip(
                      label: Text(
                        cliente['Estado'],
                        style: TextStyle(color: Colors.white, fontSize: 12),
                      ),
                      backgroundColor: cliente['Estado'] == 'Activo'
                          ? Colors.green
                          : cliente['Estado'] == 'Inactivo'
                              ? Colors.red
                              : Colors.amber,
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

  Widget _buildEstadisticas() {
    if (estadisticas == null || estadisticas!['porEstado'] == null) {
      return Card(
        elevation: 3,
        child: Padding(
          padding: EdgeInsets.all(16),
          child: Text('No hay estadísticas disponibles'),
        ),
      );
    }

    final porEstado = estadisticas!['porEstado'] as List;

    return Card(
      elevation: 3,
      child: Padding(
        padding: EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              children: [
                Icon(Icons.bar_chart, size: 20),
                SizedBox(width: 8),
                Text(
                  'Estado de Clientes',
                  style: TextStyle(
                    fontSize: 16,
                    fontWeight: FontWeight.bold,
                  ),
                ),
              ],
            ),
            SizedBox(height: 16),
            // Gráfico de donut
            SizedBox(
              height: 200,
              child: PieChart(
                PieChartData(
                  sections: porEstado.map((item) {
                    final estado = item['Estado'];
                    final cantidad = item['Cantidad'];
                    Color color = Colors.grey;

                    if (estado == 'Activo') color = Color(0xFF54E075);
                    if (estado == 'Inactivo') color = Color(0xFFEE5666);
                    if (estado == 'Nuevo') color = Color(0xFFFFD965);

                    return PieChartSectionData(
                      value: cantidad.toDouble(),
                      title: cantidad.toString(),
                      color: color,
                      radius: 50,
                      titleStyle: TextStyle(
                        color: Colors.white,
                        fontWeight: FontWeight.bold,
                      ),
                    );
                  }).toList(),
                  sectionsSpace: 2,
                  centerSpaceRadius: 40,
                ),
              ),
            ),
            SizedBox(height: 16),
            // Leyenda
            ...porEstado.map((item) {
              final estado = item['Estado'];
              final cantidad = item['Cantidad'];
              Color color = Colors.grey;

              if (estado == 'Activo') color = Color(0xFF54E075);
              if (estado == 'Inactivo') color = Color(0xFFEE5666);
              if (estado == 'Nuevo') color = Color(0xFFFFD965);

              return Container(
                margin: EdgeInsets.only(bottom: 8),
                padding: EdgeInsets.all(8),
                decoration: BoxDecoration(
                  color: Color(0xFFE2E7E7),
                  borderRadius: BorderRadius.circular(5),
                ),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Row(
                      children: [
                        Container(
                          width: 12,
                          height: 12,
                          decoration: BoxDecoration(
                            color: color,
                            shape: BoxShape.circle,
                          ),
                        ),
                        SizedBox(width: 8),
                        Text(estado, style: TextStyle(fontSize: 12)),
                      ],
                    ),
                    Chip(
                      label: Text(
                        cantidad.toString(),
                        style: TextStyle(fontSize: 12, color: Colors.white),
                      ),
                      backgroundColor: Colors.grey[600],
                      padding: EdgeInsets.all(0),
                    ),
                  ],
                ),
              );
            }).toList(),
          ],
        ),
      ),
    );
  }

  Widget _buildTopClientes() {
    return Card(
      elevation: 3,
      child: Padding(
        padding: EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              children: [
                Icon(Icons.emoji_events, size: 20, color: Colors.amber),
                SizedBox(width: 8),
                Text(
                  'Top 5 Mejores Clientes',
                  style: TextStyle(
                    fontSize: 16,
                    fontWeight: FontWeight.bold,
                  ),
                ),
              ],
            ),
            SizedBox(height: 16),
            ...topClientes.asMap().entries.map((entry) {
              final index = entry.key;
              final cliente = entry.value;
              final nivel = getNivelCliente(cliente['TotalCompras']);

              IconData trofeo = Icons.emoji_events;
              Color colorTrofeo = Colors.grey;

              if (index == 0) {
                trofeo = Icons.emoji_events;
                colorTrofeo = Colors.amber;
              } else if (index == 1) {
                trofeo = Icons.military_tech;
                colorTrofeo = Colors.grey[400]!;
              } else if (index == 2) {
                trofeo = Icons.military_tech;
                colorTrofeo = Colors.brown[300]!;
              }

              return Card(
                margin: EdgeInsets.only(bottom: 12),
                child: ListTile(
                  leading: CircleAvatar(
                    backgroundColor: colorTrofeo.withOpacity(0.2),
                    child: Icon(trofeo, color: colorTrofeo, size: 20),
                  ),
                  title: Row(
                    children: [
                      if (index < 3) Icon(trofeo, size: 16, color: colorTrofeo),
                      if (index < 3) SizedBox(width: 4),
                      Expanded(
                        child: Text(
                          '${cliente['Nombre']} ${cliente['Apellido']}',
                          style: TextStyle(
                            fontSize: 14,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                      ),
                    ],
                  ),
                  subtitle: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        cliente['Email'],
                        style: TextStyle(fontSize: 11),
                      ),
                      SizedBox(height: 4),
                      Wrap(
                        spacing: 4,
                        children: [
                          Chip(
                            label: Text(
                              '${cliente['TotalCompras']} compras',
                              style:
                                  TextStyle(fontSize: 10, color: Colors.white),
                            ),
                            backgroundColor: Colors.green,
                            padding: EdgeInsets.all(0),
                            materialTapTargetSize:
                                MaterialTapTargetSize.shrinkWrap,
                          ),
                          Chip(
                            label: Text(
                              nivel['nivel'],
                              style:
                                  TextStyle(fontSize: 10, color: Colors.white),
                            ),
                            backgroundColor: nivel['color'],
                            padding: EdgeInsets.all(0),
                            materialTapTargetSize:
                                MaterialTapTargetSize.shrinkWrap,
                          ),
                        ],
                      ),
                    ],
                  ),
                  trailing: Text(
                    formatearPrecio(cliente['TotalGastado']),
                    style: TextStyle(
                      fontWeight: FontWeight.bold,
                      color: Colors.blue,
                    ),
                  ),
                ),
              );
            }).toList(),
          ],
        ),
      ),
    );
  }

  Widget _buildCalendario() {
    return Card(
      elevation: 3,
      child: Padding(
        padding: EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              children: [
                Icon(Icons.calendar_today, size: 20),
                SizedBox(width: 8),
                Text(
                  'Calendario',
                  style: TextStyle(
                    fontSize: 16,
                    fontWeight: FontWeight.bold,
                  ),
                ),
              ],
            ),
            SizedBox(height: 16),
            TableCalendar(
              firstDay: DateTime.utc(2020, 1, 1),
              lastDay: DateTime.utc(2030, 12, 31),
              focusedDay: _focusedDay,
              selectedDayPredicate: (day) => isSameDay(_selectedDay, day),
              onDaySelected: (selectedDay, focusedDay) {
                setState(() {
                  _selectedDay = selectedDay;
                  _focusedDay = focusedDay;
                });
              },
              calendarFormat: CalendarFormat.month,
              headerStyle: HeaderStyle(
                formatButtonVisible: false,
                titleCentered: true,
              ),
              calendarStyle: CalendarStyle(
                todayDecoration: BoxDecoration(
                  color: Color(0xFF7E57C2),
                  shape: BoxShape.circle,
                ),
                selectedDecoration: BoxDecoration(
                  color: Color(0xFFE6C7F6),
                  shape: BoxShape.circle,
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
