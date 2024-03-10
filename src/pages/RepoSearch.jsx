import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import { TextField, IconButton, List, Paper, ListItemText } from '@mui/material';
import { Search, Delete } from '@mui/icons-material';
import Logo from "../assets/img/github.png";

const RepoSearchPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searchHistory, setSearchHistory] = useState([]);

  useEffect(() => {
    const storedHistory = localStorage.getItem('repoSearchHistory');
    if (storedHistory) {
      setSearchHistory(JSON.parse(storedHistory));
    }
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`https://api.github.com/search/repositories?q=${searchQuery}`);
      if (response.ok) {
        const data = await response.json();
        const sortedResults = data.items.sort((a, b) => {
          const dateA = new Date(a.created_at);
          const dateB = new Date(b.created_at);
          return dateB - dateA;
        });
        setSearchResults(sortedResults);
      } else {
        console.error('Error al buscar en GitHub');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleRepoSelect = (selectedRepo) => {
    const newHistory = [...searchHistory, selectedRepo.full_name];
    setSearchHistory(newHistory);
    localStorage.setItem('repoSearchHistory', JSON.stringify(newHistory));
  };

  const handleDeleteFromHistory = (index) => {
    const updatedHistory = [...searchHistory];
    updatedHistory.splice(index, 1);
    setSearchHistory(updatedHistory);
    localStorage.setItem('repoSearchHistory', JSON.stringify(updatedHistory));
  };

  return (
    <div className="text-center">
      {/* Botón en la esquina superior izquierda */}
      <div className="absolute top-4 left-4">
        <Button to="/userSearch" className="mb-2">Ir a Buscar Usuarios</Button>
      </div>

      <div className="mx-auto max-w-md">
        <h1 className="font-extrabold my-5 text-4xl">BUSCAR REPOSITORIOS</h1>

        <div className="flex items-center justify-center mb-4">
          <TextField
            className="h-14 mr-2 text-blue-500"
            id="standard-basic"
            label={<span className="text-blue-500">Repositorio</span>}
            variant="standard"
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <button className="bg-rgb-purple hover:bg-blue-400 text-black font-bold py-2 px-4 rounded" type="submit" onClick={handleSearchSubmit}>
            <Search className="w-6 h-6 mr-2" /> Buscar
          </button>
        </div>

        <Paper className="mt-4 p-4" style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)' }}>
          <h2 className="text-lg font-bold mb-2">Historial de Búsqueda</h2>
          <List>
            {searchHistory.map((query, index) => (
              <ListItemText disablePadding key={index}>
                <div className="flex justify-between items-center">
                  <Link to={`/repo/${query}`} className="block hover:text-gray-950 hover:bg-blue-400 rounded-md px-2 py-1">{query}</Link>
                  <IconButton color="inherit" onClick={() => handleDeleteFromHistory(index)}>
                    <Delete />
                  </IconButton>
                </div>
              </ListItemText>
            ))}
          </List>
        </Paper>

        <div className="w-full mt-4">
          <ul className="list-disc text-left pl-4">
            {searchResults.map((repo) => (
              <ListItemText disablePadding key={repo.id}>
                <Link to={`/repo/${repo.full_name}`} onClick={() => handleRepoSelect(repo)} className="block hover:text-gray-950 font hover:bg-blue-400 rounded-md px-4 py-2">
                  {repo.name}
                </Link>
              </ListItemText>
            ))}
          </ul>
        </div>
      </div>

      {/* Botón en la esquina superior derecha */}
      <div className="absolute top-4 right-4">
        <Button to="/" className="mt-4">Volver al Menú Principal</Button>
      </div>
    </div>
  );
};

export default RepoSearchPage;
