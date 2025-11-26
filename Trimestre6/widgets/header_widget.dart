import 'package:flutter/material.dart';

class HeaderWidget extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Container(
      height: 180,
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(25),
        image: const DecorationImage(
          image: AssetImage('assets/images/fondoVibraPositiva.jpeg'),
          fit: BoxFit.cover,
        ),
      ),
    );
  }
}
