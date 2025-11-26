import 'package:flutter/material.dart';
import 'dart:async';
import '../widgets/header_widget_home.dart'; // Importamos el Header superior
import '../widgets/footer_widget_home.dart'; // Importamos el Footer

// 💡 Color del Navbar y Header: 0xFFE6C7F6 (Malva Claro)
const Color _navbarColor = Color(0xFFE6C7F6); 

class HomePage extends StatefulWidget {
  const HomePage({Key? key}) : super(key: key);

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  final PageController _pageController = PageController();
  late Timer _timer;
  int _currentSlide = 0;
  
  // Usamos una GlobalKey para abrir el Drawer sin tener un Scaffold con AppBar
  final GlobalKey<ScaffoldState> _scaffoldKey = GlobalKey<ScaffoldState>();

  final List<Map<String, String>> productos = [
    {'image': 'assets/images/Aguacate 2.jpg'},
    {'image': 'assets/images/Mafalda.jpg'},
    {'image': 'assets/images/Bob Esponja 2.jpg'},
    {'image': 'assets/images/Coco.jpg'},
    {'image': 'assets/images/Aguacate. Parejajpg.jpg'},
    {'image': 'assets/images/Escandalosos Amigos.jpg'},
    {'image': 'assets/images/Barman.jpg'},
    {'image': 'assets/images/Cerdito.jpg'},
    {'image': 'assets/images/Liga de la Justicia.jpg'},
    {'image': 'assets/images/Micke Mouse.jpg'},
    {'image': 'assets/images/Minni Mouse.jpg'},
    {'image': 'assets/images/Scoby Do.jpg'},
    
  ];

  final List<String> sliderImages = [
    'assets/images/Slider 2.jpg',
    'assets/images/Slider 3.png',
  ];

  @override
  void initState() {
    super.initState();
    _pageController.addListener(() {
      setState(() {
        _currentSlide = _pageController.page?.round() ?? 0;
      });
    });
    _timer = Timer.periodic(const Duration(seconds: 3), (Timer timer) {
      if (_currentSlide < sliderImages.length - 1) {
        _currentSlide++;
      } else {
        _currentSlide = 0;
      }
      _pageController.animateToPage(
        _currentSlide,
        duration: const Duration(milliseconds: 300),
        curve: Curves.easeIn,
      );
    });
  }

  @override
  void dispose() {
    _timer.cancel();
    _pageController.dispose();
    super.dispose();
  }

  void _showImageModal(String imagePath) {
    showDialog(
      context: context,
      builder: (context) => Dialog(
        child: GestureDetector(
          onTap: () => Navigator.pop(context),
          child: Image.asset(
            imagePath,
            fit: BoxFit.contain,
          ),
        ),
      ),
    );
  }

  // Nuevo método para manejar el botón de menú en móvil
  void _openDrawer() {
    _scaffoldKey.currentState?.openEndDrawer(); 
  }

