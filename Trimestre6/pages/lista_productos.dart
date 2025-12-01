import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import '../widgets/header_widget.dart';
import '../widgets/footer_line.dart';
import '../widgets/widgetsAdmin/modal_editar_producto.dart';
import '../widgets/widgetsAdmin/modal_eliminar_producto.dart';

class ListaProductos extends StatefulWidget {
  const ListaProductos({Key? key}) : super(key: key);

  @override
  State<ListaProductos> createState() => _ListaProductosState();
}

class _ListaProductosState extends State<ListaProductos> {
  List<Map<String, dynamic>> productos = [];
  bool loading = true;
  String search = "";
  final TextEditingController searchController = TextEditingController();

  // Mapa de colores
  final Map<String, Color> colorMap = {
    'rojo': Color(0xFFFF0000),
    'azul': Color(0xFF0000FF),
    'verde': Color(0xFF00FF00),
    'amarillo': Color(0xFFFFFF00),
    'negro': Color(0xFF000000),
    'blanco': Color(0xFFFFFFFF),
    'gris': Color(0xFF808080),
    'rosa': Color(0xFFFFC0CB),
    'morado': Color(0xFF800080),
    'naranja': Color(0xFFFFA500),
    'cafe': Color(0xFF8B4513),
    'café': Color(0xFF8B4513),
    'beige': Color(0xFFF5F5DC),
    'celeste': Color(0xFF87CEEB),
    'turquesa': Color(0xFF40E0D0),
    'violeta': Color(0xFFEE82EE),
    'fucsia': Color(0xFFFF00FF),
    'marino': Color(0xFF000080),
    'vino': Color(0xFF722F37),
    'crema': Color(0xFFFFFDD0),
  };

  @override
  void initState() {
    super.initState();
    cargarProductosSimulados();
  }

  @override
  void dispose() {
    searchController.dispose();
    super.dispose();
  }

  Color getColorCode(String? colorName) {
    if (colorName == null || colorName.isEmpty) {
      return Color(0xFFCCCCCC);
    }
    final color = colorName.toLowerCase().trim();
    return colorMap[color] ?? Color(0xFFCCCCCC);
  }

  // Simular carga de datos
  Future<void> cargarProductosSimulados() async {
    // Simular delay de red
    await Future.delayed(Duration(seconds: 1));

    setState(() {
      productos = [
        {
          'idProducto': 1,
          'NombreProducto': 'Camiseta Básica',
          'Color': 'Blanco',
          'Talla': 'M',
          'Stock': 25,
          'Precio': 35000.0,
        },
        {
          'idProducto': 2,
          'NombreProducto': 'Pantalón Jean',
          'Color': 'Azul',
          'Talla': 'L',
          'Stock': 15,
          'Precio': 89000.0,
        },
        {
          'idProducto': 3,
          'NombreProducto': 'Sudadera Con Capucha',
          'Color': 'Negro',
          'Talla': 'XL',
          'Stock': 8,
          'Precio': 125000.0,
        },
        {
          'idProducto': 4,
          'NombreProducto': 'Vestido Floral',
          'Color': 'Rosa',
          'Talla': 'S',
          'Stock': 12,
          'Precio': 98000.0,
        },
        {
          'idProducto': 5,
          'NombreProducto': 'Chaqueta Denim',
          'Color': 'Azul',
          'Talla': 'M',
          'Stock': 6,
          'Precio': 145000.0,
        },
        {
          'idProducto': 6,
          'NombreProducto': 'Blusa Manga Larga',
          'Color': 'Blanco',
          'Talla': 'S',
          'Stock': 20,
          'Precio': 45000.0,
        },
        {
          'idProducto': 7,
          'NombreProducto': 'Short Deportivo',
          'Color': 'Negro',
          'Talla': 'M',
          'Stock': 3,
          'Precio': 42000.0,
        },
        {
          'idProducto': 8,
          'NombreProducto': 'Falda Plisada',
          'Color': 'Gris',
          'Talla': 'M',
          'Stock': 18,
          'Precio': 67000.0,
        },
        {
          'idProducto': 9,
          'NombreProducto': 'Camisa Formal',
          'Color': 'Celeste',
          'Talla': 'L',
          'Stock': 14,
          'Precio': 78000.0,
        },
        {
          'idProducto': 10,
          'NombreProducto': 'Suéter Tejido',
          'Color': 'Beige',
          'Talla': 'XL',
          'Stock': 9,
          'Precio': 112000.0,
        },
      ];
      loading = false;
    });
  }

