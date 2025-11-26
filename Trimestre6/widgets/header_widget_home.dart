// lib/widgets/header_widget_home.dart

import 'package:flutter/material.dart';

// El color de fondo para el Header superior (igual que el Navbar)
const Color _navbarColor = Color(0xFFE6C7F6); 

class HeaderWidgetHome extends StatelessWidget {
  const HeaderWidgetHome({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    bool isMobile = MediaQuery.of(context).size.width < 768;

    return Container(
      // Simula el color de fondo y sombra
      decoration: BoxDecoration(
        color: _navbarColor,
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.1),
            spreadRadius: 1,
            blurRadius: 3,
            offset: const Offset(0, 2),
          ),
        ],
      ),
      padding: EdgeInsets.symmetric(
        horizontal: isMobile ? 15 : 40, // Menos padding en móvil
        vertical: isMobile ? 8 : 10,
      ), 
      
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        crossAxisAlignment: CrossAxisAlignment.center,
        children: [
          // 1. Logo + Título
          Row(
            children: [
              // 1.1 Logo
              ClipRRect(
                borderRadius: BorderRadius.circular(5.0),
                child: Image.asset(
                  'assets/images/Logo Vibra Positiva.jpg',
                  width: isMobile ? 30 : 35, // Tamaño más pequeño en móvil
                  height: isMobile ? 30 : 35,
                  fit: BoxFit.cover,
                ),
              ),
              const SizedBox(width: 8),
              // 1.2 Título
              Text(
                'Vibra Positiva Pijamas',
                style: TextStyle(
                  fontSize: isMobile ? 16 : 18, // Tamaño de fuente ajustado
                  fontWeight: FontWeight.bold,
                  color: Colors.black87,
                ),
              ),
            ],
          ),

          // 2. Botones Registrarse e Iniciar Sesión (Ocultos en móvil para ahorrar espacio)
          if (!isMobile)
            Row(
              mainAxisSize: MainAxisSize.min,
              children: [
                _buildAuthButton(
                  icon: Icons.person_add,
                  text: 'Registrarse',
                  route: 'Registro',
                ),
                const SizedBox(width: 8),

                _buildAuthButton(
                  icon: Icons.door_front_door,
                  text: 'Iniciar Sesión',
                  route: 'Login',
                ),
              ],
            )
        ],
      ),
    );
  }

  // Widget auxiliar para construir los botones de Login/Registro
  Widget _buildAuthButton({
    required IconData icon,
    required String text,
    required String route,
  }) {
    return TextButton(
      onPressed: () {
        // Lógica de navegación.
      },
      style: TextButton.styleFrom(
        foregroundColor: Colors.black,
        padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 5),
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(5),
          side: const BorderSide(color: Colors.transparent),
        ),
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          Text(
            text,
            style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 14),
          ),
          const SizedBox(width: 4),
          Icon(icon, size: 18),
        ],
      ),
    );
  }
}