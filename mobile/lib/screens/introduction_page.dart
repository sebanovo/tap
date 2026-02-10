import 'package:flutter/material.dart';
import 'package:mobile/constants/env.dart';

class IntroductionPage extends StatelessWidget {
  final VoidCallback onComplete;

  const IntroductionPage({super.key, required this.onComplete});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      body: SafeArea(
        child: Center(
          child: Padding(
            padding: const EdgeInsets.all(20.0),
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                // Logo
                Container(
                  width: 150,
                  height: 150,
                  decoration: BoxDecoration(
                    color: Colors.blue.shade50,
                    borderRadius: BorderRadius.circular(75),
                  ),
                  child: const Icon(
                    Icons.security_rounded,
                    size: 80,
                    color: Colors.blue,
                  ),
                ),

                const SizedBox(height: 40),

                // Título
                const Text(
                  'Bienvenido',
                  style: TextStyle(
                    fontSize: 32,
                    fontWeight: FontWeight.bold,
                    color: Colors.blue,
                  ),
                ),

                const SizedBox(height: 10),

                // Subtítulo
                Text(
                  Env.systemName,
                  style: const TextStyle(fontSize: 18, color: Colors.grey),
                ),

                const SizedBox(height: 40),

                // Características
                _buildFeature(
                  icon: Icons.security_rounded,
                  title: 'Seguridad Total',
                  description: 'Protección avanzada para tu comunidad',
                ),

                const SizedBox(height: 20),

                _buildFeature(
                  icon: Icons.group_rounded,
                  title: 'Gestión de Usuarios',
                  description: 'Administra accesos y permisos fácilmente',
                ),

                const SizedBox(height: 20),

                _buildFeature(
                  icon: Icons.dashboard_rounded,
                  title: 'Panel de Control',
                  description: 'Monitorea todo desde un solo lugar',
                ),

                const Spacer(),

                // Botón
                SizedBox(
                  width: double.infinity,
                  child: ElevatedButton(
                    onPressed: onComplete,
                    style: ElevatedButton.styleFrom(
                      backgroundColor: Colors.blue,
                      padding: const EdgeInsets.symmetric(vertical: 16),
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(10),
                      ),
                    ),
                    child: const Text(
                      'Comenzar',
                      style: TextStyle(
                        fontSize: 18,
                        fontWeight: FontWeight.bold,
                        color: Colors.white,
                      ),
                    ),
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildFeature({
    required IconData icon,
    required String title,
    required String description,
  }) {
    return Row(
      children: [
        Container(
          padding: const EdgeInsets.all(10),
          decoration: BoxDecoration(
            color: Colors.blue.shade50,
            borderRadius: BorderRadius.circular(10),
          ),
          child: Icon(icon, color: Colors.blue, size: 30),
        ),

        const SizedBox(width: 15),

        Expanded(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                title,
                style: const TextStyle(
                  fontSize: 16,
                  fontWeight: FontWeight.bold,
                  color: Colors.black87,
                ),
              ),

              const SizedBox(height: 4),

              Text(
                description,
                style: const TextStyle(fontSize: 14, color: Colors.black54),
              ),
            ],
          ),
        ),
      ],
    );
  }
}
