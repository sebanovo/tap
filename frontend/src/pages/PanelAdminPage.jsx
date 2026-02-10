import { useState, useEffect } from 'react';
import Sidebar from '../components/SideBar';
import Env from '../constants/env';
import { useNavigate } from 'react-router-dom';
import { DashboardContent, UsuariosContent } from './content';

export default function PanelAdminPage() {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://${Env.VITE_SERVER_HOST}:3000/auth/verify`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      setUserData(data.user);
    } catch (error) {
      console.error('Error al cargar datos del usuario:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    // Eliminar token y datos de usuario
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    // Opcional: Limpiar state global (si usas Context, Redux, etc.)

    // Redirigir al login
    navigate('/login');

    // Opcional: Forzar recarga para limpiar estado
    window.location.reload();
  };

  // Función para obtener iniciales del nombre
  const getInitials = (name) => {
    if (!name) return 'U';

    const names = name.trim().split(' ');
    if (names.length === 1) {
      return names[0].charAt(0).toUpperCase();
    }

    return (names[0].charAt(0) + names[names.length - 1].charAt(0)).toUpperCase();
  };

  // Función para obtener nombre para mostrar
  const getDisplayName = () => {
    if (!userData) return 'Usuario';

    if (userData.username && userData.username.trim()) {
      return userData.username;
    }

    if (userData.email) {
      return userData.email.split('@')[0];
    }

    return 'Usuario';
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return <DashboardContent />;
      case 'usuarios':
        return <UsuariosContent />;
      default:
        return <DashboardContent />;
    }
  };

  return (
    <div className='flex h-screen bg-gray-100'>
      <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />
      <div className='flex flex-1 flex-col overflow-hidden'>
        <header className='bg-white shadow-sm'>
          <div className='flex items-center justify-between px-6 py-4'>
            <h1 className='text-2xl font-semibold text-gray-900'>
              Panel de Administración - {Env.VITE_SYSTEM_NAME}
            </h1>
            <div className='flex items-center space-x-4'>
              {loading ? (
                <div className='flex items-center space-x-3'>
                  <div className='h-8 w-8 animate-pulse rounded-full bg-gray-300'></div>
                  <div className='h-4 w-24 animate-pulse rounded bg-gray-300'></div>
                </div>
              ) : (
                <>
                  <div className='flex items-center space-x-3'>
                    {/* Avatar del usuario */}
                    {userData?.photo_url ? (
                      <img
                        src={userData.photo_url}
                        alt={getDisplayName()}
                        className='h-8 w-8 rounded-full border-2 border-green-200 object-cover'
                      />
                    ) : (
                      <div className='flex h-8 w-8 items-center justify-center rounded-full bg-green-600 text-sm font-medium text-white'>
                        {getInitials(getDisplayName())}
                      </div>
                    )}

                    <div className='flex flex-col'>
                      <span className='text-sm font-medium text-gray-900'>{getDisplayName()}</span>
                      <span className='text-xs text-gray-500'>
                        {userData?.groups?.[0]?.name || 'Usuario'}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={handleLogout}
                    className='rounded-lg bg-green-600 px-4 py-2 text-white transition hover:bg-green-700'
                  >
                    Cerrar sesión
                  </button>
                </>
              )}
            </div>
          </div>
        </header>
        <main className='flex-1 overflow-y-auto p-6'>{renderContent()}</main>
      </div>
    </div>
  );
}
