import { Link, useNavigate, useLocation } from 'react-router-dom';

export default function Header({ searchInput, setSearchInput, handleSearch, clearSearch }) {
  const location = useLocation();
  const isHome = location.pathname === '/';
  const navigate = useNavigate();

  const goHome = () => {
    clearSearch(); // Limpia el input y la búsqueda
    navigate('/'); // Navega a la página principal
  };

  return (
    <header className="bg-gray-900 flex flex-col sm:flex-row justify-between items-center gap-2 py-4 px-4">
      <h1 className="text-3xl text-white font-bold">RecetaExpress</h1>
      <div className="flex flex-col sm:flex-row gap-2 items-center">
        {isHome && (
          <>
            <input
              type="text"
              placeholder="Buscar receta..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="bg-gray-800 text-white placeholder-gray-400 px-4 py-2 rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 w-64"
            />
            <button
              onClick={handleSearch}
              className="bg-yellow-500 text-black px-4 py-2 rounded-md hover:bg-yellow-400 transition-colors"
            >
              Buscar
            </button>
          </>
        )}
        <div className="flex gap-2">
          <button
            onClick={goHome}
            className="bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-colors"
          >
            Inicio
          </button>
          <Link
            to="/favoritos"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-500 transition-colors"
          >
            Favoritos
          </Link>
        </div>
      </div>
    </header>
  );
}
