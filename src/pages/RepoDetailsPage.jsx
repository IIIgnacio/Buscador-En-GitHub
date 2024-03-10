import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Button from '../components/Button';
import Logo from '../assets/img/github.png';

const RepoDetailsPage = () => {
  const { owner, name } = useParams();
  const [repoData, setRepoData] = useState(null);

  useEffect(() => {
    const fetchRepoData = async () => {
      try {
        const response = await fetch(`https://api.github.com/repos/${owner}/${name}`);
        if (response.ok) {
          const data = await response.json();
          setRepoData(data);
        } else {
          console.error('Error al obtener los detalles del repositorio de GitHub');
        }
      } catch (error) {
        console.error('Error al obtener los detalles del repositorio de GitHub', error);
      }
    };

    fetchRepoData();
  }, [owner, name]);

  if (!repoData) {
    return <div>no aparece nada</div>;
  }

  
  const textShadowStyle = {
    textShadow: '4px 4px 4px black', 
  };

  return (
    <div className="flex flex-col items-center text-center">
      <h2 className="text-xl md:text-3xl font-extrabold my-2 md:my-6">DETALLES DEL REPOSITORIO</h2>
      
      <div className="mt-2 md:mt-0 md:absolute top-2 left-2">
        <Button to="/repoSearch" size="small">
          VOLVER A LA PÁGINA DE BÚSQUEDA
        </Button>
      </div>
      
      <img src={repoData.owner.avatar_url} alt={`Avatar de ${repoData.owner.login}`} className='h-20 md:h-48 w-20 md:w-48 my-2 md:my-6'/>
      
      <p className='text-sm md:text-xl mb-1 md:mb-2' style={textShadowStyle}>
        NOMBRE DEL REPOSITORIO: <span className='text-blue-400 text-lg md:text-2xl'>{repoData.name}</span>
      </p>
      
      <p className='text-sm md:text-xl mb-1 md:mb-2' style={textShadowStyle}>
        PROPIETARIO: <span className='text-blue-400 text-lg md:text-2xl'>{repoData.owner.login}</span>
      </p>
      
      <p className='text-sm md:text-xl mb-1 md:mb-2' style={textShadowStyle}>
        DESCRIPCIÓN: <span className='text-blue-400 text-lg md:text-2xl'>{repoData.description}</span>
      </p>
      
      <p className='text-sm md:text-xl mb-2' style={textShadowStyle}>
        <a href={repoData.html_url} target="_blank" rel="noopener noreferrer" className='no-underline hover:underline'>
          VER EN GITHUB
        </a>
      </p>
      
      <div className="mt-2 md:absolute top-2 right-2">
      </div>
    </div>
  );
};

export default RepoDetailsPage;
