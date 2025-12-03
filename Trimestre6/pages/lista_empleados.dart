import 'package:flutter/material.dart';
import '../widgets/widgetsAdmin/modal_editar_usuario.dart';
import '../widgets/widgetsAdmin/modal_eliminar_usuario.dart';
import '../widgets/footer_widget.dart';
import '../widgets/header_widget.dart';

class ListaEmpleados extends StatefulWidget {
  const ListaEmpleados({Key? key}) : super(key: key);

  @override
  State<ListaEmpleados> createState() => _ListaEmpleadosState();
}

class _ListaEmpleadosState extends State<ListaEmpleados> {
  List<Map<String, dynamic>> empleados = [];
  bool loading = false;
  String search = "";

  @override
  void initState() {
    super.initState();
    // Datos de ejemplo para visualización
    _cargarDatosEjemplo();
  }

  void _cargarDatosEjemplo() {
    setState(() {
      empleados = [
        {
          'idPersona': 2,
          'NumeroDocumento': '9876543210',
          'TipoDocumento': 'CE',
          'Primer_Nombre': 'María',
          'Segundo_Nombre': 'Fernanda',
          'Primer_Apellido': 'López',
          'Segundo_Apellido': 'Martínez',
          'Rol': {'NombreRol': 'Empleado'},
          'Rol_FK': 3,
          'Telefono': '3109876543',
          'Correo': 'maria.lopez@example.com',
          'EstadoPersona_FK': 1,
        },
        {
          'idPersona': 5,
          'NumeroDocumento': '9999888877',
          'TipoDocumento': 'PA',
          'Primer_Nombre': 'Luis',
          'Segundo_Nombre': 'Alberto',
          'Primer_Apellido': 'Torres',
          'Segundo_Apellido': 'Velasco',
          'Rol': {'NombreRol': 'Empleado'},
          'Rol_FK': 3,
          'Telefono': '3189998877',
          'Correo': 'luis.torres@example.com',
          'EstadoPersona_FK': 1,
        },
        {
          'idPersona': 7,
          'NumeroDocumento': '3333444455',
          'TipoDocumento': 'CC',
          'Primer_Nombre': 'Andrea',
          'Segundo_Nombre': '',
          'Primer_Apellido': 'Ruiz',
          'Segundo_Apellido': 'Jiménez',
          'Rol': {'NombreRol': 'Empleado'},
          'Rol_FK': 3,
          'Telefono': '3123334444',
          'Correo': 'andrea.ruiz@example.com',
          'EstadoPersona_FK': 2,
        },
        {
          'idPersona': 9,
          'NumeroDocumento': '7777666655',
          'TipoDocumento': 'CC',
          'Primer_Nombre': 'Roberto',
          'Segundo_Nombre': 'Carlos',
          'Primer_Apellido': 'Mendoza',
          'Segundo_Apellido': 'Ortiz',
          'Rol': {'NombreRol': 'Empleado'},
          'Rol_FK': 3,
          'Telefono': '3167778899',
          'Correo': 'roberto.mendoza@example.com',
          'EstadoPersona_FK': 1,
        },
      ];
    });
  }

  void abrirModalEditar(Map<String, dynamic> empleado) {
    showDialog(
      context: context,
      builder: (context) => ModalEditarUsuario(
        usuario: empleado,
        onGuardar: (empleadoActualizado) {
          setState(() {
            int index = empleados.indexWhere(
              (e) => e['idPersona'] == empleadoActualizado['idPersona'],
            );
            if (index != -1) {
              empleados[index] = empleadoActualizado;
            }
          });
        },
      ),
    );
  }

  void abrirModalEliminar(Map<String, dynamic> empleado) {
    showDialog(
      context: context,
      builder: (context) => ModalEliminar(
        usuario: empleado,
        tipoUsuario: "empleado",
        onConfirmar: () {
          setState(() {
            empleados.removeWhere(
              (e) => e['idPersona'] == empleado['idPersona'],
            );
          });
        },
      ),
    );
  }

  List<Map<String, dynamic>> get empleadosFiltrados {
    if (search.isEmpty) return empleados;

    String searchLower = search.toLowerCase();
    return empleados.where((e) {
      return (e['NumeroDocumento']?.toString() ?? '')
              .toLowerCase()
              .contains(searchLower) ||
          (e['TipoDocumento'] ?? '').toLowerCase().contains(searchLower) ||
          (e['Primer_Nombre'] ?? '').toLowerCase().contains(searchLower) ||
          (e['Segundo_Nombre'] ?? '').toLowerCase().contains(searchLower) ||
          (e['Primer_Apellido'] ?? '').toLowerCase().contains(searchLower) ||
          (e['Segundo_Apellido'] ?? '').toLowerCase().contains(searchLower) ||
          (e['Telefono'] ?? '').toLowerCase().contains(searchLower) ||
          (e['Correo'] ?? '').toLowerCase().contains(searchLower);
    }).toList();
  }

