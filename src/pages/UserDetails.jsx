import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Button from '../components/Button';
import Logo from '../assets/img/github.png';

const UserDetails = () => {
  const { username } = useParams();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`https://api.github.com/users/${username}`);
        if (!response.ok) throw 'Failed';
         
        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error('Error al obtener los detalles del usuario de GitHub', error);
      }
    };

    fetchUserData();
  }, [username]);

  if (!userData) {
    return <div>Cargando...</div>;
  }

  const textShadowStyle = {
    textShadow: '4px 4px 4px black', 
  };

  return (
    <div className="flex flex-col items-center text-center h-screen justify-center relative">
      <div className="absolute top-2">
        <Button to="/userSearch" size="small" className="mb-2">
          VOLVER A LA PÁGINA DE BÚSQUEDA
        </Button>
      </div>

      <h2 className="text-lg md:text-2xl lg:text-3xl font-extrabold my-4 md:my-8">
        DETALLES DEL USUARIO
      </h2>

      <img
        src={userData.avatar_url}
        alt={`Avatar de ${userData.login}`}
        style={textShadowStyle}
        className="h-16 md:h-28 lg:h-40 w-16 md:w-28 lg:w-40 my-2 md:my-4"
      />
      <p style={textShadowStyle} className="text-xs md:text-sm lg:text-base mb-1 md:mb-2">
        NOMBRE DE USUARIO: <span className="text-blue-400">{userData.login}</span>
      </p>
      <p style={textShadowStyle} className="text-xs md:text-sm lg:text-base mb-1 md:mb-2">
        SEGUIDORES: <span className="text-blue-400">{userData.followers}</span>
      </p>
      <p style={textShadowStyle} className="text-xs md:text-sm lg:text-base mb-1 md:mb-2">
        SEGUIDOS: <span className="text-blue-400">{userData.following}</span>
      </p>
      <p style={textShadowStyle} className="text-xs md:text-sm lg:text-base mb-1 md:mb-2 no-underline hover:underline">
        <a href={userData.html_url} target="_blank" rel="noopener noreferrer">
          VER EN GITHUB
        </a>
      </p>
    </div>
  );
};

export default UserDetails;
