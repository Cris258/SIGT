import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import '../services/productos_service.dart';
import '../widgets/header_line.dart';
import '../widgets/footer_line.dart';
import '../widgets/actualizar_datos_modal.dart';
import '../widgets/cambiar_contraseña_modal.dart';

class TiendaClientePage extends StatefulWidget {
  const TiendaClientePage({super.key});

  @override
  State<TiendaClientePage> createState() => _TiendaClientePageState();
}

class _TiendaClientePageState extends State<TiendaClientePage> {
  final GlobalKey<ScaffoldState> _scaffoldKey = GlobalKey<ScaffoldState>();
  final ProductosService _productosService = ProductosService();

  String? nombreUsuario = "Cliente";
  bool isLoading = true;
  bool _initialLoading = true;
  String? errorMessage;

  List<dynamic> productosAgrupados = [];
  List<Map<String, dynamic>> carrito = [];
  Map<String, int> cantidades = {};
  Map<String, String?> tallasSeleccionadas = {};

  final Map<String, Color> colorMap = {
    'rojo': const Color(0xFFFF0000),
    'azul': const Color(0xFF0000FF),
    'verde': const Color(0xFF00FF00),
    'amarillo': const Color(0xFFFFFF00),
    'negro': const Color(0xFF000000),
    'blanco': const Color(0xFFFFFFFF),
    'gris': const Color(0xFF808080),
    'rosa': const Color(0xFFFFC0CB),
    'morado': const Color(0xFF800080),
    'naranja': const Color(0xFFFFA500),
    'cafe': const Color(0xFF8B4513),
    'café': const Color(0xFF8B4513),
    'beige': const Color(0xFFF5F5DC),
    'celeste': const Color(0xFF87CEEB),
    'turquesa': const Color(0xFF40E0D0),
    'violeta': const Color(0xFFEE82EE),
    'fucsia': const Color(0xFFFF00FF),
    'marino': const Color(0xFF000080),
    'vino': const Color(0xFF722F37),
    'crema': const Color(0xFFFFFDD0),
  };

  @override
  void initState() {
    super.initState();
    _cargarDatosIniciales();
  }

  Future<void> _cargarDatosIniciales() async {
    try {
      await _cargarDatosUsuario();
      await _cargarCarrito();
      await _cargarProductos();
    } catch (e) {
      print('❌ Error en _cargarDatosIniciales: $e');
    } finally {
      setState(() {
        _initialLoading = false;
      });
    }
  }

  Future<void> _cargarDatosUsuario() async {
    final prefs = await SharedPreferences.getInstance();
    final nombre = prefs.getString('Primer_Nombre') ?? '';
    final apellido = prefs.getString('Primer_Apellido') ?? '';

    setState(() {
      nombreUsuario = nombre.isNotEmpty && apellido.isNotEmpty
          ? '$nombre $apellido'
          : prefs.getString('correo') ?? 'Cliente';
    });
  }

  Future<void> _cargarCarrito() async {
    final prefs = await SharedPreferences.getInstance();
    final carritoStr = prefs.getString('carro');

    if (carritoStr != null && carritoStr != 'null' && carritoStr.isNotEmpty) {
      try {
        final List<dynamic> carritoJson = json.decode(carritoStr);
        setState(() {
          carrito = carritoJson.cast<Map<String, dynamic>>();
        });
        print('✅ Carrito cargado: ${carrito.length} productos');
      } catch (e) {
        print('Error cargando carrito: $e');
        setState(() {
          carrito = [];
        });
      }
    }
  }

  Future<void> _guardarCarrito() async {
    final prefs = await SharedPreferences.getInstance();
    final carritoJson = carrito.map((item) => item).toList();
    await prefs.setString('carro', json.encode(carritoJson));
    print('✅ Carrito guardado: ${carrito.length} productos');
  }

