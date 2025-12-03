import 'package:flutter/material.dart';

import '../widgets/form_widget.dart';
import '../widgets/footer_widget.dart';
import '../widgets/header_widget.dart';
class RegistroTareasPage extends StatelessWidget {
  const RegistroTareasPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFFE6C7F6),
      body: SafeArea(
        child: SingleChildScrollView(
          child: Padding(
            padding: const EdgeInsets.all(16),
            child: Column(
              children: [
                HeaderWidget(),
                const SizedBox(height: 20),
                FormWidget(),
                const SizedBox(height: 20),
                FooterWidget(),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
