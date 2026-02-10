import 'package:flutter/material.dart';
import 'package:mobile/constants/env.dart';
import 'package:mobile/screens/home_page.dart';
import 'package:mobile/screens/login_page.dart';
import 'package:mobile/screens/introduction_page.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';

Future<void> main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await dotenv.load(fileName: ".env");
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: Env.systemName,
      theme: ThemeData(primarySwatch: Colors.blue, useMaterial3: true),
      home: const InitialPage(),
      routes: {
        '/login': (_) => const LoginPage(),
        '/home': (_) => const HomePage(),
      },
    );
  }
}

// Widget inicial que decide qué página mostrar
class InitialPage extends StatefulWidget {
  const InitialPage({super.key});

  @override
  State<InitialPage> createState() => _InitialPageState();
}

class _InitialPageState extends State<InitialPage> {
  bool _showIntroduction = true;
  bool _isLoggedIn = false;
  bool _isLoading = true;

  @override
  void initState() {
    super.initState();
    _checkFirstTimeAndLogin();
  }

  Future<void> _checkFirstTimeAndLogin() async {
    final prefs = await SharedPreferences.getInstance();

    // Verificar si es la primera vez
    final firstTime = prefs.getBool('first_time') ?? true;

    // Verificar si hay token guardado
    final token = prefs.getString('token');

    // Aquí podrías validar el token con tu API
    final isValidToken = token != null && token.isNotEmpty;

    setState(() {
      _showIntroduction = firstTime;
      _isLoggedIn = isValidToken;
      _isLoading = false;
    });
  }

  @override
  Widget build(BuildContext context) {
    if (_isLoading) {
      return const SplashScreen();
    }

    if (_showIntroduction) {
      return IntroductionPage(
        onComplete: () async {
          final prefs = await SharedPreferences.getInstance();
          await prefs.setBool('first_time', false);
          if (_isLoggedIn) {
            Navigator.pushReplacementNamed(context, '/home');
          } else {
            Navigator.pushReplacementNamed(context, '/login');
          }
        },
      );
    }

    if (_isLoggedIn) {
      return const HomePage();
    }

    return const LoginPage();
  }
}

// Pantalla de carga inicial
class SplashScreen extends StatelessWidget {
  const SplashScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            // Logo
            Container(
              width: 100,
              height: 100,
              decoration: BoxDecoration(
                color: Colors.blue.shade50,
                borderRadius: BorderRadius.circular(50),
              ),
              child: const Icon(
                Icons.security_rounded,
                size: 60,
                color: Colors.blue,
              ),
            ),

            const SizedBox(height: 20),

            // Nombre del sistema
            Text(
              Env.systemName,
              style: const TextStyle(
                fontSize: 24,
                fontWeight: FontWeight.bold,
                color: Colors.blue,
              ),
            ),

            const SizedBox(height: 20),

            // Spinner
            const CircularProgressIndicator(color: Colors.blue),
          ],
        ),
      ),
    );
  }
}
