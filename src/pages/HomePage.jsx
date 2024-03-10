import Button from '../components/Button';
/* import './HomePage.css'; */

const HomePage = () => {
  return (
    <div className="bg-primary h-screen flex flex-col justify-center items-center p-4 md:p-8 lg:p-12">
      <h1 className='font-extrabold text-4xl md:text-5xl lg:text-6xl mt-2 md:mt-4 lg:mt-6 mb-4 md:mb-6 lg:mb-8 text-white'>GitHub Searcher</h1>
      <div className="font-serif space-x-4">
        <Button to="/repoSearch" className="text-base md:text-lg lg:text-xl">REPOSITORIES</Button>
        <Button to="/userSearch" className="text-base md:text-lg lg:text-xl">USERS</Button>
      </div>
    </div>
  );
}

export default HomePage;