  void abrirModalEditar(Map<String, dynamic> producto) {
    showDialog(
      context: context,
      barrierDismissible: false,
      builder: (context) => ModalEditarProducto(
        producto: producto,
        onClose: () => Navigator.of(context).pop(),
        onGuardar: (productoActualizado) {
          setState(() {
            final index = productos.indexWhere(
                (p) => p['idProducto'] == productoActualizado['idProducto']);
            if (index != -1) {
              productos[index] = productoActualizado;
            }
          });
          Navigator.of(context).pop();
        },
      ),
    );
  }

  void abrirModalEliminar(Map<String, dynamic> producto) {
    showDialog(
      context: context,
      barrierDismissible: false,
      builder: (context) => ModalEliminarProducto(
        producto: producto,
        onClose: () => Navigator.of(context).pop(),
        onConfirmar: (productoEliminado) {
          setState(() {
            productos.removeWhere(
                (p) => p['idProducto'] == productoEliminado['idProducto']);
          });
          Navigator.of(context).pop();
        },
      ),
    );
  }

  List<Map<String, dynamic>> get productosFiltrados {
    if (search.isEmpty) return productos;

    return productos.where((p) {
      final searchLower = search.toLowerCase();
      return (p['idProducto']?.toString() ?? '')
              .toLowerCase()
              .contains(searchLower) ||
          (p['NombreProducto']?.toString() ?? '')
              .toLowerCase()
              .contains(searchLower) ||
          (p['Color']?.toString() ?? '').toLowerCase().contains(searchLower) ||
          (p['Talla']?.toString() ?? '').toLowerCase().contains(searchLower) ||
          (p['Stock']?.toString() ?? '').toLowerCase().contains(searchLower) ||
          (p['Precio']?.toString() ?? '').toLowerCase().contains(searchLower);
    }).toList();
  }

  String formatearPrecio(dynamic precio) {
    final formatter = NumberFormat.currency(
      locale: 'es_CO',
      symbol: '\$',
      decimalDigits: 0,
    );
    return formatter.format(precio ?? 0);
  }

  Color getStockColor(int stock) {
    if (stock > 10) return Colors.green;
    if (stock > 5) return Colors.orange;
    return Colors.red;
  }

