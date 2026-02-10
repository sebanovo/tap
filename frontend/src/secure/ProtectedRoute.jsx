import { Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Env from '../constants/env';

function ProtectedRoute({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const validateSession = async () => {
      try {
        const token = localStorage.getItem('token');

        if (!token) {
          setIsAuthenticated(false);
          setLoading(false);
          return;
        }

        // Llamar a la nueva ruta de verificación
        const response = await fetch(`http://${Env.VITE_SERVER_HOST}:3000/auth/verify`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        const data = await response.json();

        if (response.ok && data.success) {
          setIsAuthenticated(true);

          if (data.token) {
            localStorage.setItem('token', data.token);
          }
        } else {
          console.error('Error de autenticación:', data.error);
          localStorage.removeItem('token');
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error('Error validando sesión:', error);
        localStorage.removeItem('token');
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    validateSession();
  }, []);

  if (loading) {
    return (
      <div className='flex min-h-screen items-center justify-center'>
        <div className='text-lg'>Verificando sesión...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to='/login' replace />;
  }

  // Pasar los datos del usuario a los componentes hijos si es necesario
  return children;
}

export default ProtectedRoute;
