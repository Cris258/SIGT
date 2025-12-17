import 'package:flutter/material.dart';
import '../models/carrito_item_model.dart';
import '../services/carrito_service.dart';
import '../widgets/header_line.dart';
import '../widgets/footer_line.dart';

class CarritoPage extends StatefulWidget {
  const CarritoPage({super.key});

  @override
  State<CarritoPage> createState() => _CarritoPageState();
}

class _CarritoPageState extends State<CarritoPage> {
  final CarritoService _carritoService = CarritoService();

  List<CarritoItem> carrito = [];
  List<bool> productosSeleccionados = [];
  bool isLoading = true;
  bool procesandoCompra = false;

  @override
  void initState() {
    super.initState();
    _cargarCarrito();
  }

  Future<void> _cargarCarrito() async {
    setState(() => isLoading = true);

    final items = await _carritoService.cargarCarritoLocal();

    setState(() {
      carrito = items;
      productosSeleccionados = List.filled(items.length, true);
      isLoading = false;
    });
  }

  Future<void> _guardarCarrito() async {
    await _carritoService.guardarCarritoLocal(carrito);
  }

  void _toggleSeleccion(int index) {
    setState(() {
      productosSeleccionados[index] = !productosSeleccionados[index];
    });
  }

  void _seleccionarTodos() {
    setState(() {
      productosSeleccionados = List.filled(carrito.length, true);
    });
  }

  void _deseleccionarTodos() {
    setState(() {
      productosSeleccionados = List.filled(carrito.length, false);
    });
  }

