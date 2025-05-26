import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Swal from 'sweetalert2';
import Header from './components/Header';
import RecipeList from './components/RecipeList';
import Favorites from './components/Favorites';

function App() {
  const [searchInput, setSearchInput] = useState('');
  const [search, setSearch] = useState('');
  const [favorites, setFavorites] = useState([]);
  const clearSearch = () => {
  setSearchInput('');
  setSearch('');
};


  useEffect(() => {
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const handleSearch = () => {
    setSearch(searchInput);
  };

  const toggleFavorite = (recipe) => {
  const isFav = favorites.find((r) => r.idMeal === recipe.idMeal);
  if (isFav) {
    setFavorites(favorites.filter((r) => r.idMeal !== recipe.idMeal));
    Swal.fire({
      icon: 'info',
      title: 'Eliminado de favoritos',
      text: `${recipe.strMeal} fue eliminado.`,
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 1500,
      timerProgressBar: true,
    });
  } else {
    setFavorites([...favorites, recipe]);
    Swal.fire({
      icon: 'success',
      title: 'Agregado a favoritos',
      text: `${recipe.strMeal} fue agregado.`,
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 1500,
      timerProgressBar: true,
    });
  }
};

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Header
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        handleSearch={handleSearch}
        clearSearch={clearSearch}

      />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <h1 className="text-2xl font-bold text-center mt-4">Recetas Deliciosas</h1>
              <RecipeList
                search={search}
                favorites={favorites}
                toggleFavorite={toggleFavorite}
              />
            </>
          }
        />
        <Route
          path="/favoritos"
          element={
            <>
              <h1 className="text-2xl font-bold text-center mt-4">Mis Recetas Favoritas</h1>
              <Favorites
                favorites={favorites}
                toggleFavorite={toggleFavorite}
              />
            </>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