  @override
  Widget build(BuildContext context) {
    bool isMobile = MediaQuery.of(context).size.width < 768;

    return Scaffold(
      key: _scaffoldKey, // Asignamos la key al Scaffold
      backgroundColor: Colors.white,
      
      // En lugar de AppBar, usamos un Drawer (para móvil) que se abre con un botón
      drawer: isMobile ? _buildDrawer(context) : null,
      
      // La estructura principal de la página es una columna que apila los encabezados y el contenido
      body: Column(
        children: [
          // 1. Header (Logo + Auth/Menu)
          _buildTopHeader(isMobile),

          // 2. Navbar (Inicio + Tienda)
          _buildNavbar(isMobile),

          // 3. Contenido Principal (con scroll) y el FOOTER
          Expanded(
            child: SingleChildScrollView(
              child: Column(
                children: [
                  _buildInicioSection(),
                  const Divider(thickness: 2, height: 40),
                  _buildProductosSection(),
                  const Divider(thickness: 2, height: 40),
                  _buildQuienesSomosSection(),
                  const Divider(thickness: 2, height: 40),
                  _buildFeaturesSection(),
                  const Divider(thickness: 2, height: 40),
                  _buildUbicacionSection(),
                  const SizedBox(height: 40),
                  
                  // ✅ INTEGRACIÓN DEL FOOTER
                  const FooterWidgetHome(), 
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }
  
  // --- WIDGETS DE ENCABEZADO APILADOS ---

  Widget _buildTopHeader(bool isMobile) {
    if (isMobile) {
      return Container(
        color: _navbarColor,
        padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 5),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            const Row(
              children: [
                ClipRRect(
                 borderRadius: BorderRadius.all(Radius.circular(5.0)),
                  child: Image(
                    image: AssetImage('assets/images/Logo Vibra Positiva.jpg'),
                    width: 30,
                    height: 30,
                    fit: BoxFit.cover,
                  ),
                ),
                SizedBox(width: 8),
                Text(
                  'Vibra Positiva Pijamas',
                  style: TextStyle(
                    fontSize: 16,
                    fontWeight: FontWeight.bold,
                    color: Colors.black87,
                  ),
                ),
              ],
            ),
            IconButton(
              icon: const Icon(Icons.menu, color: Colors.black),
              onPressed: _openDrawer,
            ),
          ],
        ),
      );
    }
    return const HeaderWidgetHome();
  }

  Widget _buildDrawer(BuildContext context) {
    return Drawer(
      child: Container(
        color: _navbarColor,
        child: ListView(
          padding: EdgeInsets.zero,
          children: [
            DrawerHeader(
              decoration: BoxDecoration(color: _navbarColor),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const Text(
                    'Menú Principal',
                    style: TextStyle(color: Colors.black, fontSize: 24, fontWeight: FontWeight.bold),
                  ),
                  const Spacer(),
                  Row(
                    children: [
                      _buildDrawerAuthItem('Registrarse', Icons.person_add, 'Registro', context),
                      const SizedBox(width: 10),
                      _buildDrawerAuthItem('Iniciar Sesión', Icons.door_front_door, 'Login', context),
                    ],
                  ),
                ],
              ),
            ),
            _buildDrawerItem('Inicio', Icons.home, '#home_page.dart', context),
            _buildDrawerItem('Tienda', Icons.shopping_bag, 'tienda', context),
          ],
        ),
      ),
    );
  }
  
  Widget _buildDrawerItem(String text, IconData icon, String route, BuildContext context) {
    return ListTile(
      leading: Icon(icon, color: Colors.black54),
      title: Text(
        text,
        style: const TextStyle(
          color: Colors.black,
          fontSize: 18,
          fontWeight: FontWeight.w500,
        ),
      ),
      onTap: () {
        Navigator.pop(context); 
        // Implementar navegación
      },
      splashColor: Colors.black12,
      hoverColor: Colors.black12,
    );
  }

  Widget _buildDrawerAuthItem(String text, IconData icon, String route, BuildContext context) {
    return TextButton.icon(
      onPressed: () {
        Navigator.pop(context);
        // Lógica de navegación.
      },
      icon: Icon(icon, color: Colors.black, size: 18),
      label: Text(
        text,
        style: const TextStyle(color: Colors.black, fontWeight: FontWeight.bold),
      ),
      style: TextButton.styleFrom(
        backgroundColor: Colors.white.withOpacity(0.8),
      ),
    );
  }


  Widget _buildNavbar(bool isMobile) {
    if (isMobile) {
      return Container(
        color: _navbarColor,
        padding: const EdgeInsets.symmetric(vertical: 10),
        child: Center(
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceEvenly,
            children: [
              _buildNavItem('Inicio', '#inicio'),
              _buildNavItem('Tienda', '#tienda'),
            ],
          ),
        ),
      );
    }
    
    return Container(
      color: _navbarColor,
      padding: const EdgeInsets.symmetric(vertical: 15),
      child: Center(
        child: Wrap(
          spacing: 30,
          alignment: WrapAlignment.center,
          children: [
            _buildNavItem('🏠 Inicio', '#inicio'),
            _buildNavItem('🛒 Tienda', '#tienda'),
          ],
        ),
      ),
    );
  }

  Widget _buildNavItem(String text, String route) {
    return TextButton(
      onPressed: () {
        // Lógica de navegación o scroll
      },
      child: Text(
        text,
        style: const TextStyle(
          color: Colors.black,
          fontSize: 16,
          fontWeight: FontWeight.bold,
          shadows: [
            Shadow(
              color: Colors.white, 
              offset: Offset(0, 1), 
              blurRadius: 2
            ),
          ],
        ),
      ),
    );
  }

  // --- WIDGETS DE SECCIÓN (Contenido de la Página) ---
  
  Widget _buildInicioSection() {
    return Container(
      padding: const EdgeInsets.all(40),
      child: LayoutBuilder(
        builder: (context, constraints) {
          bool isMobile = constraints.maxWidth < 768;
          
          if (isMobile) {
            return Column(
              children: [
                _buildInicioText(),
                const SizedBox(height: 30),
                _buildSlider(),
              ],
            );
          }
          
          return Row(
            children: [
              Expanded(child: _buildInicioText()),
              const SizedBox(width: 40),
              Expanded(child: _buildSlider()),
            ],
          );
        },
      ),
    );
  }

  Widget _buildInicioText() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.center,
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        const Text(
          'Descansar bien también es parte del éxito',
          textAlign: TextAlign.center,
          style: TextStyle(
            fontSize: 42,
            fontWeight: FontWeight.bold,
            height: 1.3,
            color: Colors.black87,
          ),
        ),
        const SizedBox(height: 25),
        const Text(
          'Comienza tu día con energía positiva y alcanza cada meta que te propongas. La comodidad empieza contigo.',
          textAlign: TextAlign.center,
          style: TextStyle(
            fontSize: 18,
            color: Colors.black54,
            height: 1.5,
          ),
        ),
        const SizedBox(height: 30),
        ElevatedButton(
          onPressed: () {
            // Navegar a tienda
          },
          style: ElevatedButton.styleFrom(
            backgroundColor: Colors.black87,
            foregroundColor: Colors.white,
            padding: const EdgeInsets.symmetric(
              horizontal: 40,
              vertical: 18,
            ),
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(5),
            ),
          ),
          child: const Text(
            'Ver productos',
            style: TextStyle(
              fontSize: 16,
              fontWeight: FontWeight.bold,
            ),
          ),
        ),
      ],
    );
  }

  Widget _buildSlider() {
    return Column(
      children: [
        Container(
          height: 400,
          decoration: BoxDecoration(
            borderRadius: BorderRadius.circular(15),
          ),
          child: PageView.builder(
            controller: _pageController,
            itemCount: sliderImages.length,
            onPageChanged: (index) {
              setState(() {
                _currentSlide = index;
              });
            },
            itemBuilder: (context, index) {
              return Container(
                margin: const EdgeInsets.symmetric(horizontal: 5),
                child: ClipRRect(
                  borderRadius: BorderRadius.circular(15),
                  child: Image.asset(
                    sliderImages[index],
                    fit: BoxFit.cover,
                    errorBuilder: (context, error, stackTrace) {
                      return Container(
                        color: Colors.grey[300],
                        child: const Center(
                          child: Icon(Icons.image, size: 50),
                        ),
                      );
                    },
                  ),
                ),
              );
            },
          ),
        ),
        const SizedBox(height: 15),
        Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: sliderImages.asMap().entries.map((entry) {
            return GestureDetector(
              onTap: () {
                _pageController.animateToPage(
                  entry.key,
                  duration: const Duration(milliseconds: 400),
                  curve: Curves.easeInOut,
                );
              },
              child: Container(
                width: 10,
                height: 10,
                margin: const EdgeInsets.symmetric(horizontal: 4),
                decoration: BoxDecoration(
                  shape: BoxShape.circle,
                  color: _currentSlide == entry.key
                      ? const Color(0xFF9B7EBD) 
                      : Colors.grey[400],
                ),
              ),
            );
          }).toList(),
        ),
      ],
    );
  }

  Widget _buildProductosSection() {
    return Container(
      padding: const EdgeInsets.all(40),
      child: Column(
        children: [
          const Text(
            'Nuestros Productos',
            style: TextStyle(
              fontSize: 36,
              fontWeight: FontWeight.bold,
              color: Colors.black87,
            ),
          ),
          const SizedBox(height: 30),
          GridView.builder(
            shrinkWrap: true,
            physics: const NeverScrollableScrollPhysics(),
            gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
              crossAxisCount: MediaQuery.of(context).size.width > 768 ? 4 : 2,
              crossAxisSpacing: 15,
              mainAxisSpacing: 15,
              childAspectRatio: 0.65, 
            ),
            itemCount: productos.length,
            itemBuilder: (context, index) {
              return GestureDetector(
                onTap: () => _showImageModal(productos[index]['image']!),
                child: Padding(
                  padding: const EdgeInsets.all(4.0),
                  child: ClipRRect(
                    borderRadius: BorderRadius.circular(10),
                    child: Image.asset(
                      productos[index]['image']!,
                      fit: BoxFit.cover, 
                      errorBuilder: (context, error, stackTrace) {
                        return Container(
                          color: Colors.grey[300],
                          child: const Center(
                            child: Icon(Icons.image, size: 40),
                          ),
                        );
                      },
                    ),
                  ),
                ),
              );
            },
          ),
        ],
      ),
    );
  }

  Widget _buildQuienesSomosSection() {
    return Container(
      padding: const EdgeInsets.all(40),
      child: Column(
        children: [
          const Text(
            'Quiénes Somos',
            style: TextStyle(
              fontSize: 36,
              fontWeight: FontWeight.bold,
              color: Colors.black87,
            ),
          ),
          const SizedBox(height: 30),
          LayoutBuilder(
            builder: (context, constraints) {
              bool isMobile = constraints.maxWidth < 768;
              
              if (isMobile) {
                return Column(
                  children: [
                    _buildQuienesSomosText(),
                    const SizedBox(height: 30),
                    _buildQuienesSomosLogo(),
                  ],
                );
              }
              
              return Row(
                children: [
                  Expanded(child: _buildQuienesSomosText()),
                  const SizedBox(width: 40),
                  Expanded(child: _buildQuienesSomosLogo()),
                ],
              );
            },
          ),
        ],
      ),
    );
  }

  Widget _buildQuienesSomosText() {
    return const Text(
      'Vibra Positiva nació en 2020 como una iniciativa familiar que combinó creatividad, pasión por el diseño y visión emprendedora. Empezamos elaborando productos de bioseguridad, y fue una tela con estampado de aguacates la que nos inspiró a ir más allá. A partir de ese momento, descubrimos en las pijamas una forma de expresar bienestar, color y personalidad. Creamos nuestros primeros diseños digitales con dedicación y comenzamos a compartirlos en redes sociales, donde muchas personas conectaron con nuestra propuesta. Hoy, seguimos creciendo con el mismo propósito: ofrecer comodidad, estilo y buena energía en cada prenda, acompañando los momentos de descanso con auténtica vibra positiva.',
      textAlign: TextAlign.center,
      style: TextStyle(
        fontSize: 18,
        color: Colors.black87,
        height: 1.6,
      ),
    );
  }

  Widget _buildQuienesSomosLogo() {
    return Center(
      child: ClipRRect(
        borderRadius: BorderRadius.circular(20),
        child: Image.asset(
          'assets/images/Logo Vibra Positiva.jpg',
          width: 300,
          height: 300,
          fit: BoxFit.contain,
          errorBuilder: (context, error, stackTrace) {
            return Container(
              width: 300,
              height: 300,
              color: Colors.grey[300],
              child: const Center(
                child: Icon(Icons.image, size: 60),
              ),
            );
          },
        ),
      ),
    );
  }

  Widget _buildFeaturesSection() {
    return Container(
      color: Colors.white,
      padding: const EdgeInsets.all(40),
      child: LayoutBuilder(
        builder: (context, constraints) {
          bool isMobile = constraints.maxWidth < 768;
          
          if (isMobile) {
            return Column(
              children: [
                _buildFeatureCard(
                  'assets/images/pijamas.jpg',
                  'Diseño',
                  'Imaginamos juntos qué es lo que más te gustaría, todo nuestro equipo de diseño está presto siempre a escucharte y a pensar lo impensable para ti. Si algún día tienes una idea de Pijama o babucha y la quieres compartir, estamos aquí en cualquier canal para desarrollarla.',
                ),
                const SizedBox(height: 30),
                _buildFeatureCard(
                  'assets/images/corazon morado.png',
                  'Comodidad',
                  'Investigamos los materiales más cómodos y con la mejor sensación al tacto con la piel, de esta manera cuando tocas tu lugar de descanso vas a experimentar una sensación indescriptible.',
                ),
                const SizedBox(height: 30),
                _buildFeatureCard(
                  'assets/images/Maquina de Coser.jpg',
                  'Calidad',
                  'Fabricamos tus hermosas pijamas, todo un equipo de madres cabeza de hogar expertas en el proceso textil. Nosotros mismos hacemos todo el proceso desde el corte, hasta la confección y empaque, comprometidos en darte un diseño único de excelente calidad.',
                ),
              ],
            );
          }
          
          return Row(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Expanded(
                child: _buildFeatureCard(
                  'assets/images/pijamas.jpg',
                  'Diseño',
                  'Imaginamos juntos qué es lo que más te gustaría, todo nuestro equipo de diseño de está presto siempre a escucharte y a pensar lo impensable para ti. Si algún día tienes una idea de Pijama o babucha y la quieres compartir, estamos aquí en cualquier canal para desarrollarla.',
                ),
              ),
              const SizedBox(width: 20),
              Expanded(
                child: _buildFeatureCard(
                  'assets/images/corazon morado.png',
                  'Comodidad',
                  'Investigamos los materiales más cómodos y con la mejor sensación al tacto con la piel, de esta manera cuando tocas tu lugar de descanso vas a experimentar una sensación indescriptible.',
                ),
              ),
              const SizedBox(width: 20),
              Expanded(
                child: _buildFeatureCard(
                  'assets/images/Maquina de Coser.jpg',
                  'Calidad',
                  'Fabricamos tus hermosas pijamas, todo un equipo de madres cabeza de hogar expertas en el proceso textil. Nosotros mismos hacemos todo el proceso desde el corte, hasta la confección y empaque, comprometidos en darte un diseño único de excelente calidad.',
                ),
              ),
            ],
          );
        },
      ),
    );
  }

  Widget _buildFeatureCard(String imagePath, String title, String description) {
    return Card(
      margin: EdgeInsets.zero,
      elevation: 5,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(10),
      ),
      child: Padding(
        padding: const EdgeInsets.all(20.0),
        child: Column(
          children: [
            Image.asset(
              imagePath,
              width: 120,
              height: 120,
              errorBuilder: (context, error, stackTrace) {
                return Container(
                  width: 120,
                  height: 120,
                  color: Colors.grey[300],
                  child: const Center(
                    child: Icon(Icons.image, size: 40),
                  ),
                );
              },
            ),
            const SizedBox(height: 15),
            Text(
              title,
              style: const TextStyle(
                fontSize: 22,
                fontWeight: FontWeight.bold,
                color: Colors.black87,
              ),
            ),
            const SizedBox(height: 10),
            Text(
              description,
              textAlign: TextAlign.center,
              style: const TextStyle(
                fontSize: 15,
                color: Colors.black54,
                height: 1.5,
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildUbicacionSection() {
    return Container(
      padding: const EdgeInsets.all(40),
      child: Column(
        children: [
          const Text(
            'Dónde Estamos',
            style: TextStyle(
              fontSize: 36,
              fontWeight: FontWeight.bold,
              color: Colors.black87,
            ),
          ),
          const SizedBox(height: 30),
          Container(
            decoration: BoxDecoration(
              color: Colors.white,
              borderRadius: BorderRadius.circular(10),
              boxShadow: [
                BoxShadow(
                  color: Colors.grey.withOpacity(0.3),
                  spreadRadius: 2,
                  blurRadius: 5,
                ),
              ],
            ),
            padding: const EdgeInsets.all(10),
            child: ClipRRect(
              borderRadius: BorderRadius.circular(10),
              child: const SizedBox(
                height: 450,
                child: Center(
                  child: Padding(
                    padding: EdgeInsets.all(20.0),
                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        Icon(Icons.map, size: 60, color: Color(0xFF9B7EBD)),
                        SizedBox(height: 15),
                        Text(
                          'Ubicación de la tienda (Mapa Interactivo)',
                          textAlign: TextAlign.center,
                          style: TextStyle(
                            fontSize: 20,
                            fontWeight: FontWeight.bold,
                            color: Colors.black87
                          ),
                        ),
                        SizedBox(height: 10),
                        Text(
                          'Cl. 2 Sur #10-39, Antonio Nariño, Bogotá D.C., Colombia',
                          textAlign: TextAlign.center,
                          style: TextStyle(fontSize: 16, color: Colors.black54),
                        ),
                        SizedBox(height: 20),
                        Text(
                          'Nota: Para ver un mapa real, se necesita el paquete `Maps_flutter` y una clave de API.',
                          textAlign: TextAlign.center,
                          style: TextStyle(fontSize: 14, color: Colors.red),
                        ),
                      ],
                    ),
                  ),
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }
}

   //borderRadius: BorderRadius.all(Radius.circular(5.0)),