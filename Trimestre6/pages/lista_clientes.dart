import 'package:flutter/material.dart';
import '../widgets/widgetsAdmin/modal_editar_usuario.dart';
import '../widgets/widgetsAdmin/modal_eliminar_usuario.dart';
import '../widgets/footer_widget.dart';
import '../widgets/header_widget.dart';

class ListaClientes extends StatefulWidget {
  const ListaClientes({Key? key}) : super(key: key);

  @override
  State<ListaClientes> createState() => _ListaClientesState();
}

class _ListaClientesState extends State<ListaClientes> {
  List<Map<String, dynamic>> clientes = [];
  bool loading = false;
  String search = "";

  @override
  void initState() {
    super.initState();
    _cargarDatosEjemplo();
  }

  // Datos simulados igual que en el React original
  void _cargarDatosEjemplo() {
    setState(() {
      clientes = [
        {
          'idPersona': 1,
          'NumeroDocumento': '1234567890',
          'TipoDocumento': 'CC',
          'Primer_Nombre': 'Juan',
          'Segundo_Nombre': 'Esteban',
          'Primer_Apellido': 'García',
          'Segundo_Apellido': 'López',
          'Rol': {'NombreRol': 'Cliente'},
          'Telefono': '3124567890',
          'Correo': 'juan.garcia@example.com',
          'EstadoPersona_FK': 1,
        },
        {
          'idPersona': 2,
          'NumeroDocumento': '9876543210',
          'TipoDocumento': 'CE',
          'Primer_Nombre': 'María',
          'Segundo_Nombre': 'Fernanda',
          'Primer_Apellido': 'Pérez',
          'Segundo_Apellido': 'Ortiz',
          'Rol': {'NombreRol': 'Cliente'},
          'Telefono': '3109876543',
          'Correo': 'maria.fernanda@example.com',
          'EstadoPersona_FK': 1,
        },
        {
          'idPersona': 3,
          'NumeroDocumento': '4567891230',
          'TipoDocumento': 'CC',
          'Primer_Nombre': 'Carlos',
          'Segundo_Nombre': '',
          'Primer_Apellido': 'Ramírez',
          'Segundo_Apellido': 'Torres',
          'Rol': {'NombreRol': 'Cliente'},
          'Telefono': '3156782345',
          'Correo': 'carlos.ramirez@example.com',
          'EstadoPersona_FK': 2,
        },
      ];
    });
  }

  // Abrir modal de edición
  void abrirModalEditar(Map<String, dynamic> cliente) {
    showDialog(
      context: context,
      builder: (context) => ModalEditarUsuario(
        usuario: cliente,
        onGuardar: (clienteActualizado) {
          setState(() {
            int index = clientes.indexWhere(
              (c) => c['idPersona'] == clienteActualizado['idPersona'],
            );
            if (index != -1) {
              clientes[index] = clienteActualizado;
            }
          });
        },
      ),
    );
  }

  // Abrir modal eliminar
  void abrirModalEliminar(Map<String, dynamic> cliente) {
    showDialog(
      context: context,
      builder: (context) => ModalEliminar(
        usuario: cliente,
        tipoUsuario: "cliente",
        onConfirmar: () {
          setState(() {
            clientes.removeWhere(
              (c) => c['idPersona'] == cliente['idPersona'],
            );
          });
        },
      ),
    );
  }

  List<Map<String, dynamic>> get clientesFiltrados {
    if (search.isEmpty) return clientes;

    String s = search.toLowerCase();

    return clientes.where((c) {
      return (c['NumeroDocumento'] ?? '').toString().toLowerCase().contains(s) ||
          (c['TipoDocumento'] ?? '').toLowerCase().contains(s) ||
          (c['Primer_Nombre'] ?? '').toLowerCase().contains(s) ||
          (c['Segundo_Nombre'] ?? '').toLowerCase().contains(s) ||
          (c['Primer_Apellido'] ?? '').toLowerCase().contains(s) ||
          (c['Segundo_Apellido'] ?? '').toLowerCase().contains(s) ||
          (c['Telefono'] ?? '').toLowerCase().contains(s) ||
          (c['Correo'] ?? '').toLowerCase().contains(s);
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
                        'Lista de Clientes Registrados',
                        style: TextStyle(
                          fontSize: 24,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                    ),

                    // 🔍 Buscador
                    Container(
                      constraints: const BoxConstraints(maxWidth: 800),
                      child: TextField(
                        decoration: InputDecoration(
                          labelText: "Buscar",
                          hintText: "Buscar por nombre, correo, documento...",
                          border: OutlineInputBorder(),
                          prefixIcon: const Icon(Icons.search),
                        ),
                        onChanged: (value) => setState(() => search = value),
                      ),
                    ),

                    const SizedBox(height: 20),

                    // TABLA
                    _tablaClientes(),
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

  Widget _tablaClientes() {
    if (clientesFiltrados.isEmpty) {
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
      child: Scrollbar(
        thumbVisibility: true,
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
              DataColumn(label: Text("N° Documento")),
              DataColumn(label: Text("Tipo Doc")),
              DataColumn(label: Text("Primer Nombre")),
              DataColumn(label: Text("Segundo Nombre")),
              DataColumn(label: Text("Primer Apellido")),
              DataColumn(label: Text("Segundo Apellido")),
              DataColumn(label: Text("Rol")),
              DataColumn(label: Text("Teléfono")),
              DataColumn(label: Text("Correo")),
              DataColumn(label: Text("Estado")),
              DataColumn(label: Text("Modificar")),
              DataColumn(label: Text("Eliminar")),
            ],
            rows: clientesFiltrados.map((c) {
              return DataRow(
                cells: [
                  DataCell(Text(c['idPersona'].toString())),
                  DataCell(Text(c['NumeroDocumento'] ?? "")),
                  DataCell(Text(c['TipoDocumento'] ?? "")),
                  DataCell(Text(c['Primer_Nombre'] ?? "")),
                  DataCell(Text(c['Segundo_Nombre'] ?? "")),
                  DataCell(Text(c['Primer_Apellido'] ?? "")),
                  DataCell(Text(c['Segundo_Apellido'] ?? "")),
                  DataCell(Text(c['Rol']?['NombreRol'] ?? 'Sin rol')),
                  DataCell(Text(c['Telefono'] ?? "")),
                  DataCell(Text(c['Correo'] ?? "")),
                  DataCell(
                    Container(
                      padding: const EdgeInsets.symmetric(
                        horizontal: 12,
                        vertical: 6,
                      ),
                      decoration: BoxDecoration(
                        color: c['EstadoPersona_FK'] == 1
                            ? Colors.green
                            : Colors.red,
                        borderRadius: BorderRadius.circular(10),
                      ),
                      child: Text(
                        c['EstadoPersona_FK'] == 1 ? "Activo" : "Inactivo",
                        style: const TextStyle(color: Colors.white),
                      ),
                    ),
                  ),

                  // Editar
                  DataCell(
                    IconButton(
                      icon: const Icon(Icons.edit, color: Colors.blue),
                      onPressed: () => abrirModalEditar(c),
                    ),
                  ),

                  // Eliminar
                  DataCell(
                    IconButton(
                      icon: const Icon(Icons.delete, color: Colors.red),
                      onPressed: () => abrirModalEliminar(c),
                    ),
                  ),
                ],
              );
            }).toList(),
          ),
        ),
      ),
    );
  }
}