  @override
  Widget build(BuildContext context) {
    if (loading) {
      return Scaffold(
        body: Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              CircularProgressIndicator(),
              SizedBox(height: 16),
              Text('Cargando productos...'),
            ],
          ),
        ),
      );
    }

    return Scaffold(
      
      body: Column(
        children: [
          HeaderWidget(),
          Expanded(
            child: SingleChildScrollView(
              padding: EdgeInsets.all(16),
              child: Column(
                children: [
                  Text(
                    'Lista de Productos Registrados',
                    style: TextStyle(
                      fontSize: 24,
                      fontWeight: FontWeight.bold,
                      fontFamily: 'Merriweather',
                    ),
                    textAlign: TextAlign.center,
                  ),
                  SizedBox(height: 24),
                  // Buscador
                  ConstrainedBox(
                    constraints: BoxConstraints(maxWidth: 600),
                    child: TextField(
                      controller: searchController,
                      decoration: InputDecoration(
                        hintText: 'Buscar por nombre, color, talla, precio...',
                        prefixIcon: Icon(Icons.search),
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
                  SizedBox(height: 24),
                  // Tabla
                  SingleChildScrollView(
                    scrollDirection: Axis.horizontal,
                    child: DataTable(
                      headingRowColor:
                          MaterialStateProperty.all(Colors.grey[800]),
                      border: TableBorder.all(color: Colors.grey[300]!),
                      columns: [
                        DataColumn(
                          label: Text('ID',
                              style: TextStyle(
                                  color: Colors.white,
                                  fontWeight: FontWeight.bold)),
                        ),
                        DataColumn(
                          label: Text('Nombre Producto',
                              style: TextStyle(
                                  color: Colors.white,
                                  fontWeight: FontWeight.bold)),
                        ),
                        DataColumn(
                          label: Text('Color',
                              style: TextStyle(
                                  color: Colors.white,
                                  fontWeight: FontWeight.bold)),
                        ),
                        DataColumn(
                          label: Text('Talla',
                              style: TextStyle(
                                  color: Colors.white,
                                  fontWeight: FontWeight.bold)),
                        ),
                        DataColumn(
                          label: Text('Stock',
                              style: TextStyle(
                                  color: Colors.white,
                                  fontWeight: FontWeight.bold)),
                        ),
                        DataColumn(
                          label: Text('Precio',
                              style: TextStyle(
                                  color: Colors.white,
                                  fontWeight: FontWeight.bold)),
                        ),
                        DataColumn(
                          label: Text('Modificar',
                              style: TextStyle(
                                  color: Colors.white,
                                  fontWeight: FontWeight.bold)),
                        ),
                        DataColumn(
                          label: Text('Eliminar',
                              style: TextStyle(
                                  color: Colors.white,
                                  fontWeight: FontWeight.bold)),
                        ),
                      ],
                      rows: productosFiltrados.isEmpty
                          ? [
                              DataRow(cells: [
                                DataCell(
                                  Container(
                                    padding: EdgeInsets.all(16),
                                    child: Text(
                                      search.isNotEmpty
                                          ? 'No se encontraron resultados'
                                          : 'No hay productos registrados',
                                      textAlign: TextAlign.center,
                                    ),
                                  ),
                                ),
                                DataCell(Text('')),
                                DataCell(Text('')),
                                DataCell(Text('')),
                                DataCell(Text('')),
                                DataCell(Text('')),
                                DataCell(Text('')),
                                DataCell(Text('')),
                              ])
                            ]
                          : productosFiltrados.map((p) {
                              return DataRow(cells: [
                                DataCell(
                                    Text(p['idProducto']?.toString() ?? '')),
                                DataCell(Text(p['NombreProducto'] ?? '')),
                                DataCell(
                                  Row(
                                    children: [
                                      Container(
                                        width: 24,
                                        height: 24,
                                        decoration: BoxDecoration(
                                          shape: BoxShape.circle,
                                          color: getColorCode(p['Color']),
                                          border: Border.all(
                                              color: Colors.grey[300]!,
                                              width: 2),
                                          boxShadow: [
                                            BoxShadow(
                                              color: Colors.black12,
                                              blurRadius: 4,
                                              offset: Offset(0, 2),
                                            ),
                                          ],
                                        ),
                                      ),
                                      SizedBox(width: 8),
                                      Text(
                                        p['Color'] ?? '',
                                        style: TextStyle(
                                          fontSize: 12,
                                          color: Colors.grey[600],
                                        ),
                                      ),
                                    ],
                                  ),
                                ),
                                DataCell(
                                  Chip(
                                    label: Text(p['Talla'] ?? ''),
                                    backgroundColor: Colors.grey[600],
                                    labelStyle: TextStyle(color: Colors.white),
                                  ),
                                ),
                                DataCell(
                                  Chip(
                                    label: Text(p['Stock']?.toString() ?? '0'),
                                    backgroundColor:
                                        getStockColor(p['Stock'] ?? 0),
                                    labelStyle: TextStyle(color: Colors.white),
                                  ),
                                ),
                                DataCell(Text(formatearPrecio(p['Precio']))),
                                DataCell(
                                  IconButton(
                                    icon: Icon(Icons.edit, color: Colors.blue),
                                    onPressed: () => abrirModalEditar(p),
                                  ),
                                ),
                                DataCell(
                                  IconButton(
                                    icon: Icon(Icons.delete, color: Colors.red),
                                    onPressed: () => abrirModalEliminar(p),
                                  ),
                                ),
                              ]);
                            }).toList(),
                    ),
                  ),
                ],
              ),
            ),
          ),
          FooterLine(),
        ],
      ),
    );
  }
}
