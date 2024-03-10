import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import { ListItemText, TextField, List, Paper, IconButton } from '@mui/material';
import { Search, Delete } from '@mui/icons-material';

const UserSearchPage = () => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchHistory, setSearchHistory] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedHistory = localStorage.getItem('userSearchHistory');
    if (storedHistory) {
      setSearchHistory(JSON.parse(storedHistory));
    }
  }, []);

  const handleSearch = async () => {
    try {
      const response = await fetch(`https://api.github.com/search/users?q=${searchQuery}`);
      if (response.ok) {
        const data = await response.json();
        setUsers(data.items);
      } else {
        console.error('Error al buscar usuarios de GitHub');
      }
    } catch (error) {
      console.error('Error al buscar usuarios de GitHub', error);
    }
  };

  const handleUserSelect = (selectedUser) => {
    // Verificar si el usuario ya está en el historial
    if (!searchHistory.includes(selectedUser)) {
      // Actualizar historial de búsqueda con la opción seleccionada
      const newHistory = [...searchHistory, selectedUser];
      setSearchHistory(newHistory);
      localStorage.setItem('userSearchHistory', JSON.stringify(newHistory));
    }

    navigate(`/user/${selectedUser}`);
  };

  const handleDeleteFromHistory = (index) => {
    const updatedHistory = [...searchHistory];
    updatedHistory.splice(index, 1);
    setSearchHistory(updatedHistory);
    localStorage.setItem('userSearchHistory', JSON.stringify(updatedHistory));
  };

  return (
    <div className='flex flex-col items-center h-screen'>
      {/* Contenido principal centrado */}
      <div className='text-center mb-8'>
        <h1 className="font-extrabold my-5 text-4xl">BUSCAR USUARIOS EN GITHUB</h1>

        <div className="flex justify-center items-center mb-4">
          <TextField
            className='h-14 text-blue-500'
            type="text"
            label={<span className="text-blue-500">Usuario</span>}
            variant='standard'
            id='standard-basic'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="bg-rgb-purple hover:bg-blue-400 text-black font-bold py-2 px-4 rounded" onClick={handleSearch}>
            <Search className="w-6 h-6 mr-2" /> Buscar
          </button>
        </div>

        {/* Contenido de resultados de búsqueda */}
        <div className="flex justify-center">
          <ul className="list-disc text-left mt-4 pl-4">
            {users.map((user) => (
              <ListItemText disablePadding key={user.id}>
                <Link to={`/user/${user.login}`} onClick={() => handleUserSelect(user.login)} className="block hover:text-gray-950 font-bold hover:bg-blue-400 rounded-md px-4 py-2">
                  {user.login}
                </Link>
              </ListItemText>
            ))}
          </ul>
        </div>
      </div>

      {/* Botones en las esquinas superiores */}
      <div className="fixed top-4 left-4">
        <Button to="/" size="small">
          VOLVER AL MENÚ
        </Button>
      </div>
      <div className="fixed top-4 right-4">
        <Button to="/repoSearch" size="small">
          IR A BUSCAR REPOSITORIOS
        </Button>
      </div>

      {/* Historial de búsqueda debajo del botón de "Buscar Repositorios" */}
      <Paper className="mt-4 p-4" style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)' }}>
        <h2 className="text-lg font-bold mb-2">Historial de Búsqueda</h2>
        <List>
          {searchHistory.map((query, index) => (
            <ListItemText disablePadding key={index}>
              <div className="flex justify-between items-center">
                <Link to={`/user/${query}`} className="block hover:text-gray-950 hover:bg-blue-400 rounded-md px-2 py-1">{query}</Link>
                <IconButton color="inherit" onClick={() => handleDeleteFromHistory(index)}>
                  <Delete />
                </IconButton>
              </div>
            </ListItemText>
          ))}
        </List>
      </Paper>
    </div>
  );
};

export default UserSearchPage;
