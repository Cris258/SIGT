import 'package:flutter/material.dart';
import '../widgets/header_widget.dart';
import '../widgets/footer_widget.dart';

class ListaCarritos extends StatefulWidget {
  const ListaCarritos({Key? key}) : super(key: key);

  @override
  State<ListaCarritos> createState() => _ListaCarritosState();
}

class _ListaCarritosState extends State<ListaCarritos> {
  List<Map<String, dynamic>> carritos = [];
  Map<int, List<Map<String, dynamic>>> detallesCarrito = {};
  bool loading = false;
  String search = "";
  int? carritoExpandido;

  @override
  void initState() {
    super.initState();
    _cargarCarritosEjemplo();
  }

  // ---------------------- DATOS SIMULADOS -------------------------
  void _cargarCarritosEjemplo() {
    setState(() {
      carritos = [
        {
          "idCarrito": 1,
          "FechaCreacion": DateTime.now().subtract(const Duration(days: 1)),
          "Estado": "Pendiente",
          "Persona": {"Primer_Nombre": "Carlos", "Primer_Apellido": "Pérez"},
        },
        {
          "idCarrito": 2,
          "FechaCreacion": DateTime.now().subtract(const Duration(days: 2)),
          "Estado": "Pagado",
          "Persona": {"Primer_Nombre": "Luisa", "Primer_Apellido": "Gómez"},
        },
        {
          "idCarrito": 3,
          "FechaCreacion": DateTime.now().subtract(const Duration(days: 3)),
          "Estado": "Cancelado",
          "Persona": {"Primer_Nombre": "Marta", "Primer_Apellido": "López"},
        },
      ];
    });
  }

  void _cargarDetallesCarrito(int id) async {
    if (carritoExpandido == id) {
      setState(() => carritoExpandido = null);
      return;
    }

    if (!detallesCarrito.containsKey(id)) {
      await Future.delayed(const Duration(milliseconds: 400));

      detallesCarrito[id] = [
        {
          "NombreProducto": "Teclado Gamer",
          "Cantidad": 1,
          "Precio": 120000,
        },
        {
          "NombreProducto": "Mouse Inalámbrico",
          "Cantidad": 2,
          "Precio": 45000,
        }
      ];
    }

    setState(() {
      carritoExpandido = id;
    });
  }

  String _formatearFecha(DateTime fecha) {
    return "${fecha.day}/${fecha.month}/${fecha.year}";
  }

  List<Map<String, dynamic>> get carritosFiltrados {
    if (search.isEmpty) return carritos;

    String s = search.toLowerCase();
    return carritos.where((c) {
      String nombre = "${c['Persona']['Primer_Nombre']} ${c['Persona']['Primer_Apellido']}".toLowerCase();
      return c["idCarrito"].toString().contains(s) ||
          c["Estado"].toLowerCase().contains(s) ||
          nombre.contains(s);
    }).toList();
  }

  // -------------------------------------------------------------------

  @override
  Widget build(BuildContext context) {
    if (loading) {
      return const Scaffold(
        body: Center(child: CircularProgressIndicator()),
      );
    }

    return Scaffold(
      body: Column(
        children: [
          HeaderWidget(),

          Expanded(
            child: SingleChildScrollView(
              child: Padding(
                padding: const EdgeInsets.all(16),
                child: Column(
                  children: [
                    const Padding(
                      padding: EdgeInsets.symmetric(vertical: 16),
                      child: Text(
                        'Lista de Carritos Registrados',
                        style: TextStyle(
                          fontSize: 24,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                    ),

                    // 🔍 BUSCADOR
                    Container(
                      constraints: const BoxConstraints(maxWidth: 800),
                      child: TextField(
                        decoration: const InputDecoration(
                          labelText: "Buscar",
                          hintText: "Buscar por cliente, estado o ID...",
                          border: OutlineInputBorder(),
                          prefixIcon: Icon(Icons.search),
                        ),
                        onChanged: (value) => setState(() => search = value),
                      ),
                    ),

                    const SizedBox(height: 20),

                    // TABLA
                    _tablaCarritos(),

                    const SizedBox(height: 20),

                    // DETALLES EXPANDIDOS
                    if (carritoExpandido != null)
                      _tablaDetalles(carritoExpandido!),
                  ],
                ),
              ),
            ),
          ),

          FooterWidget(),
        ],
      ),
    );
  }

  // ---------------------- TABLA PRINCIPAL -------------------------
  Widget _tablaCarritos() {
    if (carritosFiltrados.isEmpty) {
      return const Padding(
        padding: EdgeInsets.all(40),
        child: Text(
          'No se encontraron resultados',
          style: TextStyle(fontSize: 16, fontStyle: FontStyle.italic),
        ),
      );
    }

    return Container(
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(12),
      ),
      child: SingleChildScrollView(
        scrollDirection: Axis.horizontal,
        child: DataTable(
          headingRowColor: MaterialStateProperty.all(Colors.black87),
          headingTextStyle: const TextStyle(
            color: Colors.white,
            fontWeight: FontWeight.bold,
          ),
          columns: const [
            DataColumn(label: Text("ID")),
            DataColumn(label: Text("Cliente")),
            DataColumn(label: Text("Fecha")),
            DataColumn(label: Text("Estado")),
            DataColumn(label: Text("Ver Detalles")),
          ],
          rows: carritosFiltrados.map((c) {
            return DataRow(
              cells: [
                DataCell(Text(c['idCarrito'].toString())),
                DataCell(Text("${c['Persona']['Primer_Nombre']} ${c['Persona']['Primer_Apellido']}")),
                DataCell(Text(_formatearFecha(c['FechaCreacion']))),
                DataCell(Text(c['Estado'])),
                DataCell(
                  IconButton(
                    icon: Icon(
                      carritoExpandido == c["idCarrito"]
                          ? Icons.visibility_off
                          : Icons.visibility,
                      color: Colors.blue,
                    ),
                    onPressed: () => _cargarDetallesCarrito(c["idCarrito"]),
                  ),
                ),
              ],
            );
          }).toList(),
        ),
      ),
    );
  }

  // ---------------------- TABLA DE DETALLES -------------------------
  Widget _tablaDetalles(int idCarrito) {
    final detalles = detallesCarrito[idCarrito] ?? [];

    return Container(
      padding: const EdgeInsets.all(16),
      margin: const EdgeInsets.only(top: 10),
      decoration: BoxDecoration(
        color: Colors.grey.shade100,
        borderRadius: BorderRadius.circular(12),
      ),
      child: Column(
        children: [
          const Text(
            "Productos del Carrito",
            style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
          ),
          const SizedBox(height: 10),

          SingleChildScrollView(
            scrollDirection: Axis.horizontal,
            child: DataTable(
              columns: const [
                DataColumn(label: Text("Producto")),
                DataColumn(label: Text("Cantidad")),
                DataColumn(label: Text("Precio")),
              ],
              rows: detalles.map((d) {
                return DataRow(
                  cells: [
                    DataCell(Text(d["NombreProducto"])),
                    DataCell(Text("x${d["Cantidad"]}")),
                    DataCell(Text("\$${d["Precio"]}")),
                  ],
                );
              }).toList(),
            ),
          ),
        ],
      ),
    );
  }
}