  void _actualizarCantidad(int index, int nuevaCantidad) {
    final producto = carrito[index];

    if (nuevaCantidad < 1) return;

    if (nuevaCantidad > producto.stock) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text('Solo hay ${producto.stock} unidades disponibles'),
          backgroundColor: Colors.orange,
        ),
      );
      return;
    }

    setState(() {
      carrito[index] = producto.copyWith(cantidad: nuevaCantidad);
    });
    _guardarCarrito();
  }

  Future<void> _confirmarEliminacion(int index) async {
    final confirm = await showDialog<bool>(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('¿Estás seguro?'),
        content: const Text('Este producto será eliminado de tu carrito'),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context, false),
            child: const Text('Cancelar'),
          ),
          TextButton(
            onPressed: () => Navigator.pop(context, true),
            style: TextButton.styleFrom(foregroundColor: Colors.red),
            child: const Text('Eliminar'),
          ),
        ],
      ),
    );

    if (confirm == true) {
      setState(() {
        carrito.removeAt(index);
        productosSeleccionados.removeAt(index);
      });
      await _guardarCarrito();

      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(
            content: Text('Producto eliminado del carrito'),
            backgroundColor: Colors.green,
            duration: Duration(seconds: 1),
          ),
        );
      }
    }
  }

  Future<void> _vaciarCarrito() async {
    final confirm = await showDialog<bool>(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('¿Vaciar carrito?'),
        content: const Text('Se eliminarán todos los productos de tu carrito'),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context, false),
            child: const Text('Cancelar'),
          ),
          TextButton(
            onPressed: () => Navigator.pop(context, true),
            style: TextButton.styleFrom(foregroundColor: Colors.red),
            child: const Text('Vaciar'),
          ),
        ],
      ),
    );

    if (confirm == true) {
      setState(() {
        carrito.clear();
        productosSeleccionados.clear();
      });
      await _carritoService.limpiarCarritoLocal();

      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(
            content: Text('Carrito vaciado'),
            backgroundColor: Colors.green,
            duration: Duration(seconds: 1),
          ),
        );
      }
    }
  }

  Future<Map<String, String>?> _mostrarFormularioDireccion() async {
    final direccionController = TextEditingController();
    final ciudadController = TextEditingController(text: 'Bogotá');
    final departamentoController = TextEditingController(text: 'Cundinamarca');

    return showDialog<Map<String, String>>(
      context: context,
      barrierDismissible: false,
      builder: (context) => AlertDialog(
        title: const Text('Dirección de Entrega'),
        content: SingleChildScrollView(
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              TextField(
                controller: direccionController,
                decoration: const InputDecoration(
                  labelText: 'Dirección',
                  hintText: 'Calle 123 #45-67',
                  border: OutlineInputBorder(),
                ),
                maxLines: 2,
              ),
              const SizedBox(height: 16),
              TextField(
                controller: ciudadController,
                decoration: const InputDecoration(
                  labelText: 'Ciudad',
                  border: OutlineInputBorder(),
                ),
              ),
              const SizedBox(height: 16),
              TextField(
                controller: departamentoController,
                decoration: const InputDecoration(
                  labelText: 'Departamento',
                  border: OutlineInputBorder(),
                ),
              ),
            ],
          ),
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context, null),
            child: const Text('Cancelar'),
          ),
          ElevatedButton(
            onPressed: () {
              if (direccionController.text.trim().isEmpty) {
                ScaffoldMessenger.of(context).showSnackBar(
                  const SnackBar(
                    content: Text('La dirección es obligatoria'),
                    backgroundColor: Colors.orange,
                  ),
                );
                return;
              }

              Navigator.pop(context, {
                'direccion': direccionController.text.trim(),
                'ciudad': ciudadController.text.trim(),
                'departamento': departamentoController.text.trim(),
              });
            },
            style: ElevatedButton.styleFrom(
              backgroundColor: const Color(0xFF800080),
              foregroundColor: Colors.white,
            ),
            child: const Text('Continuar'),
          ),
        ],
      ),
    );
  }

  Future<void> _finalizarCompra() async {
    final productosAComprar = <CarritoItem>[];

    for (int i = 0; i < carrito.length; i++) {
      if (productosSeleccionados[i]) {
        productosAComprar.add(carrito[i]);
      }
    }

    if (productosAComprar.isEmpty) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content: Text('Por favor selecciona al menos un producto'),
          backgroundColor: Colors.orange,
        ),
      );
      return;
    }

    // 👇 MOSTRAR FORMULARIO DE DIRECCIÓN
    final direccionData = await _mostrarFormularioDireccion();

    if (direccionData == null) {
      // Usuario canceló
      return;
    }

    setState(() => procesandoCompra = true);

    // PASAR LOS DATOS DE DIRECCIÓN AL SERVICE
    final result = await _carritoService.finalizarCompra(
      productosAComprar,
      direccionEntrega: direccionData['direccion']!,
      ciudad: direccionData['ciudad']!,
      departamento: direccionData['departamento']!,
    );

    setState(() => procesandoCompra = false);

    if (!mounted) return;

    if (result['success']) {
      // Remover productos comprados del carrito local
      final carritoActualizado = <CarritoItem>[];
      final seleccionActualizada = <bool>[];

      for (int i = 0; i < carrito.length; i++) {
        if (!productosSeleccionados[i]) {
          carritoActualizado.add(carrito[i]);
          seleccionActualizada.add(true);
        }
      }

      setState(() {
        carrito = carritoActualizado;
        productosSeleccionados = seleccionActualizada;
      });

      await _guardarCarrito();

      showDialog(
        context: context,
        builder: (context) => AlertDialog(
          title: const Text('¡Compra realizada!'),
          content: const Text('Tu pedido ha sido procesado exitosamente.'),
          actions: [
            TextButton(
              onPressed: () {
                Navigator.pop(context);
                if (carrito.isEmpty) {
                  Navigator.pop(context); // Volver a la tienda
                }
              },
              child: const Text('Aceptar'),
            ),
          ],
        ),
      );
    } else {
      showDialog(
        context: context,
        builder: (context) => AlertDialog(
          title: const Text('Error en la compra'),
          content: Text(result['message'] ?? 'Error desconocido'),
          actions: [
            TextButton(
              onPressed: () => Navigator.pop(context),
              child: const Text('Aceptar'),
            ),
          ],
        ),
      );
    }
  }

  double get total {
    double sum = 0;
    for (int i = 0; i < carrito.length; i++) {
      if (productosSeleccionados[i]) {
        sum += carrito[i].subtotal;
      }
    }
    return sum;
  }

  int get cantidadSeleccionada {
    return productosSeleccionados.where((selected) => selected).length;
  }

  @override
  Widget build(BuildContext context) {
    if (isLoading) {
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
                ),
                SizedBox(height: 16),
                Text(
                  'Cargando carrito...',
                  style: TextStyle(color: Colors.white, fontSize: 16),
                ),
              ],
            ),
          ),
        ),
      );
    }

    return Scaffold(
      backgroundColor: Colors.grey[50],
      body: Column(
        children: [
          HeaderLine(
            onLogout: () {
              // Implementar logout si es necesario
            },
          ),
          // Barra superior
          Container(
            color: const Color(0xFF800080),
            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
            child: Row(
              children: [
                IconButton(
                  icon: const Icon(Icons.arrow_back, color: Colors.white),
                  onPressed: () => Navigator.pop(context),
                ),
                const Text(
                  'Mi Carrito',
                  style: TextStyle(
                    fontSize: 20,
                    fontWeight: FontWeight.bold,
                    color: Colors.white,
                  ),
                ),
              ],
            ),
          ),
          Expanded(
            child: carrito.isEmpty
                ? _buildCarritoVacio()
                : _buildListaCarrito(),
          ),
          const FooterLine(),
        ],
      ),
    );
  }

  Widget _buildCarritoVacio() {
    return Center(
      child: Padding(
        padding: const EdgeInsets.all(32.0),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Icon(
              Icons.shopping_cart_outlined,
              size: 100,
              color: Colors.grey[400],
            ),
            const SizedBox(height: 24),
            const Text(
              'Tu carrito está vacío',
              style: TextStyle(
                fontSize: 24,
                fontWeight: FontWeight.bold,
                color: Colors.black87,
              ),
            ),
            const SizedBox(height: 12),
            Text(
              'Agrega productos desde la tienda',
              style: TextStyle(fontSize: 16, color: Colors.grey[600]),
            ),
            const SizedBox(height: 32),
            ElevatedButton.icon(
              onPressed: () => Navigator.pop(context),
              icon: const Icon(Icons.store),
              label: const Text('Ir a la tienda'),
              style: ElevatedButton.styleFrom(
                backgroundColor: const Color(0xFF800080),
                foregroundColor: Colors.white,
                padding: const EdgeInsets.symmetric(
                  horizontal: 32,
                  vertical: 16,
                ),
                textStyle: const TextStyle(fontSize: 16),
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildListaCarrito() {
    return Column(
      children: [
        // Controles de selección
        Container(
          padding: const EdgeInsets.all(16),
          color: Colors.white,
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Row(
                children: [
                  TextButton.icon(
                    onPressed: _seleccionarTodos,
                    icon: const Icon(Icons.check_box, size: 18),
                    label: const Text('Todos'),
                    style: TextButton.styleFrom(
                      foregroundColor: const Color(0xFF800080),
                    ),
                  ),
                  const SizedBox(width: 8),
                  TextButton.icon(
                    onPressed: _deseleccionarTodos,
                    icon: const Icon(Icons.check_box_outline_blank, size: 18),
                    label: const Text('Ninguno'),
                    style: TextButton.styleFrom(
                      foregroundColor: Colors.grey[700],
                    ),
                  ),
                ],
              ),
              Container(
                padding: const EdgeInsets.symmetric(
                  horizontal: 12,
                  vertical: 6,
                ),
                decoration: BoxDecoration(
                  color: const Color(0xFF800080).withOpacity(0.1),
                  borderRadius: BorderRadius.circular(20),
                ),
                child: Text(
                  '$cantidadSeleccionada de ${carrito.length}',
                  style: const TextStyle(
                    fontWeight: FontWeight.bold,
                    color: Color(0xFF800080),
                  ),
                ),
              ),
            ],
          ),
        ),
        // Lista de productos
        Expanded(
          child: ListView.builder(
            padding: const EdgeInsets.all(8),
            itemCount: carrito.length,
            itemBuilder: (context, index) {
              return _buildProductoCard(index);
            },
          ),
        ),
        // Footer con total y botones
        _buildFooterCarrito(),
      ],
    );
  }

  Widget _buildProductoCard(int index) {
    final producto = carrito[index];
    final isSelected = productosSeleccionados[index];

    return Card(
      margin: const EdgeInsets.only(bottom: 12),
      elevation: isSelected ? 2 : 0.5,
      color: isSelected ? Colors.white : Colors.grey[200],
      child: Padding(
        padding: const EdgeInsets.all(12),
        child: Column(
          children: [
            Row(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                // Checkbox
                Checkbox(
                  value: isSelected,
                  onChanged: (value) => _toggleSeleccion(index),
                  activeColor: const Color(0xFF800080),
                ),
                // Imagen
                ClipRRect(
                  borderRadius: BorderRadius.circular(8),
                  child: Image.network(
                    producto.imagen,
                    width: 80,
                    height: 80,
                    fit: BoxFit.cover,
                    errorBuilder: (context, error, stackTrace) {
                      return Container(
                        width: 80,
                        height: 80,
                        color: Colors.grey[300],
                        child: const Icon(Icons.image_not_supported),
                      );
                    },
                  ),
                ),
                const SizedBox(width: 12),
                // Información del producto
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        producto.nombre,
                        style: const TextStyle(
                          fontWeight: FontWeight.bold,
                          fontSize: 16,
                        ),
                        maxLines: 2,
                        overflow: TextOverflow.ellipsis,
                      ),
                      const SizedBox(height: 4),
                      Row(
                        children: [
                          Text(
                            'Color: ${producto.color}',
                            style: TextStyle(
                              fontSize: 13,
                              color: Colors.grey[700],
                            ),
                          ),
                          const SizedBox(width: 8),
                          Container(
                            padding: const EdgeInsets.symmetric(
                              horizontal: 8,
                              vertical: 2,
                            ),
                            decoration: BoxDecoration(
                              color: Colors.grey[300],
                              borderRadius: BorderRadius.circular(4),
                            ),
                            child: Text(
                              producto.talla,
                              style: const TextStyle(
                                fontSize: 12,
                                fontWeight: FontWeight.bold,
                              ),
                            ),
                          ),
                        ],
                      ),
                      const SizedBox(height: 8),
                      Text(
                        '\$${producto.precio.toStringAsFixed(0)} COP',
                        style: const TextStyle(
                          fontSize: 18,
                          fontWeight: FontWeight.bold,
                          color: Color(0xFF800080),
                        ),
                      ),
                    ],
                  ),
                ),
              ],
            ),
            const SizedBox(height: 12),
            // Controles de cantidad y eliminar
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                // Contador
                Container(
                  decoration: BoxDecoration(
                    color: Colors.grey[200],
                    borderRadius: BorderRadius.circular(8),
                  ),
                  child: Row(
                    children: [
                      IconButton(
                        onPressed: producto.cantidad > 1
                            ? () => _actualizarCantidad(
                                index,
                                producto.cantidad - 1,
                              )
                            : null,
                        icon: const Icon(Icons.remove_circle_outline),
                        color: const Color(0xFF800080),
                        iconSize: 24,
                      ),
                      Container(
                        padding: const EdgeInsets.symmetric(horizontal: 12),
                        child: Text(
                          '${producto.cantidad}',
                          style: const TextStyle(
                            fontSize: 16,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                      ),
                      IconButton(
                        onPressed: producto.cantidad < producto.stock
                            ? () => _actualizarCantidad(
                                index,
                                producto.cantidad + 1,
                              )
                            : null,
                        icon: const Icon(Icons.add_circle_outline),
                        color: const Color(0xFF800080),
                        iconSize: 24,
                      ),
                    ],
                  ),
                ),
                // Subtotal y eliminar
                Column(
                  crossAxisAlignment: CrossAxisAlignment.end,
                  children: [
                    Text(
                      'Subtotal: \$${producto.subtotal.toStringAsFixed(0)}',
                      style: const TextStyle(
                        fontSize: 14,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                    TextButton.icon(
                      onPressed: () => _confirmarEliminacion(index),
                      icon: const Icon(Icons.delete_outline, size: 18),
                      label: const Text('Eliminar'),
                      style: TextButton.styleFrom(foregroundColor: Colors.red),
                    ),
                  ],
                ),
              ],
            ),
            // Stock disponible
            Align(
              alignment: Alignment.centerLeft,
              child: Padding(
                padding: const EdgeInsets.only(left: 12),
                child: Text(
                  'Stock: ${producto.stock}',
                  style: TextStyle(fontSize: 12, color: Colors.grey[600]),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildFooterCarrito() {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: Colors.white,
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.1),
            blurRadius: 4,
            offset: const Offset(0, -2),
          ),
        ],
      ),
      child: SafeArea(
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                TextButton.icon(
                  onPressed: procesandoCompra ? null : _vaciarCarrito,
                  icon: const Icon(Icons.delete_sweep),
                  label: const Text('Vaciar carrito'),
                  style: TextButton.styleFrom(foregroundColor: Colors.red),
                ),
                Column(
                  crossAxisAlignment: CrossAxisAlignment.end,
                  children: [
                    const Text(
                      'Total:',
                      style: TextStyle(fontSize: 14, color: Colors.grey),
                    ),
                    Text(
                      '\$${total.toStringAsFixed(0)} COP',
                      style: const TextStyle(
                        fontSize: 24,
                        fontWeight: FontWeight.bold,
                        color: Color(0xFF800080),
                      ),
                    ),
                  ],
                ),
              ],
            ),
            const SizedBox(height: 12),
            Row(
              children: [
                Expanded(
                  child: OutlinedButton.icon(
                    onPressed: procesandoCompra
                        ? null
                        : () => Navigator.pop(context),
                    icon: const Icon(Icons.arrow_back),
                    label: const Text('Seguir comprando'),
                    style: OutlinedButton.styleFrom(
                      foregroundColor: const Color(0xFF800080),
                      side: const BorderSide(color: Color(0xFF800080)),
                      padding: const EdgeInsets.symmetric(vertical: 16),
                    ),
                  ),
                ),
                const SizedBox(width: 12),
                Expanded(
                  child: ElevatedButton.icon(
                    onPressed: cantidadSeleccionada == 0 || procesandoCompra
                        ? null
                        : _finalizarCompra,
                    icon: procesandoCompra
                        ? const SizedBox(
                            width: 18,
                            height: 18,
                            child: CircularProgressIndicator(
                              strokeWidth: 2,
                              valueColor: AlwaysStoppedAnimation<Color>(
                                Colors.white,
                              ),
                            ),
                          )
                        : const Icon(Icons.check_circle),
                    label: Text(
                      procesandoCompra
                          ? 'Procesando...'
                          : 'Comprar ($cantidadSeleccionada)',
                    ),
                    style: ElevatedButton.styleFrom(
                      backgroundColor: const Color(0xFF800080),
                      foregroundColor: Colors.white,
                      padding: const EdgeInsets.symmetric(vertical: 16),
                    ),
                  ),
                ),
              ],
            ),
            if (cantidadSeleccionada == 0)
              const Padding(
                padding: EdgeInsets.only(top: 8),
                child: Text(
                  'Selecciona al menos un producto',
                  style: TextStyle(color: Colors.red, fontSize: 12),
                ),
              ),
          ],
        ),
      ),
    );
  }
}