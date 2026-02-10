import { useState, useEffect } from 'react';
import Env from '../../constants/env';

export default function UsuariosContent() {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const fetchUsuarios = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://${Env.VITE_SERVER_HOST}:3000/users`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setUsuarios(data);
    } catch (error) {
      console.error('Error al cargar usuarios:', error);
      setError('Error al cargar los usuarios');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className='flex h-64 items-center justify-center'>
        <div className='h-12 w-12 animate-spin rounded-full border-b-2 border-green-600'></div>
      </div>
    );
  }

  return (
    <div className='space-y-6'>
      <div className='flex items-center justify-between'>
        <h1 className='text-3xl font-bold text-gray-900'>Usuarios</h1>
        <button
          onClick={fetchUsuarios}
          className='rounded-lg bg-green-600 px-4 py-2 text-white transition hover:bg-green-700'
        >
          Actualizar
        </button>
      </div>

      {error && (
        <div className='rounded border border-red-200 bg-red-50 px-4 py-3 text-red-700'>
          {error}
        </div>
      )}

      {/* Estadísticas */}
      <div className='grid grid-cols-1 gap-4 md:grid-cols-3'>
        <div className='rounded-lg bg-white p-4 shadow'>
          <div className='flex items-center'>
            <div className='rounded-full bg-green-100 p-3'>
              <span className='text-xl text-green-600'>👥</span>
            </div>
            <div className='ml-4'>
              <p className='text-sm text-gray-600'>Total Usuarios</p>
              <p className='text-2xl font-bold'>{usuarios.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Lista de usuarios */}
      <div className='overflow-hidden rounded-lg bg-white shadow'>
        <div className='overflow-x-auto'>
          <table className='min-w-full divide-y divide-gray-200'>
            <thead className='bg-gray-50'>
              <tr>
                <th className='px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase'>
                  ID
                </th>
                <th className='px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase'>
                  Nombre
                </th>
                <th className='px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase'>
                  Email
                </th>
              </tr>
            </thead>
            <tbody className='divide-y divide-gray-200 bg-white'>
              {usuarios.map((usuario) => (
                <tr key={usuario.id}>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <div className='text-sm text-gray-900'>{usuario.id}</div>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <div className='text-sm font-medium text-gray-900'>
                      {usuario.name || 'Sin nombre'}
                    </div>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <div className='text-sm text-gray-900'>{usuario.email}</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