  @override
  Widget build(BuildContext context) {
    if (loading) {
      return const Scaffold(
        body: Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              CircularProgressIndicator(),
              SizedBox(height: 16),
              Text('Cargando empleados...'),
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
              child: Padding(
                padding: const EdgeInsets.all(16.0),
                child: Column(
                  children: [
                    // Título
                    const Padding(
                      padding: EdgeInsets.symmetric(vertical: 16.0),
                      child: Text(
                        'Lista de Empleados Registrados',
                        style: TextStyle(
                          fontSize: 24,
                          fontWeight: FontWeight.bold,
                        ),
                        textAlign: TextAlign.center,
                      ),
                    ),
                    
                    // Buscador
                    Container(
                      constraints: const BoxConstraints(maxWidth: 800),
                      child: TextField(
                        decoration: InputDecoration(
                          labelText: 'Buscar',
                          hintText: 'Buscar por nombre, correo, documento...',
                          prefixIcon: const Icon(Icons.search),
                          border: OutlineInputBorder(
                            borderRadius: BorderRadius.circular(8),
                          ),
                          filled: true,
                          fillColor: Colors.white,
                        ),
                        onChanged: (value) {
                          setState(() {
                            search = value;
                          });
                        },
                      ),
                    ),
                    const SizedBox(height: 20),

                    // Tabla
                    Container(
                      constraints: const BoxConstraints(minHeight: 400),
                      decoration: BoxDecoration(
                        color: Colors.white,
                        borderRadius: BorderRadius.circular(12),
                        boxShadow: [
                          BoxShadow(
                            color: Colors.black.withOpacity(0.05),
                            blurRadius: 6,
                            offset: const Offset(0, 3),
                          ),
                        ],
                      ),
                      child: empleadosFiltrados.isEmpty
                          ? Center(
                              child: Padding(
                                padding: const EdgeInsets.all(40.0),
                                child: Column(
                                  mainAxisAlignment: MainAxisAlignment.center,
                                  children: [
                                    Icon(
                                      Icons.badge_outlined,
                                      size: 80,
                                      color: Colors.grey[400],
                                    ),
                                    const SizedBox(height: 16),
                                    Text(
                                      search.isNotEmpty
                                          ? 'No se encontraron resultados'
                                          : 'No hay empleados registrados',
                                      style: TextStyle(
                                        fontSize: 18,
                                        color: Colors.grey[600],
                                        fontStyle: FontStyle.italic,
                                      ),
                                    ),
                                    if (search.isNotEmpty) ...[
                                      const SizedBox(height: 8),
                                      Text(
                                        'Intenta con otros términos de búsqueda',
                                        style: TextStyle(
                                          fontSize: 14,
                                          color: Colors.grey[500],
                                        ),
                                      ),
                                    ],
                                  ],
                                ),
                              ),
                            )
                          : Scrollbar(
                              thumbVisibility: true,
                              radius: const Radius.circular(12),
                              child: SingleChildScrollView(
                                scrollDirection: Axis.horizontal,
                                child: SingleChildScrollView(
                                  child: DataTable(
                                    headingRowHeight: 56,
                                    dataRowHeight: 60,
                                    columnSpacing: 24,
                                    horizontalMargin: 16,
                                    headingRowColor: MaterialStateProperty.all(
                                      const Color(0xFF3A3A3A),
                                    ),
                                    headingTextStyle: const TextStyle(
                                      color: Colors.white,
                                      fontWeight: FontWeight.bold,
                                      fontSize: 13,
                                    ),
                                    border: TableBorder.all(
                                      color: Colors.grey.shade300,
                                      borderRadius: BorderRadius.circular(12),
                                    ),
                                    columns: const [
                                      DataColumn(
                                        label: SizedBox(
                                          width: 50,
                                          child: Text('ID', textAlign: TextAlign.center),
                                        ),
                                      ),
                                      DataColumn(
                                        label: SizedBox(
                                          width: 110,
                                          child: Text('N° Documento'),
                                        ),
                                      ),
                                      DataColumn(
                                        label: SizedBox(
                                          width: 90,
                                          child: Text('Tipo Doc'),
                                        ),
                                      ),
                                      DataColumn(
                                        label: SizedBox(
                                          width: 130,
                                          child: Text('Primer Nombre'),
                                        ),
                                      ),
                                      DataColumn(
                                        label: SizedBox(
                                          width: 130,
                                          child: Text('Segundo Nombre'),
                                        ),
                                      ),
                                      DataColumn(
                                        label: SizedBox(
                                          width: 130,
                                          child: Text('Primer Apellido'),
                                        ),
                                      ),
                                      DataColumn(
                                        label: SizedBox(
                                          width: 130,
                                          child: Text('Segundo Apellido'),
                                        ),
                                      ),
                                      DataColumn(
                                        label: SizedBox(
                                          width: 110,
                                          child: Text('Rol'),
                                        ),
                                      ),
                                      DataColumn(
                                        label: SizedBox(
                                          width: 110,
                                          child: Text('Teléfono'),
                                        ),
                                      ),
                                      DataColumn(
                                        label: SizedBox(
                                          width: 200,
                                          child: Text('Correo'),
                                        ),
                                      ),
                                      DataColumn(
                                        label: SizedBox(
                                          width: 90,
                                          child: Text('Estado', textAlign: TextAlign.center),
                                        ),
                                      ),
                                      DataColumn(
                                        label: SizedBox(
                                          width: 90,
                                          child: Text('Modificar', textAlign: TextAlign.center),
                                        ),
                                      ),
                                      DataColumn(
                                        label: SizedBox(
                                          width: 90,
                                          child: Text('Eliminar', textAlign: TextAlign.center),
                                        ),
                                      ),
                                    ],
                                    rows: empleadosFiltrados.map((e) {
                                      return DataRow(
                                        cells: [
                                          DataCell(
                                            SizedBox(
                                              width: 50,
                                              child: Text(
                                                e['idPersona']?.toString() ?? '',
                                                textAlign: TextAlign.center,
                                              ),
                                            ),
                                          ),
                                          DataCell(
                                            SizedBox(
                                              width: 110,
                                              child: Text(
                                                e['NumeroDocumento']?.toString() ?? '',
                                              ),
                                            ),
                                          ),
                                          DataCell(
                                            SizedBox(
                                              width: 90,
                                              child: Text(e['TipoDocumento'] ?? ''),
                                            ),
                                          ),
                                          DataCell(
                                            SizedBox(
                                              width: 130,
                                              child: Text(
                                                e['Primer_Nombre'] ?? '',
                                                overflow: TextOverflow.ellipsis,
                                              ),
                                            ),
                                          ),
                                          DataCell(
                                            SizedBox(
                                              width: 130,
                                              child: Text(
                                                e['Segundo_Nombre'] ?? '',
                                                overflow: TextOverflow.ellipsis,
                                              ),
                                            ),
                                          ),
                                          DataCell(
                                            SizedBox(
                                              width: 130,
                                              child: Text(
                                                e['Primer_Apellido'] ?? '',
                                                overflow: TextOverflow.ellipsis,
                                              ),
                                            ),
                                          ),
                                          DataCell(
                                            SizedBox(
                                              width: 130,
                                              child: Text(
                                                e['Segundo_Apellido'] ?? '',
                                                overflow: TextOverflow.ellipsis,
                                              ),
                                            ),
                                          ),
                                          DataCell(
                                            SizedBox(
                                              width: 110,
                                              child: Text(
                                                e['Rol']?['NombreRol'] ?? 'Sin rol',
                                                overflow: TextOverflow.ellipsis,
                                              ),
                                            ),
                                          ),
                                          DataCell(
                                            SizedBox(
                                              width: 110,
                                              child: Text(e['Telefono'] ?? ''),
                                            ),
                                          ),
                                          DataCell(
                                            SizedBox(
                                              width: 200,
                                              child: Text(
                                                e['Correo'] ?? '',
                                                overflow: TextOverflow.ellipsis,
                                              ),
                                            ),
                                          ),
                                          DataCell(
                                            SizedBox(
                                              width: 90,
                                              child: Center(
                                                child: Container(
                                                  padding: const EdgeInsets.symmetric(
                                                    horizontal: 12,
                                                    vertical: 6,
                                                  ),
                                                  decoration: BoxDecoration(
                                                    color: e['EstadoPersona_FK'] == 1
                                                        ? Colors.green
                                                        : Colors.red,
                                                    borderRadius: BorderRadius.circular(12),
                                                  ),
                                                  child: Text(
                                                    e['EstadoPersona_FK'] == 1
                                                        ? 'Activo'
                                                        : 'Inactivo',
                                                    style: const TextStyle(
                                                      color: Colors.white,
                                                      fontSize: 11,
                                                      fontWeight: FontWeight.bold,
                                                    ),
                                                  ),
                                                ),
                                              ),
                                            ),
                                          ),
                                          DataCell(
                                            SizedBox(
                                              width: 90,
                                              child: Center(
                                                child: IconButton(
                                                  icon: const Icon(
                                                    Icons.edit,
                                                    color: Colors.blue,
                                                    size: 22,
                                                  ),
                                                  onPressed: () => abrirModalEditar(e),
                                                  tooltip: 'Editar',
                                                ),
                                              ),
                                            ),
                                          ),
                                          DataCell(
                                            SizedBox(
                                              width: 90,
                                              child: Center(
                                                child: IconButton(
                                                  icon: const Icon(
                                                    Icons.delete,
                                                    color: Colors.red,
                                                    size: 22,
                                                  ),
                                                  onPressed: () => abrirModalEliminar(e),
                                                  tooltip: 'Eliminar',
                                                ),
                                              ),
                                            ),
                                          ),
                                        ],
                                      );
                                    }).toList(),
                                  ),
                                ),
                              ),
                            ),
                    ),
                    const SizedBox(height: 40),
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
}