  Future<void> _cargarProductos() async {
    setState(() {
      isLoading = true;
      errorMessage = null;
    });

    try {
      final result = await _productosService.obtenerProductosAgrupados();

      if (result['success']) {
        setState(() {
          productosAgrupados = result['productos'] ?? [];
          isLoading = false;
          cantidades.clear();
          tallasSeleccionadas.clear();
        });
        print('✅ Productos actualizados: ${productosAgrupados.length}');
      } else {
        setState(() {
          isLoading = false;
          errorMessage = result['message'];
        });

        if (result['message']?.contains('Sesión expirada') ?? false) {
          _mostrarDialogoSesionExpirada();
        }
      }
    } catch (e) {
      setState(() {
        isLoading = false;
        errorMessage = 'Error al cargar productos: $e';
      });
    }
  }

  void _mostrarDialogoSesionExpirada() {
    showDialog(
      context: context,
      barrierDismissible: false,
      builder: (context) => AlertDialog(
        title: const Text('Sesión Expirada'),
        content: const Text(
          'Tu sesión ha expirado. Por favor, inicia sesión nuevamente.',
        ),
        actions: [
          TextButton(
            onPressed: () {
              Navigator.pushReplacementNamed(context, '/login');
            },
            child: const Text('Ir al Login'),
          ),
        ],
      ),
    );
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
            onPressed: () async {
              final prefs = await SharedPreferences.getInstance();
              final carritoActual = prefs.getString('carro');
              await prefs.clear();
              if (carritoActual != null) {
                await prefs.setString('carro', carritoActual);
                print('✅ Carrito preservado al cerrar sesión');
              }

              if (!mounted) return;
              Navigator.pop(context);

              if (mounted) {
                Navigator.pushNamedAndRemoveUntil(
                  context,
                  '/home',
                  (route) => false,
                );
              }
            },
            child: const Text('Cerrar Sesión'),
          ),
        ],
      ),
    );
  }

  void _irAlCarrito() async {
    final result = await Navigator.pushNamed(context, '/carrito');

    if (result == true && mounted) {
      print('🔄 Actualizando productos después de compra...');
      await _cargarCarrito();
      await _cargarProductos();
    } else if (mounted) {
      await _cargarCarrito();
    }
  }

  int getCantidad(String key) => cantidades[key] ?? 1;

  void incrementarCantidad(String key, int max) {
    setState(() {
      cantidades[key] = (getCantidad(key) + 1).clamp(1, max);
    });
  }

  void decrementarCantidad(String key) {
    setState(() {
      cantidades[key] = (getCantidad(key) - 1).clamp(1, 999);
    });
  }

  Color getColorCode(String? colorName) {
    if (colorName == null) return Colors.grey;
    return colorMap[colorName.toLowerCase().trim()] ?? Colors.grey;
  }

  @override
  Widget build(BuildContext context) {
    if (_initialLoading) {
      return Scaffold(
        body: Container(
          decoration: const BoxDecoration(
            gradient: LinearGradient(
              begin: Alignment.topCenter,
              end: Alignment.bottomCenter,
              colors: [Color(0xFF800080), Color(0xFFE6C7F6)],
            ),
          ),
          child: const Center(
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                CircularProgressIndicator(
                  valueColor: AlwaysStoppedAnimation<Color>(Colors.white),
                  strokeWidth: 5,
                ),
                SizedBox(height: 24),
                Text(
                  'Cargando Tienda...',
                  style: TextStyle(
                    color: Colors.white,
                    fontSize: 20,
                    fontWeight: FontWeight.bold,
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
      backgroundColor: Colors.grey[50],
      body: Column(
        children: [
          HeaderLine(onLogout: _handleLogout),
          Container(
            decoration: BoxDecoration(
              color: const Color(0xFF800080),
              boxShadow: [
                BoxShadow(
                  color: Colors.black.withOpacity(0.2),
                  blurRadius: 8,
                  offset: const Offset(0, 2),
                ),
              ],
            ),
            padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 14),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Row(
                  children: [
                    IconButton(
                      icon: const Icon(Icons.menu, color: Colors.white, size: 26),
                      onPressed: () => _scaffoldKey.currentState?.openDrawer(),
                    ),
                    const Text(
                      'TIENDA',
                      style: TextStyle(
                        fontSize: 18,
                        fontWeight: FontWeight.bold,
                        color: Colors.white,
                        letterSpacing: 1.5,
                      ),
                    ),
                  ],
                ),
                Container(
                  margin: const EdgeInsets.only(right: 4),
                  child: Stack(
                    children: [
                      IconButton(
                        icon: const Icon(Icons.shopping_cart_rounded, color: Colors.white, size: 26),
                        onPressed: _irAlCarrito,
                      ),
                      if (carrito.isNotEmpty)
                        Positioned(
                          right: 4,
                          top: 4,
                          child: Container(
                            padding: const EdgeInsets.all(5),
                            decoration: BoxDecoration(
                              color: Colors.red,
                              shape: BoxShape.circle,
                              border: Border.all(color: Colors.white, width: 2),
                            ),
                            child: Text(
                              '${carrito.length}',
                              style: const TextStyle(
                                color: Colors.white,
                                fontSize: 10,
                                fontWeight: FontWeight.bold,
                              ),
                            ),
                          ),
                        ),
                    ],
                  ),
                ),
              ],
            ),
          ),
          Expanded(
            child: isLoading
                ? const Center(child: CircularProgressIndicator())
                : errorMessage != null
                    ? _buildErrorWidget()
                    : _buildProductosGrid(),
          ),
          const FooterLine(),
        ],
      ),
      drawer: _buildDrawer(),
    );
  }

  Widget _buildErrorWidget() {
    return Center(
      child: Padding(
        padding: const EdgeInsets.all(24.0),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Icon(Icons.error_outline, size: 80, color: Colors.red[300]),
            const SizedBox(height: 24),
            Text(
              errorMessage ?? 'Error al cargar productos',
              style: const TextStyle(fontSize: 16, color: Colors.black87),
              textAlign: TextAlign.center,
            ),
            const SizedBox(height: 24),
            ElevatedButton.icon(
              onPressed: _cargarProductos,
              icon: const Icon(Icons.refresh),
              label: const Text('Reintentar'),
              style: ElevatedButton.styleFrom(
                backgroundColor: const Color(0xFF800080),
                foregroundColor: Colors.white,
                padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 12),
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildProductosGrid() {
    if (productosAgrupados.isEmpty) {
      return Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Icon(Icons.inventory_2_outlined, size: 80, color: Colors.grey[400]),
            const SizedBox(height: 16),
            Text(
              'No hay productos disponibles',
              style: TextStyle(fontSize: 16, color: Colors.grey[600]),
            ),
          ],
        ),
      );
    }

    return RefreshIndicator(
      onRefresh: _cargarProductos,
      color: const Color(0xFF800080),
      child: ListView(
        padding: const EdgeInsets.all(0),
        children: [
          Container(
            padding: const EdgeInsets.symmetric(vertical: 20, horizontal: 16),
            decoration: BoxDecoration(
              gradient: LinearGradient(
                begin: Alignment.topCenter,
                end: Alignment.bottomCenter,
                colors: [
                  const Color(0xFF800080).withOpacity(0.08),
                  Colors.transparent,
                ],
              ),
            ),
            child: Column(
              children: [
                const Text(
                  'TIENDA ONLINE',
                  style: TextStyle(
                    fontSize: 26,
                    fontWeight: FontWeight.bold,
                    letterSpacing: 2,
                    color: Color(0xFF800080),
                  ),
                  textAlign: TextAlign.center,
                ),
                const SizedBox(height: 6),
                Text(
                  'Dulces sueños con estilo',
                  style: TextStyle(
                    fontSize: 14,
                    color: Colors.grey[700],
                    fontWeight: FontWeight.w500,
                    fontStyle: FontStyle.italic,
                  ),
                  textAlign: TextAlign.center,
                ),
                const SizedBox(height: 10),
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
                  decoration: BoxDecoration(
                    color: const Color(0xFF800080).withOpacity(0.1),
                    borderRadius: BorderRadius.circular(20),
                  ),
                  child: Text(
                    '${productosAgrupados.length} productos disponibles',
                    style: TextStyle(
                      fontSize: 12,
                      color: Colors.grey[700],
                      fontWeight: FontWeight.w600,
                    ),
                  ),
                ),
              ],
            ),
          ),
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 12.0),
            child: GridView.builder(
              shrinkWrap: true,
              physics: const NeverScrollableScrollPhysics(),
              gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
                crossAxisCount: 2,
                crossAxisSpacing: 12,
                mainAxisSpacing: 12,
                childAspectRatio: 0.38,
              ),
              itemCount: productosAgrupados.length,
              itemBuilder: (context, index) {
                return _buildProductoCard(productosAgrupados[index], index);
              },
            ),
          ),
          const SizedBox(height: 24),
        ],
      ),
    );
  }

  Widget _buildProductoCard(dynamic producto, int index) {
    final key = '${producto['nombre']}-$index';

    final nombre = producto['nombre'] ?? '';
    final estampado = producto['estampado'] ?? '';
    final precioBase = (producto['precio_base'] ?? 0).toDouble();
    final imagenPrincipal = producto['imagen_principal'] ?? '/img/no-image.png';

    final colores = (producto['colores'] as List?) ?? [];
    final variantes = (producto['variantes'] as List?) ?? [];

    final tieneColores = colores.isNotEmpty;

    if (!tallasSeleccionadas.containsKey('$key-color') && tieneColores) {
      tallasSeleccionadas['$key-color'] = colores.first['color'];
    }

    final colorSeleccionado = tallasSeleccionadas['$key-color'];

    final variantesFiltradas = tieneColores
        ? variantes.where((v) => v['color'] == colorSeleccionado).toList()
        : variantes;

    final variantesConStock = variantesFiltradas
        .where((v) => (v['stock'] ?? 0) > 0)
        .toList();

    final tieneStock = variantesConStock.isNotEmpty;

    final colorActual = tieneColores
        ? colores.firstWhere(
            (c) => c['color'] == colorSeleccionado,
            orElse: () => colores.first,
          )
        : null;

    final imagenMostrar =
        colorActual?['imagenUrl']?.toString().isNotEmpty == true
            ? colorActual!['imagenUrl']
            : imagenPrincipal;

    final precioMostrar = variantesFiltradas.isNotEmpty
        ? (variantesFiltradas.first['precio'] ?? precioBase).toDouble()
        : precioBase;

    return Card(
      elevation: 3,
      shadowColor: Colors.black.withOpacity(0.15),
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          ClipRRect(
            borderRadius: const BorderRadius.vertical(top: Radius.circular(16)),
            child: AspectRatio(
              aspectRatio: 1,
              child: Image.network(
                imagenMostrar.toString(),
                fit: BoxFit.cover,
                loadingBuilder: (context, child, progress) {
                  if (progress == null) return child;
                  return Container(
                    color: Colors.grey[100],
                    child: const Center(child: CircularProgressIndicator(strokeWidth: 2)),
                  );
                },
                errorBuilder: (_, __, ___) => Container(
                  color: Colors.grey[100],
                  child: Icon(Icons.image_not_supported, size: 50, color: Colors.grey[400]),
                ),
              ),
            ),
          ),
          Expanded(
            child: Padding(
              padding: const EdgeInsets.all(12),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    nombre,
                    maxLines: 2,
                    overflow: TextOverflow.ellipsis,
                    style: const TextStyle(
                      fontSize: 15,
                      fontWeight: FontWeight.bold,
                      height: 1.2,
                    ),
                  ),
                  if (estampado.isNotEmpty) ...[
                    const SizedBox(height: 3),
                    Text(
                      estampado,
                      maxLines: 1,
                      overflow: TextOverflow.ellipsis,
                      style: TextStyle(
                        fontSize: 12,
                        color: Colors.grey[600],
                        fontStyle: FontStyle.italic,
                      ),
                    ),
                  ],
                  const SizedBox(height: 8),
                  if (tieneColores && colores.length > 1)
                    SizedBox(
                      height: 32,
                      child: ListView(
                        scrollDirection: Axis.horizontal,
                        children: colores.map<Widget>((c) {
                          final colorName = c['color'];
                          final selected = colorName == colorSeleccionado;

                          return GestureDetector(
                            onTap: () {
                              setState(() {
                                tallasSeleccionadas['$key-color'] = colorName;
                                tallasSeleccionadas[key] = null;
                              });
                            },
                            child: Container(
                              margin: const EdgeInsets.only(right: 6),
                              padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 6),
                              decoration: BoxDecoration(
                                color: selected ? const Color(0xFF800080) : Colors.grey[100],
                                borderRadius: BorderRadius.circular(16),
                                border: Border.all(
                                  color: selected ? const Color(0xFF800080) : Colors.grey[300]!,
                                  width: 1.5,
                                ),
                              ),
                              child: Row(
                                mainAxisSize: MainAxisSize.min,
                                children: [
                                  Container(
                                    width: 12,
                                    height: 12,
                                    decoration: BoxDecoration(
                                      color: getColorCode(colorName),
                                      shape: BoxShape.circle,
                                      border: Border.all(color: Colors.white, width: 1.5),
                                    ),
                                  ),
                                  const SizedBox(width: 5),
                                  Text(
                                    colorName ?? '',
                                    style: TextStyle(
                                      fontSize: 11,
                                      color: selected ? Colors.white : Colors.black87,
                                      fontWeight: FontWeight.w600,
                                    ),
                                  ),
                                ],
                              ),
                            ),
                          );
                        }).toList(),
                      ),
                    ),
                  if (tieneColores && colores.length > 1) const SizedBox(height: 10),
                  const Spacer(),
                  Text(
                    '\$${precioMostrar.toStringAsFixed(0)}',
                    style: const TextStyle(
                      fontSize: 22,
                      fontWeight: FontWeight.bold,
                      color: Color(0xFF800080),
                    ),
                  ),
                  const SizedBox(height: 10),
                  if (!tieneStock)
                    Container(
                      padding: const EdgeInsets.symmetric(vertical: 8, horizontal: 10),
                      decoration: BoxDecoration(
                        color: Colors.red[50],
                        borderRadius: BorderRadius.circular(8),
                        border: Border.all(color: Colors.red[200]!, width: 1),
                      ),
                      child: Row(
                        mainAxisSize: MainAxisSize.min,
                        children: [
                          Icon(Icons.error_outline, color: Colors.red[700], size: 16),
                          const SizedBox(width: 6),
                          Text(
                            'Sin stock',
                            style: TextStyle(
                              color: Colors.red[700],
                              fontWeight: FontWeight.w600,
                              fontSize: 12,
                            ),
                          ),
                        ],
                      ),
                    )
                  else ...[
                    DropdownButtonFormField<String>(
                      value: tallasSeleccionadas[key],
                      decoration: InputDecoration(
                        labelText: 'Talla',
                        contentPadding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
                        border: OutlineInputBorder(
                          borderRadius: BorderRadius.circular(10),
                          borderSide: BorderSide(color: Colors.grey[300]!),
                        ),
                        enabledBorder: OutlineInputBorder(
                          borderRadius: BorderRadius.circular(10),
                          borderSide: BorderSide(color: Colors.grey[300]!),
                        ),
                        focusedBorder: OutlineInputBorder(
                          borderRadius: BorderRadius.circular(10),
                          borderSide: const BorderSide(color: Color(0xFF800080), width: 2),
                        ),
                      ),
                      items: variantesFiltradas.map((v) {
                        return DropdownMenuItem<String>(
                          value: v['talla'],
                          enabled: (v['stock'] ?? 0) > 0,
                          child: Text(
                            '${v['talla']} (${v['stock']})',
                            style: const TextStyle(fontSize: 13),
                          ),
                        );
                      }).toList(),
                      onChanged: (value) => setState(() => tallasSeleccionadas[key] = value),
                    ),
                    const SizedBox(height: 10),
                    SizedBox(
                      width: double.infinity,
                      child: ElevatedButton.icon(
                        icon: const Icon(Icons.add_shopping_cart, size: 18),
                        label: const Text(
                          'Agregar',
                          style: TextStyle(fontWeight: FontWeight.bold, fontSize: 14),
                        ),
                        style: ElevatedButton.styleFrom(
                          backgroundColor: const Color(0xFF800080),
                          foregroundColor: Colors.white,
                          padding: const EdgeInsets.symmetric(vertical: 12),
                          shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(10),
                          ),
                          elevation: 2,
                        ),
                        onPressed: () {
                          if (tallasSeleccionadas[key] == null) {
                            ScaffoldMessenger.of(context).showSnackBar(
                              const SnackBar(
                                content: Text('Selecciona una talla'),
                                backgroundColor: Colors.orange,
                                duration: Duration(seconds: 2),
                              ),
                            );
                            return;
                          }

                          final variante = variantesFiltradas.firstWhere(
                            (v) => v['talla'] == tallasSeleccionadas[key],
                          );

                          setState(() {
                            carrito.add({
                              'idProducto': variante['idProducto'],
                              'nombre': nombre,
                              'precio': precioMostrar,
                              'imagen': imagenMostrar,
                              'color': colorSeleccionado,
                              'talla': tallasSeleccionadas[key],
                              'cantidad': 1,
                              'stock': variante['stock'],
                            });
                          });

                          _guardarCarrito();

                          ScaffoldMessenger.of(context).showSnackBar(
                            SnackBar(
                              content: const Row(
                                children: [
                                  Icon(Icons.check_circle, color: Colors.white),
                                  SizedBox(width: 8),
                                  Text('Producto agregado al carrito'),
                                ],
                              ),
                              backgroundColor: Colors.green[600],
                              duration: const Duration(seconds: 2),
                              behavior: SnackBarBehavior.floating,
                            ),
                          );

                          tallasSeleccionadas[key] = null;
                        },
                      ),
                    ),
                  ],
                ],
              ),
            ),
          ),
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
              decoration: const BoxDecoration(color: Color(0xFFE6C7F6)),
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
                    nombreUsuario ?? 'Cliente',
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
            const Divider(color: Colors.white30, thickness: 1, height: 32),
            _buildDrawerItem(
              icon: Icons.store,
              title: 'Tienda',
              onTap: () => Navigator.pop(context),
              selected: true,
            ),
            _buildDrawerItem(
              icon: Icons.shopping_cart,
              title: 'Mi Carrito',
              badge: carrito.length,
              onTap: _irAlCarrito,
            ),
            _buildDrawerItem(
              icon: Icons.receipt_long,
              title: 'Mis Pedidos',
              onTap: () {
                Navigator.pushNamed(context, '/mis_pedidos');
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
    int badge = 0,
  }) {
    return ListTile(
      leading: Stack(
        children: [
          Icon(
            icon,
            color: selected ? const Color(0xFF4A148C) : Colors.white,
            size: 26,
          ),
          if (badge > 0)
            Positioned(
              right: 0,
              top: 0,
              child: Container(
                padding: const EdgeInsets.all(4),
                decoration: const BoxDecoration(
                  color: Colors.red,
                  shape: BoxShape.circle,
                ),
                child: Text(
                  '$badge',
                  style: const TextStyle(
                    color: Colors.white,
                    fontSize: 10,
                    fontWeight: FontWeight.bold,
                  ),
                ),
              ),
            ),
        ],
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
}