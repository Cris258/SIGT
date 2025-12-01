import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import '../widgets/footer_widget.dart';
import '../widgets/header_widget.dart';

class ListaVentas extends StatefulWidget {
  const ListaVentas({Key? key}) : super(key: key);

  @override
  State<ListaVentas> createState() => _ListaVentasState();
}

class _ListaVentasState extends State<ListaVentas> {
  List<Map<String, dynamic>> ventas = [];
  bool loading = true;
  String search = "";
  int? ventaExpandida;
  Map<int, List<Map<String, dynamic>>> detallesVenta = {};

  @override
  void initState() {
    super.initState();
    cargarVentas();
  }

  void cargarVentas() {
    // Simulando datos de ventas
    Future.delayed(const Duration(seconds: 1), () {
      setState(() {
        ventas = [
          {
            'idVenta': 1,
            'Fecha': DateTime.now().subtract(const Duration(days: 5)),
            'Total': 350000,
            'Persona_FK': 1,
            'Persona': {
              'Primer_Nombre': 'Juan',
              'Primer_Apellido': 'Pérez',
            },
          },
          {
            'idVenta': 2,
            'Fecha': DateTime.now().subtract(const Duration(days: 3)),
            'Total': 520000,
            'Persona_FK': 2,
            'Persona': {
              'Primer_Nombre': 'María',
              'Primer_Apellido': 'López',
            },
          },
          {
            'idVenta': 3,
            'Fecha': DateTime.now().subtract(const Duration(days: 1)),
            'Total': 180000,
            'Persona_FK': 3,
            'Persona': {
              'Primer_Nombre': 'Pedro',
              'Primer_Apellido': 'Martínez',
            },
          },
          {
            'idVenta': 4,
            'Fecha': DateTime.now(),
            'Total': 890000,
            'Persona_FK': 4,
            'Persona': {
              'Primer_Nombre': 'Ana',
              'Primer_Apellido': 'Hernández',
            },
          },
        ];
        loading = false;
      });
    });
  }

  void cargarDetallesVenta(int idVenta) {
    if (detallesVenta.containsKey(idVenta)) {
      setState(() {
        ventaExpandida = ventaExpandida == idVenta ? null : idVenta;
      });
      return;
    }

    // Simulando detalles de venta
    Map<int, List<Map<String, dynamic>>> detallesSimulados = {
      1: [
        {
          'idDetalleVenta': 1,
          'Producto_FK': 101,
          'Cantidad': 2,
          'PrecioUnitario': 125000,
          'Producto': {'NombreProducto': 'Laptop HP'},
        },
        {
          'idDetalleVenta': 2,
          'Producto_FK': 102,
          'Cantidad': 1,
          'PrecioUnitario': 100000,
          'Producto': {'NombreProducto': 'Mouse Inalámbrico'},
        },
      ],
      2: [
        {
          'idDetalleVenta': 3,
          'Producto_FK': 103,
          'Cantidad': 1,
          'PrecioUnitario': 320000,
          'Producto': {'NombreProducto': 'Monitor Samsung 27"'},
        },
        {
          'idDetalleVenta': 4,
          'Producto_FK': 104,
          'Cantidad': 2,
          'PrecioUnitario': 100000,
          'Producto': {'NombreProducto': 'Teclado Mecánico'},
        },
      ],
      3: [
        {
          'idDetalleVenta': 5,
          'Producto_FK': 105,
          'Cantidad': 3,
          'PrecioUnitario': 60000,
          'Producto': {'NombreProducto': 'Cable HDMI'},
        },
      ],
      4: [
        {
          'idDetalleVenta': 6,
          'Producto_FK': 106,
          'Cantidad': 1,
          'PrecioUnitario': 650000,
          'Producto': {'NombreProducto': 'iPhone 13'},
        },
        {
          'idDetalleVenta': 7,
          'Producto_FK': 107,
          'Cantidad': 2,
          'PrecioUnitario': 120000,
          'Producto': {'NombreProducto': 'Audífonos Bluetooth'},
        },
      ],
    };

    Future.delayed(const Duration(milliseconds: 500), () {
      setState(() {
        detallesVenta[idVenta] = detallesSimulados[idVenta] ?? [];
        ventaExpandida = idVenta;
      });
    });
  }

