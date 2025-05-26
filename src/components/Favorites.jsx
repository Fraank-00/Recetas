import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import RecipeCard from './RecipeCard';

export default function Favorites({ favorites, toggleFavorite }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (favorites.length === 0) {
      Swal.fire({
        icon: 'warning',
        title: 'Sin favoritos',
        text: 'No tenés recetas guardadas como favoritas.',
        confirmButtonText: 'Volver al inicio',
      }).then(() => {
        navigate('/');
      });
    }
  }, [favorites]);

  if (favorites.length === 0) {
    // Evita que renderice el contenido vacío antes de redirigir
    return null;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {favorites.map((recipe) => (
        <RecipeCard
          key={recipe.idMeal}
          title={recipe.strMeal}
          image={recipe.strMealThumb}
          description={
            recipe.strInstructions
              ? recipe.strInstructions.substring(0, 100) + '...'
              : 'No hay descripción disponible'
          }
          recipe={recipe}
          isFavorite={true}
          toggleFavorite={toggleFavorite}
        />
      ))}
    </div>
  );
}
