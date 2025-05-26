import React, { useEffect, useState } from 'react';
import RecipeCard from './RecipeCard';

export default function RecipeList({ search, favorites, toggleFavorite }) {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // Para manejar errores

  useEffect(() => {
    const fetchRecipes = async () => {
      setLoading(true);
      setError(null); // Reinicia el error cada vez que se hace una petición
      setRecipes([])
      try {
        // Usamos la búsqueda recibida como prop
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`);
        const data = await response.json();
        setRecipes(data.meals || []);
      } catch (error) {
        console.error('Error fetching recipes:', error);
        setError('Hubo un problema al cargar las recetas.');
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, [search]); // Se vuelve a ejecutar cada vez que cambia el término de búsqueda


  if (loading) {
    return (
      <div className="flex justify-center items-center h-32">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-white"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-400 mt-10">{error}</div>;
  }

  if (recipes.length === 0) {
    return <div className="text-center text-white mt-10">No se encontraron recetas.</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {recipes.map((recipe) => (
        <RecipeCard
          key={recipe.idMeal}
          title={recipe.strMeal}
          image={recipe.strMealThumb}
          description={
            recipe.strInstructionsES
              ? recipe.strInstructionsES.substring(0, 100) + '...'
              : recipe.strInstructions
                ? recipe.strInstructions.substring(0, 100) + '...'
                : 'No hay descripción disponible'
          }

      recipe={recipe}
      isFavorite={favorites.some((r) => r.idMeal === recipe.idMeal)}
      toggleFavorite={toggleFavorite}
        />
      ))}
    </div>
  );
}