  String formatearFecha(DateTime fecha) {
    return DateFormat('MMM dd, yyyy - HH:mm', 'es_CO').format(fecha);
  }

  String formatearPrecio(num precio) {
    final formatter = NumberFormat.currency(
      locale: 'es_CO',
      symbol: '\$',
      decimalDigits: 0,
    );
    return formatter.format(precio);
  }

  List<Map<String, dynamic>> get ventasFiltradas {
    if (search.isEmpty) return ventas;

    return ventas.where((v) {
      String searchLower = search.toLowerCase();
      String nombreCliente = v['Persona'] != null
          ? '${v['Persona']['Primer_Nombre']} ${v['Persona']['Primer_Apellido']}'
              .toLowerCase()
          : '';

      return (v['idVenta']?.toString() ?? '')
              .toLowerCase()
              .contains(searchLower) ||
          (v['Total']?.toString() ?? '').toLowerCase().contains(searchLower) ||
          nombreCliente.contains(searchLower);
    }).toList();
  }

  @override
  Widget build(BuildContext context) {
    if (loading) {
      return const Scaffold(
        body: Center(
          child: CircularProgressIndicator(),
        ),
      );
    }

    return Scaffold(
      body: Column(
        children: [
          const HeaderWidget(),
          Expanded(
            child: SingleChildScrollView(
              padding: const EdgeInsets.all(20),
              child: Column(
                children: [
                  const SizedBox(height: 20),
                  const Text(
                    'Lista de Ventas Registradas',
                    style: TextStyle(
                      fontSize: 24,
                      fontWeight: FontWeight.bold,
                      fontFamily: 'Merriweather',
                    ),
                    textAlign: TextAlign.center,
                  ),
                  const SizedBox(height: 20),
                  // Buscador
                  Container(
                    constraints: const BoxConstraints(maxWidth: 500),
                    child: TextField(
                      decoration: InputDecoration(
                        hintText: 'Buscar por ID, total, cliente...',
                        prefixIcon: const Icon(Icons.search),
                        border: OutlineInputBorder(
                          borderRadius: BorderRadius.circular(8),
                        ),
                      ),
                      onChanged: (value) {
                        setState(() {
                          search = value;
                        });
                      },
                    ),
                  ),
                  const SizedBox(height: 20),
                  // Tabla de ventas
                  _buildTablaVentas(),
                ],
              ),
            ),
          ),
           FooterWidget(),
        ],
      ),
    );
  }

