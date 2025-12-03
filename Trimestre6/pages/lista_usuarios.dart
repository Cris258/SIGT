import 'package:flutter/material.dart';
import '../widgets/widgetsAdmin/modal_editar_usuario.dart';
import '../widgets/widgetsAdmin/modal_eliminar_usuario.dart';
import '../widgets/footer_widget.dart';
import '../widgets/header_widget.dart';


class ListaUsuarios extends StatefulWidget {
  const ListaUsuarios({Key? key}) : super(key: key);

  @override
  State<ListaUsuarios> createState() => _ListaUsuariosState();
}

class _ListaUsuariosState extends State<ListaUsuarios> {
  List<Map<String, dynamic>> usuarios = [];
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
      usuarios = [
        {
          'idPersona': 1,
          'NumeroDocumento': '1234567890',
          'TipoDocumento': 'CC',
          'Primer_Nombre': 'Juan',
          'Segundo_Nombre': 'Carlos',
          'Primer_Apellido': 'Pérez',
          'Segundo_Apellido': 'García',
          'Rol': {'NombreRol': 'Administrador'},
          'Rol_FK': 2,
          'Telefono': '3001234567',
          'Correo': 'juan.perez@example.com',
          'EstadoPersona_FK': 1,
        },
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
          'idPersona': 3,
          'NumeroDocumento': '5555555555',
          'TipoDocumento': 'TI',
          'Primer_Nombre': 'Pedro',
          'Segundo_Nombre': '',
          'Primer_Apellido': 'Ramírez',
          'Segundo_Apellido': 'Sánchez',
          'Rol': {'NombreRol': 'Cliente'},
          'Rol_FK': 4,
          'Telefono': '3157778888',
          'Correo': 'pedro.ramirez@example.com',
          'EstadoPersona_FK': 2,
        },
        {
          'idPersona': 4,
          'NumeroDocumento': '1111222233',
          'TipoDocumento': 'CC',
          'Primer_Nombre': 'Ana',
          'Segundo_Nombre': 'María',
          'Primer_Apellido': 'González',
          'Segundo_Apellido': 'Rodríguez',
          'Rol': {'NombreRol': 'Administrador'},
          'Rol_FK': 2,
          'Telefono': '3201112233',
          'Correo': 'ana.gonzalez@example.com',
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
          'idPersona': 6,
          'NumeroDocumento': '4444333322',
          'TipoDocumento': 'CC',
          'Primer_Nombre': 'Carolina',
          'Segundo_Nombre': '',
          'Primer_Apellido': 'Morales',
          'Segundo_Apellido': 'Castro',
          'Rol': {'NombreRol': 'Cliente'},
          'Rol_FK': 4,
          'Telefono': '3144445555',
          'Correo': 'carolina.morales@example.com',
          'EstadoPersona_FK': 2,
        },
      ];
    });
  }

  void abrirModalEditar(Map<String, dynamic> usuario) {
    showDialog(
      context: context,
      builder: (context) => ModalEditarUsuario(
        usuario: usuario,
        onGuardar: (usuarioActualizado) {
          setState(() {
            int index = usuarios.indexWhere(
              (u) => u['idPersona'] == usuarioActualizado['idPersona'],
            );
            if (index != -1) {
              usuarios[index] = usuarioActualizado;
            }
          });
        },
      ),
    );
  }

  void abrirModalEliminar(Map<String, dynamic> usuario) {
    showDialog(
      context: context,
      builder: (context) => ModalEliminar(
        usuario: usuario,
        tipoUsuario: "usuario",
        onConfirmar: () {
          setState(() {
            usuarios.removeWhere(
              (u) => u['idPersona'] == usuario['idPersona'],
            );
          });
        },
      ),
    );
  }

  List<Map<String, dynamic>> get usuariosFiltrados {
    if (search.isEmpty) return usuarios;

    String searchLower = search.toLowerCase();
    return usuarios.where((u) {
      return (u['NumeroDocumento']?.toString() ?? '')
              .toLowerCase()
              .contains(searchLower) ||
          (u['TipoDocumento'] ?? '').toLowerCase().contains(searchLower) ||
          (u['Primer_Nombre'] ?? '').toLowerCase().contains(searchLower) ||
          (u['Segundo_Nombre'] ?? '').toLowerCase().contains(searchLower) ||
          (u['Primer_Apellido'] ?? '').toLowerCase().contains(searchLower) ||
          (u['Segundo_Apellido'] ?? '').toLowerCase().contains(searchLower) ||
          (u['Rol']?['NombreRol'] ?? '').toLowerCase().contains(searchLower) ||
          (u['Telefono'] ?? '').toLowerCase().contains(searchLower) ||
          (u['Correo'] ?? '').toLowerCase().contains(searchLower);
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
              Text('Cargando usuarios...'),
            ],
          ),
        ),
      );
    }

    return Scaffold(
    
      body: Column(
        children: [
          // Header Widget
          HeaderWidget(),
          const SizedBox(height: 16),
          
          // Contenido principal
          Expanded(
            child: Padding(
              padding: const EdgeInsets.all(16.0),
              child: Column(
                children: [
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
                  Expanded(
                    child: Container(
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
                      child: usuariosFiltrados.isEmpty
                          ? Center(
                              child: Column(
                                mainAxisAlignment: MainAxisAlignment.center,
                                children: [
                                  Icon(
                                    Icons.people_outline,
                                    size: 80,
                                    color: Colors.grey[400],
                                  ),
                                  const SizedBox(height: 16),
                                  Text(
                                    search.isNotEmpty
                                        ? 'No se encontraron resultados'
                                        : 'No hay usuarios registrados',
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
                                    rows: usuariosFiltrados.map((u) {
                                      return DataRow(
                                        cells: [
                                          DataCell(
                                            SizedBox(
                                              width: 50,
                                              child: Text(
                                                u['idPersona']?.toString() ?? '',
                                                textAlign: TextAlign.center,
                                              ),
                                            ),
                                          ),
                                          DataCell(
                                            SizedBox(
                                              width: 110,
                                              child: Text(
                                                u['NumeroDocumento']?.toString() ?? '',
                                              ),
                                            ),
                                          ),
                                          DataCell(
                                            SizedBox(
                                              width: 90,
                                              child: Text(u['TipoDocumento'] ?? ''),
                                            ),
                                          ),
                                          DataCell(
                                            SizedBox(
                                              width: 130,
                                              child: Text(
                                                u['Primer_Nombre'] ?? '',
                                                overflow: TextOverflow.ellipsis,
                                              ),
                                            ),
                                          ),
                                          DataCell(
                                            SizedBox(
                                              width: 130,
                                              child: Text(
                                                u['Segundo_Nombre'] ?? '',
                                                overflow: TextOverflow.ellipsis,
                                              ),
                                            ),
                                          ),
                                          DataCell(
                                            SizedBox(
                                              width: 130,
                                              child: Text(
                                                u['Primer_Apellido'] ?? '',
                                                overflow: TextOverflow.ellipsis,
                                              ),
                                            ),
                                          ),
                                          DataCell(
                                            SizedBox(
                                              width: 130,
                                              child: Text(
                                                u['Segundo_Apellido'] ?? '',
                                                overflow: TextOverflow.ellipsis,
                                              ),
                                            ),
                                          ),
                                          DataCell(
                                            SizedBox(
                                              width: 110,
                                              child: Text(
                                                u['Rol']?['NombreRol'] ?? 'Sin rol',
                                                overflow: TextOverflow.ellipsis,
                                              ),
                                            ),
                                          ),
                                          DataCell(
                                            SizedBox(
                                              width: 110,
                                              child: Text(u['Telefono'] ?? ''),
                                            ),
                                          ),
                                          DataCell(
                                            SizedBox(
                                              width: 200,
                                              child: Text(
                                                u['Correo'] ?? '',
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
                                                    color: u['EstadoPersona_FK'] == 1
                                                        ? Colors.green
                                                        : Colors.red,
                                                    borderRadius: BorderRadius.circular(12),
                                                  ),
                                                  child: Text(
                                                    u['EstadoPersona_FK'] == 1
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
                                                  onPressed: () => abrirModalEditar(u),
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
                                                  onPressed: () => abrirModalEliminar(u),
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
                  ),
                ],
              ),
            ),
          ),
          
          // Footer Widget
          FooterWidget(),
        ],
      ),
    );
  }
}