  Widget _buildTablaVentas() {
    return SingleChildScrollView(
      scrollDirection: Axis.horizontal,
      child: Column(
        children: [
          DataTable(
            headingRowColor: MaterialStateProperty.all(Colors.black87),
            headingTextStyle: const TextStyle(
              color: Colors.white,
              fontWeight: FontWeight.bold,
            ),
            border: TableBorder.all(color: Colors.grey.shade300),
            columns: const [
              DataColumn(label: Text('ID Venta')),
              DataColumn(label: Text('Fecha')),
              DataColumn(label: Text('Total')),
              DataColumn(label: Text('Cliente')),
              DataColumn(label: Text('Ver Detalles')),
            ],
            rows: ventasFiltradas.isNotEmpty
                ? ventasFiltradas.map((v) {
                    return DataRow(cells: [
                      DataCell(Text(v['idVenta'].toString())),
                      DataCell(Text(formatearFecha(v['Fecha']))),
                      DataCell(
                        Container(
                          padding: const EdgeInsets.symmetric(
                            horizontal: 12,
                            vertical: 6,
                          ),
                          decoration: BoxDecoration(
                            color: Colors.green,
                            borderRadius: BorderRadius.circular(12),
                          ),
                          child: Text(
                            formatearPrecio(v['Total']),
                            style: const TextStyle(
                              color: Colors.white,
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                        ),
                      ),
                      DataCell(
                        Text(
                          v['Persona'] != null
                              ? '${v['Persona']['Primer_Nombre']} ${v['Persona']['Primer_Apellido']}'
                              : 'Cliente no disponible',
                        ),
                      ),
                      DataCell(
                        IconButton(
                          icon: Icon(
                            ventaExpandida == v['idVenta']
                                ? Icons.visibility_off
                                : Icons.visibility,
                            color: Colors.blue,
                          ),
                          onPressed: () => cargarDetallesVenta(v['idVenta']),
                        ),
                      ),
                    ]);
                  }).toList()
                : [
                    DataRow(cells: [
                      DataCell(
                        Container(
                          alignment: Alignment.center,
                          child: Text(
                            search.isNotEmpty
                                ? 'No se encontraron resultados'
                                : 'No hay ventas registradas',
                            textAlign: TextAlign.center,
                          ),
                        ),
                      ),
                      const DataCell(Text('')),
                      const DataCell(Text('')),
                      const DataCell(Text('')),
                      const DataCell(Text('')),
                    ]),
                  ],
          ),
          // Detalles expandidos
          ...ventasFiltradas.where((v) => ventaExpandida == v['idVenta']).map(
                (v) => _buildDetallesVenta(v),
              ),
        ],
      ),
    );
  }

  Widget _buildDetallesVenta(Map<String, dynamic> venta) {
    final detalles = detallesVenta[venta['idVenta']] ?? [];

    if (detalles.isEmpty) {
      return const Padding(
        padding: EdgeInsets.all(20),
        child: CircularProgressIndicator(),
      );
    }

    return Container(
      width: MediaQuery.of(context).size.width * 0.9,
      margin: const EdgeInsets.symmetric(vertical: 10),
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        color: Colors.grey.shade100,
        borderRadius: BorderRadius.circular(8),
        border: Border.all(color: Colors.grey.shade300),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            'Detalles de la Venta #${venta['idVenta']}',
            style: const TextStyle(
              fontSize: 18,
              fontWeight: FontWeight.bold,
            ),
          ),
          const SizedBox(height: 15),
          SingleChildScrollView(
            scrollDirection: Axis.horizontal,
            child: DataTable(
              headingRowColor: MaterialStateProperty.all(Colors.grey.shade300),
              border: TableBorder.all(color: Colors.grey.shade400),
              columns: const [
                DataColumn(label: Text('ID Producto')),
                DataColumn(label: Text('Nombre Producto')),
                DataColumn(label: Text('Cantidad')),
                DataColumn(label: Text('Precio Unitario')),
                DataColumn(label: Text('Subtotal')),
              ],
              rows: [
                ...detalles.map((detalle) {
                  double subtotal =
                      detalle['Cantidad'] * detalle['PrecioUnitario'];
                  return DataRow(cells: [
                    DataCell(Text(detalle['Producto_FK'].toString())),
                    DataCell(
                      Text(
                        detalle['Producto']?['NombreProducto'] ??
                            'Producto no disponible',
                      ),
                    ),
                    DataCell(Text(detalle['Cantidad'].toString())),
                    DataCell(Text(formatearPrecio(detalle['PrecioUnitario']))),
                    DataCell(
                      Text(
                        formatearPrecio(subtotal),
                        style: const TextStyle(fontWeight: FontWeight.bold),
                      ),
                    ),
                  ]);
                }).toList(),
                // Fila de Total
                DataRow(
                  color: MaterialStateProperty.all(Colors.black87),
                  cells: [
                    const DataCell(Text('')),
                    const DataCell(Text('')),
                    const DataCell(Text('')),
                    const DataCell(
                      Text(
                        'Total:',
                        style: TextStyle(
                          color: Colors.white,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                    ),
                    DataCell(
                      Text(
                        formatearPrecio(venta['Total']),
                        style: const TextStyle(
                          color: Colors.white,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                    ),
                  ],
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}